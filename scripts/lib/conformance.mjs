// Conformance vectors: inputs written here, expected outputs computed by the real TS core.
// A consumer that re-implements a rule (the Lua port in neurovim.nvim) must pass every
// vector; a rule change here changes the vectors, so a lagging port turns visibly red
// instead of drifting quietly. Cases are inputs only — never hand-write an expected value.
import { isDeepStrictEqual } from 'node:util';
import { join } from 'node:path';
import { loadTs } from './load-ts.mjs';

export const CONFORMANCE_SCHEMA = 1;

export async function loadCore(root) {
  const src = join(root, 'packages', 'core', 'src');
  const [diff, prog, par, types] = await Promise.all([
    loadTs(join(src, 'utils', 'diff.ts')),
    loadTs(join(src, 'engine', 'ProgressionEngine.ts')),
    loadTs(join(src, 'engine', 'ParTier.ts')),
    loadTs(join(src, 'types.ts')),
  ]);
  return { diff, PE: prog.ProgressionEngine, par, DEFAULT_PLUGIN_DATA: types.DEFAULT_PLUGIN_DATA };
}

// Static methods use `this`, so every engine call goes through the class.
export const FUNCTIONS = {
  normalizeMissionText: (c) => (text) => c.diff.normalizeMissionText(text),
  getDiff: (c) => (current, solution) => c.diff.getDiff(current, solution),
  getDivergentLines: (c) => (current, solution) => c.diff.getDivergentLines(current, solution),
  getLevelForXp: (c) => (xp) => c.PE.getLevelForXp(xp),
  addXp: (c) => (data, amount) => c.PE.addXp(data, amount),
  backfillUnlocks: (c) => (data) => c.PE.backfillUnlocks(data),
  recordCompletion: (c) => (data, today) => c.PE.recordCompletion(data, today),
  recordMissionRun: (c) => (prev, metrics, today) => c.PE.recordMissionRun(prev ?? undefined, metrics, today),
  getXpProgress: (c) => (xp) => c.PE.getXpProgress(xp),
  resolvePar: (c) => (input) => c.par.resolvePar(input),
  tierFor: (c) => (keys, par) => c.par.tierFor(keys, par),
  keystrokesToNextTier: (c) => (keys, par) => c.par.keystrokesToNextTier(keys, par),
};

const FM = '---\ntitle: x\ntags: [a]\n---\n';
const FM_CRLF = '---\r\ntitle: x\r\n---\r\n';

export function casesFor(core) {
  const D = core.DEFAULT_PLUGIN_DATA;
  const data = (over) => ({ ...D, ...over });
  const m = (elapsed_ms, keystrokes, ks_per_min) => ({ elapsed_ms, keystrokes, ks_per_min });
  return {
    normalizeMissionText: [
      { name: 'plain text', args: ['alpha\nbeta'] },
      { name: 'trailing whitespace stripped', args: ['alpha  \nbeta\t'] },
      { name: 'leading and trailing blank lines dropped', args: ['\n\nalpha\nbeta\n\n'] },
      { name: 'frontmatter removed, offset counts its lines', args: [FM + 'alpha\nbeta'] },
      { name: 'CRLF frontmatter removed', args: [FM_CRLF + 'alpha\r\nbeta'] },
      { name: 'BOM before frontmatter', args: ['﻿' + FM + 'alpha'] },
      { name: 'lone rule without closing fence stays content', args: ['---\nalpha\nbeta'] },
      { name: 'blank line after frontmatter shifts offset', args: [FM + '\nalpha'] },
      { name: 'empty text', args: [''] },
      { name: 'unicode box drawing kept', args: ['╔══╗\n║ x║\n╚══╝'] },
    ],
    getDiff: [
      { name: 'identical', args: ['a\nb', 'a\nb'] },
      { name: 'trailing whitespace only', args: ['a  \nb', 'a\nb'] },
      { name: 'host frontmatter added', args: [FM + 'a\nb', 'a\nb'] },
      { name: 'CRLF against LF', args: ['a\r\nb', 'a\nb'] },
      { name: 'one line changed', args: ['a\nX\nc', 'a\nb\nc'] },
      { name: 'last line missing', args: ['a\nb', 'a\nb\nc'] },
      { name: 'extra line', args: ['a\nb\nc\nd', 'a\nb\nc'] },
      { name: 'empty against text', args: ['', 'a'] },
      { name: 'two lines changed', args: ['X\nb\nY', 'a\nb\nc'] },
    ],
    getDivergentLines: [
      { name: 'identical', args: ['a\nb', 'a\nb'] },
      { name: 'one line changed', args: ['a\nX\nc', 'a\nb\nc'] },
      { name: 'frontmatter shifts document indices', args: [FM + 'a\nX', 'a\nb'] },
      { name: 'missing lines are reported past the end', args: ['a', 'a\nb\nc'] },
      { name: 'leading blank lines shift indices', args: ['\n\na\nX', 'a\nb'] },
    ],
    getLevelForXp: [0, 65, 66, 185, 186, 600, 601, 2499, 2500, 99999].map((xp) => ({ name: `${xp} xp`, args: [xp] })),
    addXp: [
      { name: 'no level change', args: [data({ total_xp: 0 }), 15] },
      { name: 'crosses into level 2 and unlocks', args: [data({ total_xp: 60 }), 10] },
      { name: 'exactly on the threshold', args: [data({ total_xp: 0 }), 66] },
      // Records today's behaviour: a multi-level jump grants only the target level's unlocks
      // (backfillUnlocks repairs the rest on load). Not changed in this plan.
      { name: 'jump over several levels', args: [data({ total_xp: 180 }), 500] },
      { name: 'already unlocked id is not duplicated', args: [data({ total_xp: 60, unlocked: [...D.unlocked, 'M-05'] }), 10] },
      { name: 'beyond max level', args: [data({ total_xp: 2500 }), 1000] },
    ],
    backfillUnlocks: [
      { name: 'fresh save', args: [data({})] },
      { name: 'level 3 with empty unlocked list', args: [data({ total_xp: 200, unlocked: [] })] },
      { name: 'completed mission missing from unlocked', args: [data({ completed_missions: ['R-24'] })] },
    ],
    recordCompletion: [
      { name: 'first completion ever', args: [data({ streak_last_date: '' }), '2026-03-01'] },
      { name: 'same day again', args: [data({ streak_current: 3, streak_last_date: '2026-03-01' }), '2026-03-01'] },
      { name: 'next day', args: [data({ streak_current: 3, streak_last_date: '2026-03-01' }), '2026-03-02'] },
      { name: 'month boundary', args: [data({ streak_current: 4, streak_last_date: '2026-02-28' }), '2026-03-01'] },
      { name: 'year boundary', args: [data({ streak_current: 2, streak_last_date: '2025-12-31' }), '2026-01-01'] },
      { name: 'gap resets', args: [data({ streak_current: 9, streak_last_date: '2026-02-26' }), '2026-03-01'] },
    ],
    recordMissionRun: [
      { name: 'first run', args: [null, m(42000, 37, 52.9), '2026-03-01'] },
      { name: 'faster but more keys', args: [{ best_time_ms: 50000, best_keystrokes: 30, best_ks_per_min: 40, runs: 2, last_run: '2026-02-01' }, m(42000, 37, 52.9), '2026-03-01'] },
      { name: 'zero bests are replaced', args: [{ best_time_ms: 0, best_keystrokes: 0, best_ks_per_min: 0, runs: 0, last_run: '' }, m(1000, 5, 300), '2026-03-01'] },
    ],
    getXpProgress: [0, 100, 186, 2499, 2500, 3000].map((xp) => ({ name: `${xp} xp`, args: [xp] })),
    resolvePar: [
      { name: 'authored override wins', args: [{ parOverride: 35, difficulty: 2 }] },
      { name: 'zero override falls back to difficulty', args: [{ parOverride: 0, difficulty: 2 }] },
      { name: 'no override, difficulty 1', args: [{ parOverride: null, difficulty: 1 }] },
      { name: 'no difficulty uses fallback', args: [{ parOverride: null, difficulty: null }] },
    ],
    tierFor: [
      { name: 'no keystrokes', args: [0, 60] },
      { name: 'no par', args: [10, 0] },
      { name: 'at par is gold', args: [60, 60] },
      { name: 'just above par is silver', args: [61, 60] },
      { name: 'silver boundary', args: [90, 60] },
      { name: 'just above silver is bronze', args: [91, 60] },
      { name: 'bronze boundary', args: [150, 60] },
      { name: 'beyond bronze has no tier', args: [151, 60] },
    ],
    keystrokesToNextTier: [
      { name: 'gold has no next tier', args: [50, 60] },
      { name: 'silver to gold', args: [80, 60] },
      { name: 'bronze to silver', args: [120, 60] },
      { name: 'below bronze to bronze', args: [200, 60] },
      { name: 'no keystrokes', args: [0, 60] },
    ],
  };
}

// JSON round trip: the vector file is the contract, so `undefined` must vanish exactly as
// it does on disk before anything is compared.
const json = (v) => JSON.parse(JSON.stringify(v ?? null));

export function buildVectors(core) {
  const cases = casesFor(core);
  const out = {};
  for (const fn of Object.keys(FUNCTIONS)) {
    const impl = FUNCTIONS[fn](core);
    out[fn] = {
      schema: CONFORMANCE_SCHEMA,
      function: fn,
      cases: cases[fn].map((c) => ({ name: c.name, args: json(c.args), expected: json(impl(...json(c.args))) })),
    };
  }
  return out;
}

export function runVectors(vector, impl) {
  const failures = [];
  for (const c of vector.cases) {
    const actual = json(impl(...json(c.args)));
    if (!isDeepStrictEqual(actual, c.expected)) failures.push({ name: c.name, expected: c.expected, actual });
  }
  return failures;
}

export function serializeVector(vector) {
  return JSON.stringify(vector, null, 2) + '\n';
}
