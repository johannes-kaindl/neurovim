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
  // A repeat completion that awards no XP — the web app awards it every time.
  completeMission: (data, mission, metrics, today) => {
    const real = FUNCTIONS.completeMission(core)(data, mission, metrics, today);
    return data.completed_missions.includes(mission.mission_id) ? { ...real, data: { ...real.data, total_xp: data.total_xp } } : real;
  },
  completeMissionWithoutZeroKeyRule: (data, mission, metrics, today) => {
    const real = FUNCTIONS.completeMission(core)(data, mission, { ...metrics, keystrokes: metrics.keystrokes || 1 }, today);
    return { ...real, unverified: false };
  },
  metricsResult: (keys, ms) => ({ elapsed_ms: ms, keystrokes: keys, ks_per_min: ms > 0 ? Math.floor((keys / ms) * 600000) / 10 : 0 }),
  unlockLevelFor: () => null,
};
for (const [name, wrong] of Object.entries(mutants)) {
  const fn = name === 'completeMissionWithoutZeroKeyRule' ? 'completeMission' : name;
  test(`counter-check: a wrong ${name} fails the vectors`, () => {
    assert.ok(runVectors(vectors[fn], wrong).length > 0);
  });
}

// LCS port mistakes (v0.2.8): each must fail the vectors.
const lines = (t) => FUNCTIONS.normalizeMissionText(core)(t);
function alignVariant(a, b, { trim = true, dropFirst = true } = {}) {
  let p = 0;
  let q = 0;
  if (trim) {
    while (p < a.length && p < b.length && a[p] === b[p]) p++;
    while (q < a.length - p && q < b.length - p && a[a.length - 1 - q] === b[b.length - 1 - q]) q++;
  }
  const n = a.length - p - q;
  const m = b.length - p - q;
  const L = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = a[p + i] === b[p + j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const ops = [];
  for (let k = 0; k < p; k++) ops.push(['keep', k]);
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[p + i] === b[p + j]) { ops.push(['keep', p + i]); i++; j++; }
    else if (dropFirst ? L[i + 1][j] >= L[i][j + 1] : L[i + 1][j] > L[i][j + 1]) { ops.push(['drop', p + i]); i++; }
    else { ops.push(['add', p + i]); j++; }
  }
  for (; i < n; i++) ops.push(['drop', p + i]);
  for (; j < m; j++) ops.push(['add', p + n]);
  for (let k = 0; k < q; k++) ops.push(['keep', p + n + k]);
  return ops;
}
const divergentVariant = (opts) => (current, solution) => {
  const cur = lines(current);
  const ops = alignVariant(cur.lines, lines(solution).lines, opts);
  const marked = new Set();
  ops.forEach(([kind, at], k) => {
    if (kind === 'drop') marked.add(at);
    if (kind !== 'add' || (k > 0 && ops[k - 1][0] === 'add')) return;
    let end = k;
    while (end + 1 < ops.length && ops[end + 1][0] === 'add') end++;
    const borders = (k > 0 && ops[k - 1][0] === 'drop') || (end + 1 < ops.length && ops[end + 1][0] === 'drop');
    if (!borders && cur.lines.length > 0) marked.add(Math.min(at, cur.lines.length - 1));
  });
  return [...marked].sort((x, y) => x - y).map((x) => x + cur.offset);
};
const positionalDiff = (current, solution) => {
  const a = lines(current).lines;
  const b = lines(solution).lines;
  let first = -1;
  let off = 0;
  for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) { if (first === -1) first = i; off++; }
  return off === 0 ? { matches: true, first_divergent_line: -1, lines_off: 0 } : { matches: false, first_divergent_line: first, lines_off: off };
};

test('counter-check: the variant helper reproduces the core (else the counter-checks prove nothing)', () => {
  assert.deepEqual(runVectors(vectors.getDivergentLines, divergentVariant({})), []);
});
test('counter-check: a positional getDiff fails the vectors', () => {
  assert.ok(runVectors(vectors.getDiff, positionalDiff).length > 0);
});
test('counter-check: adding before dropping on a tie fails getDivergentLines', () => {
  assert.ok(runVectors(vectors.getDivergentLines, divergentVariant({ dropFirst: false })).length > 0);
});
test('counter-check: aligning without the common prefix and suffix fails getDivergentLines', () => {
  assert.ok(runVectors(vectors.getDivergentLines, divergentVariant({ trim: false })).length > 0);
});

// Port mistakes the review measured as passing the first vector set (2026-10-08).
const pad = (n, w) => String(n).padStart(w, '0');
const streakWith = (yesterdayOf) => (data, today) => {
  if (data.streak_last_date === today) return data;
  const streak = data.streak_last_date === yesterdayOf(today) ? data.streak_current + 1 : 1;
  return { ...data, streak_current: streak, streak_last_date: today };
};
// A fixed calendar without leap years.
const noLeapYesterday = (today) => {
  const [y, m, d] = today.split('-').map(Number);
  const len = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const [yy, mm, dd] = d > 1 ? [y, m, d - 1] : m > 1 ? [y, m - 1, len[m - 2]] : [y - 1, 12, 31];
  return `${pad(yy, 4)}-${pad(mm, 2)}-${pad(dd, 2)}`;
};
// Local midnight minus 24 h in Europe/Berlin (CET/CEST, 2026 switches), formatted locally.
const berlinOffset = (ms) => (ms >= Date.UTC(2026, 2, 29, 1) && ms < Date.UTC(2026, 9, 25, 1) ? 2 : 1) * 3600000;
const localMidnightYesterday = (today) => {
  const [y, m, d] = today.split('-').map(Number);
  const noonUtc = Date.UTC(y, m - 1, d, 12);
  const instant = Date.UTC(y, m - 1, d) - berlinOffset(noonUtc) - 86400000;
  return new Date(instant + berlinOffset(instant)).toISOString().slice(0, 10);
};
// Strips only ASCII whitespace, like Lua's %s.
const asciiOnlyNormalize = (text) => {
  const real = FUNCTIONS.normalizeMissionText(core);
  const r = real(text.replace(/\u00A0/g, '\uE000').replace(/\u3000/g, '\uE001'));
  return { ...r, lines: r.lines.map((l) => l.replace(/\uE000/g, '\u00A0').replace(/\uE001/g, '\u3000')) };
};

test('counter-check: a port without leap years fails recordCompletion', () => {
  assert.ok(runVectors(vectors.recordCompletion, streakWith(noLeapYesterday)).length > 0);
});
test('counter-check: a port computing yesterday from local midnight fails at DST', () => {
  assert.ok(runVectors(vectors.recordCompletion, streakWith(localMidnightYesterday)).length > 0);
});
test('counter-check: a port stripping only ASCII whitespace fails normalizeMissionText', () => {
  assert.ok(runVectors(vectors.normalizeMissionText, asciiOnlyNormalize).length > 0);
});
