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
  const [diff, prog, par, types, completion, metrics, levels] = await Promise.all([
    loadTs(join(src, 'utils', 'diff.ts')),
    loadTs(join(src, 'engine', 'ProgressionEngine.ts')),
    loadTs(join(src, 'engine', 'ParTier.ts')),
    loadTs(join(src, 'types.ts')),
    loadTs(join(src, 'engine', 'MissionCompletion.ts')),
    loadTs(join(src, 'engine', 'MetricsTracker.ts')),
    loadTs(join(src, 'data', 'levels.ts')),
  ]);
  return {
    diff, PE: prog.ProgressionEngine, par, DEFAULT_PLUGIN_DATA: types.DEFAULT_PLUGIN_DATA,
    completion, metrics, levels,
  };
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
  completeMission: (c) => (data, mission, metrics, today) => c.completion.completeMission(data, mission, metrics, today),
  metricsResult: (c) => (keys, ms) => c.metrics.metricsResult(keys, ms),
  unlockLevelFor: (c) => (id) => c.levels.unlockLevelFor(id),
};

const FM = '---\ntitle: x\ntags: [a]\n---\n';
const FM_CRLF = '---\r\ntitle: x\r\n---\r\n';

export function casesFor(core) {
  const D = core.DEFAULT_PLUGIN_DATA;
  const data = (over) => ({ ...D, ...over });
  const m = (elapsed_ms, keystrokes, ks_per_min) => ({ elapsed_ms, keystrokes, ks_per_min });
  const run = m;
  const m01 = { mission_id: 'M-01', xp_reward: 15, par_keystrokes: null, difficulty: 1 };
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
      // JS `\s` is Unicode-aware; a port must strip these too (Option+Space types NBSP on macOS).
      { name: 'trailing no-break space stripped', args: ['alpha\u00A0\nbeta'] },
      { name: 'trailing ideographic space stripped', args: ['alpha\u3000'] },
      { name: 'no-break-space-only line is blank', args: ['alpha\n\u00A0\nbeta\n\u00A0'] },
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
      { name: 'trailing no-break space matches', args: ['a\u00A0\nb', 'a\nb'] },
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
      // Calendar and clock traps for ports: leap day, and the day after each DST switch.
      { name: 'leap day', args: [data({ streak_current: 1, streak_last_date: '2024-02-29' }), '2024-03-01'] },
      { name: 'after EU spring DST switch', args: [data({ streak_current: 1, streak_last_date: '2026-03-29' }), '2026-03-30'] },
      { name: 'after EU autumn DST switch', args: [data({ streak_current: 1, streak_last_date: '2026-10-25' }), '2026-10-26'] },
      { name: 'after US spring DST switch', args: [data({ streak_current: 1, streak_last_date: '2026-03-08' }), '2026-03-09'] },
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
    metricsResult: [
      { name: 'one decimal', args: [37, 42000] },
      { name: 'no time passed', args: [5, 0] },
      { name: 'exactly 90 per minute', args: [90, 60000] },
      { name: 'half rounds up (9.375 → 9.4)', args: [1, 6400] },
      { name: 'no keys', args: [0, 1000] },
    ],
    unlockLevelFor: ['M-01', 'M-05', 'LOOT-04', 'R-24', 'LOOT-09', 'NOPE'].map((id) => ({ name: id, args: [id] })),
    completeMission: [
      { name: 'first completion', args: [data({}), m01, run(42000, 37, 52.9), '2026-03-01'] },
      { name: 'repeat completion awards XP again, lists once', args: [data({ total_xp: 15, completed_missions: ['M-01'], streak_current: 1, streak_last_date: '2026-03-01', missions: { 'M-01': { best_time_ms: 42000, best_keystrokes: 37, best_ks_per_min: 52.9, runs: 1, last_run: '2026-03-01' } } }), m01, run(30000, 50, 100), '2026-03-02'] },
      { name: 'second completion the same day keeps the streak', args: [data({ total_xp: 15, completed_missions: ['M-02'], streak_current: 4, streak_last_date: '2026-03-01' }), m01, run(42000, 37, 52.9), '2026-03-01'] },
      { name: 'level-up with unlocks', args: [data({ total_xp: 60 }), m01, run(42000, 37, 52.9), '2026-03-01'] },
      { name: 'authored par, silver', args: [data({}), { ...m01, par_keystrokes: 30 }, run(42000, 37, 52.9), '2026-03-01'] },
      { name: 'no difficulty uses the fallback par', args: [data({}), { mission_id: 'R-01', xp_reward: 25, par_keystrokes: null, difficulty: null }, run(9000, 70, 466.7), '2026-03-01'] },
      { name: 'beyond bronze has no tier', args: [data({}), m01, run(90000, 200, 133.3), '2026-03-01'] },
      // Back-flow from neurovim-obsidian (2026-07-23): no keystroke → XP yes, bests no.
      { name: 'zero keystrokes keeps the bests', args: [data({ total_xp: 15, completed_missions: ['M-01'], missions: { 'M-01': { best_time_ms: 42000, best_keystrokes: 37, best_ks_per_min: 52.9, runs: 1, last_run: '2026-03-01' } } }), m01, run(1000, 0, 0), '2026-03-02'] },
      { name: 'zero keystrokes on a first run', args: [data({}), m01, run(1000, 0, 0), '2026-03-02'] },
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
