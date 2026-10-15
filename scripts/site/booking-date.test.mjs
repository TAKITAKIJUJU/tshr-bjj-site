import test from 'node:test';
import assert from 'node:assert/strict';
import {bookingDateError, todayInJapan} from '../../src/lib/booking-date.js';
import {handleBookingForm} from '../../docs/production/booking-form.js';

const now = new Date('2026-10-15T03:00:00Z');
test('Japan day changes at 15:00 UTC, regardless of the machine timezone', () => {
  assert.equal(todayInJapan(new Date('2026-10-15T14:59:59Z')), '2026-10-15');
  assert.equal(todayInJapan(new Date('2026-10-15T15:00:00Z')), '2026-10-16');
  assert.match(bookingDateError('2026-10-15', new Date('2026-10-15T15:00:00Z')), /過去/);
});
for (const value of ['2026-10-18', '2026-10-20']) {
  test(`closed day ${value} is rejected`, () => assert.match(bookingDateError(value, now), /休館日/));
}
for (const value of ['2026-10-15', '2026-10-16', '2026-10-17', '2026-10-19', '2026-10-21', '']) {
  test(`open day or unspecified ${value} is allowed`, () => assert.equal(bookingDateError(value, now), ''));
}
test('past dates are rejected', () => assert.match(bookingDateError('2026-10-14', now), /過去/));
for (const value of ['2027-02-29', '2026-02-30', '2026-13-01', '2026-10-32', '2026-1-5', 'not-a-date']) {
  test(`invalid calendar date ${value} is rejected`, () => assert.match(bookingDateError(value, now), /正しい日付/));
}
test('valid leap day is accepted', () => {
  assert.equal(bookingDateError('2024-02-29', new Date('2024-02-28T03:00:00Z')), '');
});

function request(value, multipart = false) {
  const body = multipart ? new FormData() : new URLSearchParams();
  if (value !== undefined) body.set('trial_date', value);
  return new Request('https://tshr-bjj.com/contact/', {method: 'POST', body});
}
for (const value of ['2026-10-18', '2026-10-20', '2026-10-14', '2027-02-29']) {
  test(`server blocks ${value} even without client-side validation`, async () => {
    const response = await handleBookingForm(request(value), now);
    assert.equal(response.status, 422);
    assert.equal(response.headers.get('location'), null);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.match(await response.text(), /希望日をご確認ください/);
  });
}
for (const value of ['2026-10-15', '2026-10-17', '', undefined]) {
  test(`valid ${value} continues to the existing email service without sending email in the test`, async () => {
    const response = await handleBookingForm(request(value), now);
    assert.equal(response.status, 307);
    assert.equal(response.headers.get('location'), 'https://formsubmit.co/tashas.natura@hotmail.com');
    assert.equal(response.headers.get('cache-control'), 'no-store');
  });
}
test('multipart closed date is also blocked', async () => {
  assert.equal((await handleBookingForm(request('2026-10-18', true), now)).status, 422);
});
test('ambiguous duplicate dates cannot bypass validation', async () => {
  const body = new URLSearchParams([['trial_date', '2026-10-17'], ['trial_date', '2026-10-18']]);
  assert.equal((await handleBookingForm(new Request('https://tshr-bjj.com/contact/', {method: 'POST', body}), now)).status, 422);
});
test('malformed form data is rejected', async () => {
  const response = await handleBookingForm(new Request('https://tshr-bjj.com/contact/', {method: 'POST', body: 'not-form-data'}), now);
  assert.equal(response.status, 400);
});
test('submitted text is never reflected into the error HTML', async () => {
  const response = await handleBookingForm(request('<script>alert(1)</script>'), now);
  assert.equal(response.status, 422);
  assert.ok(!(await response.text()).includes('<script>'));
});
