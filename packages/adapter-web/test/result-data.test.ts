import { completeMission, DEFAULT_PLUGIN_DATA } from '@neurovim/core';
import type { MetricsResult } from '@neurovim/core';
import { completeResult } from '../src/ui/resultData';

const m01 = { mission_id: 'M-01', xp_reward: 15, par_keystrokes: null, difficulty: 1 };
const played = { ...DEFAULT_PLUGIN_DATA, total_xp: 15, completed_missions: ['M-01'], missions: { 'M-01': { best_time_ms: 42000, best_keystrokes: 37, best_ks_per_min: 52.9, runs: 1, last_run: '2026-03-01' } } };

describe('result modal data', () => {
  it('a counted run shows its bests', () => {
    const metrics: MetricsResult = { elapsed_ms: 30000, keystrokes: 30, ks_per_min: 60 };
    const r = completeResult(completeMission(played, m01, metrics, '2026-03-02'), metrics, undefined);
    expect(r.unverified).toBe(false);
    expect(r.bestKeystrokes).toBe(30);
    expect(r.xp).toBe(15);
  });
  it('a run without a keystroke earns XP but shows no best — it is marked unverified', () => {
    const metrics: MetricsResult = { elapsed_ms: 1000, keystrokes: 0, ks_per_min: 0 };
    const r = completeResult(completeMission(played, m01, metrics, '2026-03-02'), metrics, undefined);
    expect(r.unverified).toBe(true);
    expect(r.bestKeystrokes).toBeUndefined();
    expect(r.bestTimeMs).toBeUndefined();
    expect(r.xp).toBe(15);
  });
});
