import assert from 'node:assert/strict';
import fs from 'node:fs';
import {parse} from 'parse5';
import {todayInJapan} from '../../src/lib/booking-date.js';

const origin = 'https://tshr-bjj.com';
const walk = node => [node, ...(node.childNodes ?? []).flatMap(walk)];
const attr = (node, name) => node?.attrs?.find(a => a.name === name)?.value;
const text = node => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
const response = await fetch(origin + '/contact/');
assert.equal(response.status, 200);
const nodes = walk(parse(await response.text()));
const form = nodes.find(n => n.tagName === 'form');
assert.equal(attr(form, 'action'), '/contact/');
assert.equal(attr(form, 'method'), 'POST');
assert.ok(text(nodes.find(n => n.tagName === 'label' && attr(n, 'for') === 'trial_date')).includes('休館日：火曜・日曜'));
const options = walk(nodes.find(n => attr(n, 'id') === 'class_preference')).filter(n => n.tagName === 'option');
assert.equal(text(options.find(n => attr(n, 'value') === 'beginner')), 'ビギナークラス（初心者向け）');
assert.equal(text(options.find(n => attr(n, 'value') === 'kids')), 'キッズクラス（小学1〜6年生）');
assert.ok(!options.some(n => text(n).includes('土日祝')));

const today = todayInJapan();
const start = new Date(`${today}T00:00:00Z`);
const next = day => {
  const date = new Date(start);
  do { date.setUTCDate(date.getUTCDate() + 1); } while (date.getUTCDay() !== day);
  return date.toISOString().slice(0, 10);
};
const yesterday = new Date(start);
yesterday.setUTCDate(yesterday.getUTCDate() - 1);
const checks = [];
for (const [date, expected] of [[next(0), 422], [next(2), 422], [yesterday.toISOString().slice(0, 10), 422], [next(6), 307], ['', 307]]) {
  // Never follow the redirect to FormSubmit: these checks do not send email or
  // create a booking and contain no name, email address or other personal data.
  const result = await fetch(origin + '/contact/', {
    method: 'POST', body: new URLSearchParams({trial_date: date}), redirect: 'manual'
  });
  assert.equal(result.status, expected, date);
  assert.equal(result.headers.get('cache-control'), 'no-store');
  if (expected === 307) {
    assert.equal(result.headers.get('location'), 'https://formsubmit.co/tashas.natura@hotmail.com');
  } else {
    assert.equal(result.headers.get('location'), null);
    assert.match(await result.text(), /希望日をご確認ください/);
  }
  checks.push({date, status: result.status});
}
const report = {todayInJapan: today, beginnerAdded: true, kidsElementaryOnly: true, dateChecks: checks, emailSent: false};
fs.writeFileSync('docs/production/booking-verification.json', JSON.stringify(report, null, 2) + '\n');
console.log(report);
