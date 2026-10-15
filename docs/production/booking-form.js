import {bookingDateError} from '../../src/lib/booking-date.js';

// Keep the existing email service, CAPTCHA and completion redirect unchanged.
const destination = 'https://formsubmit.co/tashas.natura@hotmail.com';
const headers = {
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'strict-transport-security': 'max-age=31536000; includeSubDomains; preload'
};

/** @param {Request} request @param {Date} [now] */
export async function handleBookingForm(request, now = new Date()) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return rejected('フォームの内容を読み取れませんでした。お問い合わせ画面から再度送信してください。', 400);
  }
  const dates = form.getAll('trial_date');
  const value = dates[0] ?? '';
  if (dates.length > 1 || typeof value !== 'string') {
    return rejected('希望日を正しい日付で入力してください。', 422);
  }
  const error = bookingDateError(value, now);
  if (error) return rejected(error, 422);

  // 307 preserves the original POST body; the browser sends it to the same
  // FormSubmit endpoint as before. No email is sent or personal data logged here.
  return new Response(null, {status: 307, headers: {...headers, location: destination}});
}

function rejected(message, status) {
  // Only fixed validation messages are interpolated, never submitted values.
  const html = `<!doctype html><html lang="ja"><head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="robots" content="noindex,nofollow"><title>希望日をご確認ください｜Over Limit 本庄</title>
    <style>body{margin:0;padding:48px 24px;background:#f4f4ee;color:#141613;font-family:system-ui,sans-serif;line-height:1.8}main{max-width:600px;margin:48px auto}h1{font-size:24px}a{color:#141613;text-underline-offset:4px}</style>
    </head><body><main><h1>希望日をご確認ください</h1><p>${message}</p>
    <p>ブラウザの戻るボタンでフォームへ戻り、希望日を変更してください。希望日未定の場合は空欄で送信できます。</p>
    <a href="/contact/">お問い合わせ画面を開く</a></main></body></html>`;
  return new Response(html, {status, headers: {...headers, 'content-type': 'text/html; charset=utf-8'}});
}
