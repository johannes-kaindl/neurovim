import { completeMission } from '../src/engine/MissionCompletion';
import { DEFAULT_PLUGIN_DATA } from '../src/types';

const metrics = { elapsed_ms: 42_000, keystrokes: 37, ks_per_min: 52.9 };
const m01 = { mission_id: 'M-01', xp_reward: 15, par_keystrokes: null, difficulty: 1 };

describe('completeMission', () => {
  it('awards XP, marks the mission completed, records the run and the streak', () => {
    const r = completeMission(DEFAULT_PLUGIN_DATA, m01, metrics, '2026-03-01');
    expect(r.xp).toBe(15);
    expect(r.data.total_xp).toBe(15);
    expect(r.data.completed_missions).toEqual(['M-01']);
    expect(r.data.missions['M-01']).toEqual({ best_time_ms: 42_000, best_keystrokes: 37, best_ks_per_min: 52.9, runs: 1, last_run: '2026-03-01' });
    expect(r.record).toBe(r.data.missions['M-01']);
    expect(r.data.streak_current).toBe(1);
    expect(r.data.streak_last_date).toBe('2026-03-01');
    expect(r.level_up).toBeNull();
  });

  it('awards XP again on a repeated completion but lists the mission once', () => {
    const first = completeMission(DEFAULT_PLUGIN_DATA, m01, metrics, '2026-03-01').data;
    const r = completeMission(first, m01, { elapsed_ms: 30_000, keystrokes: 50, ks_per_min: 100 }, '2026-03-02');
    expect(r.data.total_xp).toBe(30);
    expect(r.data.completed_missions).toEqual(['M-01']);
    expect(r.data.missions['M-01']).toMatchObject({ best_time_ms: 30_000, best_keystrokes: 37, best_ks_per_min: 100, runs: 2 });
    expect(r.data.streak_current).toBe(2);
  });

  it('reports a level-up with its unlocks', () => {
    const r = completeMission({ ...DEFAULT_PLUGIN_DATA, total_xp: 60 }, m01, metrics, '2026-03-01');
    expect(r.level_up?.new_level).toBe(2);
    expect(r.data.unlocked).toContain('M-05');
  });

  it('scores against the resolved par', () => {
    const r = completeMission(DEFAULT_PLUGIN_DATA, m01, metrics, '2026-03-01');
    expect(r.par).toBe(40);
    expect(r.tier).toBe('gold');
    expect(r.to_next_tier).toBeNull();
    const authored = completeMission(DEFAULT_PLUGIN_DATA, { ...m01, par_keystrokes: 30 }, metrics, '2026-03-01');
    expect(authored.par).toBe(30);
    expect(authored.tier).toBe('silver');
    expect(authored.to_next_tier).toEqual({ nextTier: 'gold', delta: 7 });
  });

  it('does not mutate its input', () => {
    const before = JSON.stringify(DEFAULT_PLUGIN_DATA);
    completeMission(DEFAULT_PLUGIN_DATA, m01, metrics, '2026-03-01');
    expect(JSON.stringify(DEFAULT_PLUGIN_DATA)).toBe(before);
  });
});

describe('completeMission with zero keystrokes (back-flow from neurovim-obsidian, 2026-07-23)', () => {
  // A solve without a single keystroke (pasted, already-solved text, an outside edit) wins the
  // mission and its XP, but must not touch the bests: a 0 would be adopted as a best score.
  const prev = { best_time_ms: 42_000, best_keystrokes: 37, best_ks_per_min: 52.9, runs: 1, last_run: '2026-03-01' };
  const base = { ...DEFAULT_PLUGIN_DATA, total_xp: 15, completed_missions: ['M-01'], missions: { 'M-01': prev } };

  it('awards XP but only bumps the run counter', () => {
    const r = completeMission(base, m01, { elapsed_ms: 1_000, keystrokes: 0, ks_per_min: 0 }, '2026-03-02');
    expect(r.unverified).toBe(true);
    expect(r.data.total_xp).toBe(30);
    expect(r.record).toEqual({ ...prev, runs: 2, last_run: '2026-03-02' });
  });

  it('starts an empty record on a first unverified run', () => {
    const r = completeMission(DEFAULT_PLUGIN_DATA, m01, { elapsed_ms: 1_000, keystrokes: 0, ks_per_min: 0 }, '2026-03-02');
    expect(r.record).toEqual({ best_time_ms: 0, best_keystrokes: 0, best_ks_per_min: 0, runs: 1, last_run: '2026-03-02' });
    expect(r.tier).toBeNull();
  });

  it('is verified as soon as one key was pressed', () => {
    expect(completeMission(base, m01, metrics, '2026-03-02').unverified).toBe(false);
  });
});
