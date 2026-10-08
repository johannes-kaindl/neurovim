import test from 'node:test';
import assert from 'node:assert/strict';
import { parseVendorPin, classifyConsumer } from './consumers.mjs';

const SURFACE = ['packages/core/src', 'packages/content/src', 'packages/core/conformance', 'packages/content/export'];

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
  ], SURFACE);
  assert.match(md, /GENERATED/);
  assert.match(md, /npm run check:consumers/);
  assert.match(md, /vim-dojo/);
  assert.match(md, /v0\.2\.4/);
});

test('renderConsumersMd states plainly when no consumer could be checked', () => {
  const md = renderConsumersMd([{ name: 'vim-dojo', what: 'Obsidian plugin', status: 'skipped', message: 'not found on disk — skipped' }], SURFACE);
  assert.match(md, /skipped/);
});

import { splitProvenanceHeader } from './consumers.mjs';

const HEADER = { lines: 1, mustMatch: '^// vendored from ' };

test('splitProvenanceHeader passes the text through untouched when no header is declared', () => {
  const text = 'export const a = 1;\n';
  assert.deepEqual(splitProvenanceHeader(text, undefined), { ok: true, body: text });
});

test('splitProvenanceHeader cuts the declared preamble and returns the body below it', () => {
  const text = '// vendored from obsidian-kit@abc1234\nexport const a = 1;\n';
  assert.deepEqual(splitProvenanceHeader(text, HEADER), { ok: true, body: 'export const a = 1;\n' });
});

test('splitProvenanceHeader rejects code disguised as a header', () => {
  const text = 'export const BACKDOOR = 1; // as if it were a header\nexport const a = 1;\n';
  const r = splitProvenanceHeader(text, HEADER);
  assert.equal(r.ok, false);
  assert.match(r.reason, /line 1/);
});

test('splitProvenanceHeader names which line of a multi-line header broke', () => {
  const text = '// vendored from obsidian-kit@abc1234\nexport const BACKDOOR = 1;\nexport const a = 1;\n';
  const r = splitProvenanceHeader(text, { lines: 2, mustMatch: '^// ' });
  assert.equal(r.ok, false);
  assert.match(r.reason, /line 2/);
});

test('splitProvenanceHeader rejects a file shorter than the declared header', () => {
  const r = splitProvenanceHeader('// vendored from obsidian-kit@abc1234', HEADER);
  assert.equal(r.ok, false);
  assert.match(r.reason, /shorter/);
});

test('splitProvenanceHeader refuses a declaration without a line count', () => {
  assert.throws(() => splitProvenanceHeader('a\n', { mustMatch: '^// ' }), /lines/);
});

test('splitProvenanceHeader refuses a declaration without a pattern', () => {
  assert.throws(() => splitProvenanceHeader('a\n', { lines: 1 }), /mustMatch/);
});

test('classifyConsumer reports a broken provenance header as its own breach, not as a hand edit', () => {
  const r = classifyConsumer({
    name: 'vim-dojo', found: true, pin: 'abc1234', commitsSincePin: 0, differences: [],
    headerViolations: ['core/types.ts: line 1 does not match the declared provenance pattern'],
  });
  assert.equal(r.status, 'violated');
  assert.match(r.message, /provenance header/);
  assert.doesNotMatch(r.message, /differs from pin/);
});

test('classifyConsumer names both breaches when body and header are wrong at once', () => {
  const r = classifyConsumer({
    name: 'vim-dojo', found: true, pin: 'abc1234', commitsSincePin: 0,
    differences: ['core/types.ts'],
    headerViolations: ['core/index.ts: line 1 does not match the declared provenance pattern'],
  });
  assert.equal(r.status, 'violated');
  assert.match(r.message, /differs from pin/);
  assert.match(r.message, /provenance header/);
});

import { consumerKind, consumerSources } from './consumers.mjs';

test('consumerKind defaults to source and accepts data', () => {
  assert.equal(consumerKind({ name: 'a' }), 'source');
  assert.equal(consumerKind({ name: 'a', kind: 'data' }), 'data');
});

test('consumerKind refuses an unknown kind instead of guessing', () => {
  assert.throws(() => consumerKind({ name: 'nvim', kind: 'dta' }), /unknown kind "dta" for consumer nvim/);
});

test('consumerSources lists dir and file sources', () => {
  const c = { name: 'n', dirs: [['packages/core/conformance', 'spec/conformance']], files: [['packages/content/export/neurovim-data.json', 'data/neurovim-data.json']] };
  assert.deepEqual(consumerSources(c, SURFACE), ['packages/core/conformance', 'packages/content/export/neurovim-data.json']);
});

test('consumerSources refuses a source outside the vendor surface', () => {
  const c = { name: 'n', dirs: [['packages/adapter-web/src', 'x']] };
  assert.throws(() => consumerSources(c, SURFACE), /packages\/adapter-web\/src \(consumer n\) is outside the vendor surface/);
});

test('classifyConsumer names the conformance suite for a data consumer', () => {
  const r = classifyConsumer({ name: 'n', kind: 'data', found: true, pin: 'abc1234', commitsSincePin: 0, differences: [] });
  assert.equal(r.status, 'ok');
  assert.match(r.message, /conformance suite/);
});

test('renderConsumersMd shows the kind and renders the surface it is given', () => {
  const md = renderConsumersMd([{ name: 'n', what: 'Neovim plugin', kind: 'data', status: 'ok', message: 'm', pin: 'abc1234', tag: null }], SURFACE);
  assert.match(md, /\| Consumer \| Kind \| What \|/);
  assert.match(md, /\| n \| data \| Neovim plugin \|/);
  assert.match(md, /`packages\/content\/export`/);
});
