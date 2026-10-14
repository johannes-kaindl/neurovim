// "Today" from the clock is the player's local day, not the UTC day. These probes live here
// rather than in jest: jest hands each test file a copy of process.env, so assigning TZ there
// never reaches Node and every case silently measures the machine's zone. node --test runs each
// file in its own real process, where Node re-reads TZ on assignment.
import test, { afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTs } from './load-ts.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const { localDay } = await loadTs(join(ROOT, 'packages/core/src/utils/time.ts'));
const { ProgressionEngine } = await loadTs(join(ROOT, 'packages/core/src/engine/ProgressionEngine.ts'));
const { DEFAULT_PLUGIN_DATA } = await loadTs(join(ROOT, 'packages/core/src/types.ts'));

const ORIGINAL_TZ = process.env.TZ;
afterEach(() => {
  if (ORIGINAL_TZ === undefined) delete process.env.TZ;
  else process.env.TZ = ORIGINAL_TZ;
  mock.timers.reset();
});

// 00:30 on 2026-10-15 in Berlin (CEST) — UTC is still on the 14th.
const BERLIN_HALF_PAST_MIDNIGHT = Date.UTC(2026, 9, 14, 22, 30);

test('probe guard: assigning TZ switches the zone in this process', () => {
  process.env.TZ = 'Europe/Berlin';
  assert.equal(new Date(BERLIN_HALF_PAST_MIDNIGHT).getDate(), 15);
  process.env.TZ = 'UTC';
  assert.equal(new Date(BERLIN_HALF_PAST_MIDNIGHT).getDate(), 14);
});

test('localDay is the local day just after local midnight, where UTC is a day behind', () => {
  process.env.TZ = 'Europe/Berlin';
  assert.equal(localDay(new Date(BERLIN_HALF_PAST_MIDNIGHT)), '2026-10-15');
});

test('localDay is the local day west of UTC, where UTC is a day ahead', () => {
  process.env.TZ = 'America/Los_Angeles';
  assert.equal(localDay(new Date(Date.UTC(2026, 9, 15, 3, 0))), '2026-10-14');
});

test('localDay pads and crosses a year boundary', () => {
  process.env.TZ = 'Pacific/Kiritimati'; // UTC+14
  assert.equal(localDay(new Date(Date.UTC(2026, 11, 31, 12, 0))), '2027-01-01');
});

test('recordCompletion without a day continues the streak by the local day', () => {
  process.env.TZ = 'Europe/Berlin';
  mock.timers.enable({ apis: ['Date'], now: BERLIN_HALF_PAST_MIDNIGHT });
  const r = ProgressionEngine.recordCompletion({ ...DEFAULT_PLUGIN_DATA, streak_current: 3, streak_last_date: '2026-10-14' });
  assert.equal(r.streak_last_date, '2026-10-15');
  assert.equal(r.streak_current, 4);
});

test('recordMissionRun without a day stamps last_run with the local day', () => {
  process.env.TZ = 'Europe/Berlin';
  mock.timers.enable({ apis: ['Date'], now: BERLIN_HALF_PAST_MIDNIGHT });
  const rec = ProgressionEngine.recordMissionRun(undefined, { elapsed_ms: 1000, keystrokes: 5, ks_per_min: 300 });
  assert.equal(rec.last_run, '2026-10-15');
});
