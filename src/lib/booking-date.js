const japanDate = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit'
});

/** @param {Date} [now] */
export function todayInJapan(now = new Date()) {
  const parts = japanDate.formatToParts(now);
  const part = (type) => parts.find(item => item.type === type)?.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

/** @param {string} value @param {Date} [now] */
export function bookingDateError(value, now = new Date()) {
  if (!value) return ''; // The requested date remains optional.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return '希望日を正しい日付で入力してください。';
  const date = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    return '希望日を正しい日付で入力してください。';
  }
  if (value < todayInJapan(now)) return '過去の日付は指定できません。希望日を変更してください。';
  if ([0, 2].includes(date.getUTCDay())) {
    return '火曜・日曜は休館日です。月・水・木・金・土曜から希望日を選んでください。';
  }
  return '';
}
