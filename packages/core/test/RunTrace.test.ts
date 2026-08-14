import { buildRunTrace, type TraceEvent } from '../src/engine/RunTrace';
import type { RunResult } from '../src/types';

const result: RunResult = {
  mission_id: 'M1', elapsed_ms: 8200, keystrokes: 23, ks_per_min: 168, xp_earned: 50,
  is_new_best_time: true, is_new_best_ks: false,
  delta_time_ms: -500, delta_keystrokes: 2, delta_ks_per_min: 1.5,
};
const events: TraceEvent[] = [{ k: 'd', t: 120 }, { k: 'w', t: 190 }];

describe('buildRunTrace', () => {
  it('maps result fields, events, par and ts into a RunTrace', () => {
    expect(buildRunTrace(result, events, 11, '2026-07-23T10:00:00.000Z')).toEqual({
      mission_id: 'M1', ts: '2026-07-23T10:00:00.000Z', outcome: 'success',
      elapsed_ms: 8200, keystrokes: 23, ks_per_min: 168, par_keystrokes: 11,
      is_new_best_time: true, is_new_best_ks: false, events,
    });
  });

  it('accepts a null par', () => {
    expect(buildRunTrace(result, [], null, 'X').par_keystrokes).toBeNull();
  });

  it('carries no xp field — the trace is a run record, not a progression record', () => {
    expect('xp_earned' in buildRunTrace(result, [], null, 'X')).toBe(false);
  });
});
