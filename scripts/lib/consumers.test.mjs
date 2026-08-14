import test from 'node:test';
import assert from 'node:assert/strict';
import { parseVendorPin, classifyConsumer } from './consumers.mjs';

test('parseVendorPin reads sha, tag and version', () => {
  const text = JSON.stringify({ source: 'neurovim-standalone', tag: 'v0.2.4', sha: 'abc1234', version: '0.2.4' });
  assert.deepEqual(parseVendorPin(text), { pin: 'abc1234', tag: 'v0.2.4', version: '0.2.4' });
});

test('parseVendorPin tolerates a missing tag and version', () => {
  const text = JSON.stringify({ sha: 'abc1234' });
  assert.deepEqual(parseVendorPin(text), { pin: 'abc1234', tag: null, version: null });
});

test('parseVendorPin throws when sha is missing', () => {
  assert.throws(() => parseVendorPin(JSON.stringify({ tag: 'v1' })), /sha/);
});

test('parseVendorPin throws on malformed JSON', () => {
  assert.throws(() => parseVendorPin('not json'));
});

test('classifyConsumer skips a consumer that is not on disk', () => {
  const r = classifyConsumer({ name: 'vim-dojo', found: false });
  assert.equal(r.status, 'skipped');
  assert.match(r.message, /not found/);
});

test('classifyConsumer reports ok when the pin is current and the copy is verbatim', () => {
  const r = classifyConsumer({ name: 'vim-dojo', found: true, pin: 'abc1234', commitsSincePin: 0, differences: [] });
  assert.equal(r.status, 'ok');
});

test('classifyConsumer reports stale when commits landed after the pin', () => {
  const r = classifyConsumer({ name: 'vim-dojo', found: true, pin: 'abc1234', commitsSincePin: 3, differences: [] });
  assert.equal(r.status, 'stale');
  assert.match(r.message, /3 commit/);
});

test('classifyConsumer reports violated when the copy differs, even if the pin is current', () => {
  const r = classifyConsumer({
    name: 'vim-dojo', found: true, pin: 'abc1234', commitsSincePin: 0,
    differences: ['core/engine/ParTier.ts'],
  });
  assert.equal(r.status, 'violated');
  assert.match(r.message, /ParTier\.ts/);
});

test('a violated copy outranks a stale pin', () => {
  const r = classifyConsumer({
    name: 'vim-dojo', found: true, pin: 'abc1234', commitsSincePin: 9,
    differences: ['core/types.ts'],
  });
  assert.equal(r.status, 'violated');
});
