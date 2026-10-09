/**
 * Persistence contract for the web submit() flow. submit() calls the core's completeMission
 * (addXp → recordCompletion → recordMissionRun) and saves via WebStorage; this exercises
 * that function plus the IndexedDB round-trip, without rendering CM6/UI (the brittle
 * part). It also guards the cross-adapter record contract — best_time_ms = min time,
 * best_keystrokes = min keystrokes, best_ks_per_min = max throughput — the semantics the
 * Obsidian adapter was realigned to (it previously tied throughput to the fastest time).
 */
import 'fake-indexeddb/auto';
import { completeMission as completeMissionCore, DEFAULT_PLUGIN_DATA } from '@neurovim/core';
import type { MetricsResult, PluginData } from '@neurovim/core';
import { WebStorage } from '../src/ports/WebStorage';

/** The persistence half of App.tsx submit(): the real core function, with a fixed day. */
function completeMission(
  data: PluginData,
  missionId: string,
  xp: number,
  metrics: MetricsResult,
): PluginData {
  return completeMissionCore(data, { mission_id: missionId, xp_reward: xp }, metrics, '2026-03-01').data;
}

describe('progression persistence', () => {
  it('round-trips a completed mission through IndexedDB', async () => {
    const storage = new WebStorage();
    const metrics: MetricsResult = { elapsed_ms: 12_000, keystrokes: 40, ks_per_min: 200 };
    const next = completeMission(DEFAULT_PLUGIN_DATA, 'M-01', 50, metrics);

    await storage.saveData(next, 'prog-1');
    const loaded = await storage.loadData<PluginData>('prog-1');

    expect(loaded?.total_xp).toBe(DEFAULT_PLUGIN_DATA.total_xp + 50);
    expect(loaded?.completed_missions).toContain('M-01');
    expect(loaded?.missions['M-01']).toEqual(next.missions['M-01']);
    expect(loaded?.missions['M-01'].runs).toBe(1);
  });

  it('keeps min time and max throughput across two runs (cross-adapter record contract)', async () => {
    const storage = new WebStorage();
    const fast: MetricsResult = { elapsed_ms: 8_000, keystrokes: 30, ks_per_min: 225 };
    const slowerButHigherThroughput: MetricsResult = { elapsed_ms: 10_000, keystrokes: 28, ks_per_min: 240 };

    let data = completeMission(DEFAULT_PLUGIN_DATA, 'M-02', 50, fast);
    data = completeMission(data, 'M-02', 50, slowerButHigherThroughput);

    await storage.saveData(data, 'prog-2');
    const rec = (await storage.loadData<PluginData>('prog-2'))!.missions['M-02'];

    expect(rec.best_time_ms).toBe(8_000);   // min time (the faster run)
    expect(rec.best_keystrokes).toBe(28);   // min keystrokes (the second run)
    expect(rec.best_ks_per_min).toBe(240);  // max throughput — NOT tied to best time
    expect(rec.runs).toBe(2);
  });
});
