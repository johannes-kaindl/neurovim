import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCore, FUNCTIONS, buildVectors, runVectors, serializeVector } from './conformance.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const DIR = join(ROOT, 'packages', 'core', 'conformance');
const core = await loadCore(ROOT);
const vectors = buildVectors(core);

test('every function has a vector file and no stale file is left over', () => {
  const files = readdirSync(DIR).filter((f) => f.endsWith('.json')).sort();
  assert.deepEqual(files, Object.keys(FUNCTIONS).map((f) => `${f}.json`).sort());
});

test('committed vectors are current — run `npm run build:conformance` after a core rule change', () => {
  for (const [fn, v] of Object.entries(vectors)) {
    assert.equal(readFileSync(join(DIR, `${fn}.json`), 'utf8'), serializeVector(v), `${fn}.json is stale`);
  }
});

test('building twice is byte-identical', () => {
  const again = buildVectors(core);
  for (const fn of Object.keys(vectors)) assert.equal(serializeVector(again[fn]), serializeVector(vectors[fn]));
});

test('the TS core passes its own vectors', () => {
  for (const [fn, v] of Object.entries(vectors)) assert.deepEqual(runVectors(v, FUNCTIONS[fn](core)), [], fn);
});

test('every vector file distinguishes results — a constant implementation fails', () => {
  for (const [fn, v] of Object.entries(vectors)) {
    const distinct = new Set(v.cases.map((c) => JSON.stringify(c.expected)));
    assert.ok(distinct.size >= 2, `${fn}: all cases expect the same result`);
    const constant = () => v.cases[0].expected;
    assert.ok(runVectors(v, constant).length > 0, `${fn}: a constant implementation passes`);
  }
});

// Counter-checks (CORE-TEST-13): a plausible wrong implementation must fail.
const mutants = {
  normalizeMissionText: (text) => ({ lines: text.split('\n'), offset: 0 }),
  getDiff: (a, b) => ({ matches: a === b, first_divergent_line: a === b ? -1 : 0, lines_off: a === b ? 0 : 1 }),
  addXp: (data, amount) => ({ new_data: { ...data, total_xp: data.total_xp + amount }, level_up: null }),
  recordCompletion: (data, today) => ({ ...data, streak_current: 1, streak_last_date: today }),
  tierFor: (keys, par) => (keys > 0 && par > 0 && keys <= par ? 'gold' : null),
};
for (const [fn, wrong] of Object.entries(mutants)) {
  test(`counter-check: a wrong ${fn} fails the vectors`, () => {
    assert.ok(runVectors(vectors[fn], wrong).length > 0);
  });
}
