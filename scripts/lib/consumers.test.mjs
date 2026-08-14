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

import { diffTrees, overallExit, renderConsumersMd } from './consumers.mjs';

test('diffTrees returns nothing for identical trees', () => {
  const a = new Map([['core/types.ts', 'h1'], ['core/index.ts', 'h2']]);
  const b = new Map([['core/index.ts', 'h2'], ['core/types.ts', 'h1']]);
  assert.deepEqual(diffTrees(a, b), []);
});

test('diffTrees reports changed, missing and extra files, sorted', () => {
  const expected = new Map([['a.ts', 'h1'], ['b.ts', 'h2'], ['c.ts', 'h3']]);
  const actual = new Map([['a.ts', 'CHANGED'], ['b.ts', 'h2'], ['d.ts', 'h9']]);
  assert.deepEqual(diffTrees(expected, actual), ['a.ts', 'c.ts', 'd.ts']);
});

test('overallExit is 0 when nothing is violated', () => {
  assert.equal(overallExit([{ status: 'ok' }, { status: 'stale' }, { status: 'skipped' }]), 0);
});

test('overallExit is 1 when any consumer is violated', () => {
  assert.equal(overallExit([{ status: 'ok' }, { status: 'violated' }]), 1);
});

test('renderConsumersMd carries a do-not-edit banner and one row per consumer', () => {
  const md = renderConsumersMd([
    { name: 'vim-dojo', what: 'Obsidian plugin', status: 'ok', message: 'pin abc1234 is current and verbatim', pin: 'abc1234', tag: 'v0.2.4' },
  ]);
  assert.match(md, /GENERATED/);
  assert.match(md, /npm run check:consumers/);
  assert.match(md, /vim-dojo/);
  assert.match(md, /v0\.2\.4/);
});

test('renderConsumersMd states plainly when no consumer could be checked', () => {
  const md = renderConsumersMd([{ name: 'vim-dojo', what: 'Obsidian plugin', status: 'skipped', message: 'not found on disk — skipped' }]);
  assert.match(md, /skipped/);
});
