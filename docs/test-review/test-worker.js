export default {
 async fetch(request, env) {
  const url = new URL(request.url);
  if (url.pathname !== '/test' && !url.pathname.startsWith('/test/')) return new Response('Not found', {status:404});
  if (!['GET','HEAD'].includes(request.method)) return new Response('テスト版では送信・予約は行いません。', {status:405,headers:{'Allow':'GET, HEAD','X-Robots-Tag':'noindex, nofollow'}});
  if (url.pathname === '/test') { url.pathname='/test/'; return Response.redirect(url,308); }
  const asset = await env.ASSETS.fetch(request);
  const response = new Response(asset.body, asset);
  response.headers.set('X-Robots-Tag','noindex, nofollow');
  // Only the isolated test Worker receives these headers.
  response.headers.set('Content-Security-Policy', "form-action 'none'; connect-src 'self'");
  response.headers.set('Cache-Control', 'no-cache');
  response.headers.set('X-Test-Preview', 'over-limit-honjo');
  return response;
 }
};
