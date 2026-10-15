// Worker handling routing, HTTP->HTTPS, www canonicalization, caching, security headers, and custom 404.
import {videoRangeResponse} from './video-range.js';
import videoAssets from './video-assets.json';
import {handleBookingForm} from './booking-form.js';

const NOT_FOUND_HTML = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ページが見つかりません（404 Not Found）｜Over Limit 本庄</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #141613;
      color: #f4f4ee;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans JP", sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      text-align: center;
    }
    .card {
      max-width: 520px;
      width: 100%;
      background: #1c1f1b;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      padding: 48px 32px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.4);
    }
    .code {
      font-size: 64px;
      font-weight: 900;
      color: #ff6b00;
      letter-spacing: -0.04em;
      line-height: 1;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    p {
      font-size: 14px;
      color: #a2a799;
      line-height: 1.8;
      margin-bottom: 32px;
    }
    .actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    a {
      display: block;
      padding: 14px 24px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      transition: opacity 0.2s, background 0.2s;
    }
    .btn-primary {
      background: #ff6b00;
      color: #ffffff;
    }
    .btn-secondary {
      background: rgba(255,255,255,0.08);
      color: #f4f4ee;
    }
    a:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="card">
    <img src="/LOGO.png" alt="Over Limit 本庄" style="width: 72px; height: 72px; object-fit: contain; margin-bottom: 20px; border-radius: 12px;" />
    <div class="code">404</div>
    <h1>お探しのページが見つかりません</h1>
    <p>アクセスしようとしたページは削除されたか、URLが変更された可能性があります。トップページから再度お探しいただくか、体験予約・お問い合わせをご利用ください。</p>
    <div class="actions">
      <a href="/" class="btn-primary">トップページへ戻る</a>
      <a href="/contact/" class="btn-secondary">無料体験予約・お問い合わせ</a>
    </div>
  </div>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Force HTTPS
    const proto = request.headers.get("x-forwarded-proto") || url.protocol.replace(':', '');
    if (proto === "http") {
      url.protocol = "https:";
      return Response.redirect(url, 301);
    }

    // 2. Normalize www to apex domain
    if (url.hostname.toLowerCase() === "www.tshr-bjj.com") {
      url.hostname = "tshr-bjj.com";
      url.protocol = "https:";
      return Response.redirect(url, 301);
    }

    // 3. Language contact redirects to unified /contact/
    if (/^\/(english|portugues|gunma)\/contact\/?$/.test(url.pathname)) {
      url.pathname = '/contact/';
      return Response.redirect(url, 308);
    }

    // 4. Force trailing slash for locale roots
    if (/^\/(english|portugues|gunma)$/.test(url.pathname)) {
      url.pathname += '/';
      return Response.redirect(url, 308);
    }

    // Validate booking dates before the browser continues to the email service.
    if (request.method === 'POST' && /^\/contact\/?$/.test(url.pathname)) {
      return handleBookingForm(request);
    }

    // 5. Fetch asset from KV/Assets binding
    let response = await env.ASSETS.fetch(request);

    // Favicon & Webclip icon fallback if missing
    if (response.status === 404 && (url.pathname === '/favicon.ico' || url.pathname === '/apple-touch-icon.png')) {
      const logoUrl = new URL('/LOGO.png', request.url);
      const logoRes = await env.ASSETS.fetch(new Request(logoUrl, request));
      if (logoRes.status === 200) {
        const h = new Headers(logoRes.headers);
        h.set("content-type", url.pathname.endsWith('.ico') ? "image/x-icon" : "image/png");
        h.set("cache-control", "public, max-age=86400");
        return new Response(logoRes.body, { status: 200, headers: h });
      }
    }

    // 6. Custom 404 response
    if (response.status === 404) {
      return new Response(NOT_FOUND_HTML, {
        status: 404,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=0, must-revalidate",
          "x-content-type-options": "nosniff",
          "x-frame-options": "SAMEORIGIN",
          "referrer-policy": "strict-origin-when-cross-origin",
          "permissions-policy": "camera=(), microphone=(), geolocation=()",
          "strict-transport-security": "max-age=31536000; includeSubDomains; preload"
        }
      });
    }

    // 7. Inject security & caching headers
    const newHeaders = new Headers(response.headers);
    newHeaders.set("x-content-type-options", "nosniff");
    newHeaders.set("x-frame-options", "SAMEORIGIN");
    newHeaders.set("referrer-policy", "strict-origin-when-cross-origin");
    newHeaders.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
    newHeaders.set("strict-transport-security", "max-age=31536000; includeSubDomains; preload");

    const contentType = newHeaders.get("content-type") || "";
    if (contentType.includes("text/html") && !contentType.includes("charset")) {
      newHeaders.set("content-type", "text/html; charset=utf-8");
    }

    // Cache policy
    if (url.pathname.startsWith("/site/_astro/") || /^\/site\/media\/[\w-]+-[a-f0-9]{12}\.(?:webp|mp4|webm)$/.test(url.pathname)) {
      newHeaders.set("cache-control", "public, max-age=31536000, immutable");
    } else if (url.pathname.startsWith("/site/shared/") || /\.(webp|png|jpe?g|mp4|svg|woff2?)$/i.test(url.pathname)) {
      newHeaders.set("cache-control", "public, max-age=86400, stale-while-revalidate=604800");
    } else if (contentType.includes("text/html")) {
      newHeaders.set("cache-control", "public, max-age=0, must-revalidate");
    }

    const result = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
    return Object.hasOwn(videoAssets,url.pathname)
      ? videoRangeResponse(request,result,videoAssets[url.pathname]) : result;
  }
};
