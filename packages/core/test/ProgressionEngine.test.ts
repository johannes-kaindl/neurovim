import { ProgressionEngine } from '../src/engine/ProgressionEngine';
import { DEFAULT_PLUGIN_DATA } from '../src/types';

function makeData(xp: number) {
  return { ...DEFAULT_PLUGIN_DATA, total_xp: xp };
}

describe('ProgressionEngine', () => {
  it('returns level 1 at 0 xp', () => {
    expect(ProgressionEngine.getLevelForXp(0)).toBe(1);
  });

  it('returns level 2 at 66 xp', () => {
    expect(ProgressionEngine.getLevelForXp(66)).toBe(2);
  });

  it('returns level 3 at 186 xp', () => {
    expect(ProgressionEngine.getLevelForXp(186)).toBe(3);
  });

  it('returns level 5 at 601 xp', () => {
    expect(ProgressionEngine.getLevelForXp(601)).toBe(5);
  });

  it('returns no level_up result when level unchanged', () => {
    const data = makeData(10);
    const result = ProgressionEngine.addXp(data, 5);
    expect(result.level_up).toBeNull();
    expect(result.new_data.total_xp).toBe(15);
  });

  it('returns level_up result when threshold crossed', () => {
    const data = makeData(60);
    const result = ProgressionEngine.addXp(data, 10);
    expect(result.level_up).not.toBeNull();
    expect(result.level_up!.new_level).toBe(2);
    expect(result.level_up!.unlocked_missions).toContain('M-05');
    expect(result.level_up!.unlocked_loot).toContain('LOOT-01');
  });

  it('unlocks KATA-04 at level 3', () => {
    const data = makeData(180);
    const result = ProgressionEngine.addXp(data, 10);
    expect(result.level_up!.new_level).toBe(3);
    expect(result.level_up!.unlocked_missions).toContain('KATA-04');
  });

  it('unlocks KATA-05 at level 4', () => {
    const data = makeData(365);
    const result = ProgressionEngine.addXp(data, 10);
    expect(result.level_up!.new_level).toBe(4);
    expect(result.level_up!.unlocked_missions).toContain('KATA-05');
  });

  it('unlocks KATA-06 at level 5', () => {
    const data = makeData(595);
    const result = ProgressionEngine.addXp(data, 10);
    expect(result.level_up!.new_level).toBe(5);
    expect(result.level_up!.unlocked_missions).toContain('KATA-06');
  });

  it('unlocks R-01..R-04 at level 5 (ARC II start)', () => {
    const data = makeData(595);
    const result = ProgressionEngine.addXp(data, 10);
    expect(result.level_up!.new_level).toBe(5);
    expect(result.level_up!.unlocked_missions).toContain('R-01');
    expect(result.level_up!.unlocked_missions).toContain('R-04');
  });

  it('unlocks R-05..R-08 and KATA-07 at level 6', () => {
    const data = makeData(794);
    const result = ProgressionEngine.addXp(data, 10);
    expect(result.level_up!.new_level).toBe(6);
    expect(result.level_up!.unlocked_missions).toContain('R-05');
    expect(result.level_up!.unlocked_missions).toContain('KATA-07');
  });

  it('unlocks R-09..R-16 at level 7', () => {
    const data = makeData(1140);
    const result = ProgressionEngine.addXp(data, 15);
    expect(result.level_up!.new_level).toBe(7);
    expect(result.level_up!.unlocked_missions).toContain('R-09');
    expect(result.level_up!.unlocked_missions).toContain('R-16');
  });

  it('unlocks R-17..R-20 at level 8', () => {
    const data = makeData(1540);
    const result = ProgressionEngine.addXp(data, 15);
    expect(result.level_up!.new_level).toBe(8);
    expect(result.level_up!.unlocked_missions).toContain('R-17');
    expect(result.level_up!.unlocked_missions).toContain('KATA-10');
  });

  it('unlocks R-21..R-24 and KATA-11 at level 9', () => {
    const data = makeData(1985);
    const result = ProgressionEngine.addXp(data, 20);
    expect(result.level_up!.new_level).toBe(9);
    expect(result.level_up!.unlocked_missions).toContain('R-21');
    expect(result.level_up!.unlocked_missions).toContain('R-24');
    expect(result.level_up!.unlocked_missions).toContain('KATA-11');
    expect(result.level_up!.unlocked_loot).toContain('LOOT-06');
  });

  it('updates streak on first completion today', () => {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const data = { ...makeData(0), streak_current: 3, streak_last_date: yesterday };
    const result = ProgressionEngine.recordCompletion(data);
    expect(result.streak_current).toBe(4);
    expect(result.streak_last_date).toBe(today);
  });

  it('does not double-increment streak same day', () => {
    const today = new Date().toISOString().slice(0, 10);
    const data = { ...makeData(0), streak_current: 3, streak_last_date: today };
    const result = ProgressionEngine.recordCompletion(data);
    expect(result.streak_current).toBe(3);
  });

  it('resets streak if more than 1 day missed', () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);
    const data = { ...makeData(0), streak_current: 5, streak_last_date: twoDaysAgo };
    const result = ProgressionEngine.recordCompletion(data);
    expect(result.streak_current).toBe(1);
  });

  describe('recordMissionRun', () => {
    const m = (elapsed_ms: number, keystrokes: number, ks_per_min: number) => ({ elapsed_ms, keystrokes, ks_per_min });

    it('seeds bests on the first run (no prev record)', () => {
      const r = ProgressionEngine.recordMissionRun(undefined, m(12000, 45, 225), '2026-05-28');
      expect(r.best_time_ms).toBe(12000);
      expect(r.best_keystrokes).toBe(45);
      expect(r.best_ks_per_min).toBe(225);
      expect(r.runs).toBe(1);
      expect(r.last_run).toBe('2026-05-28');
    });

    it('keeps the lower time/keystrokes and higher ks_per_min', () => {
      const prev = { best_time_ms: 12000, best_keystrokes: 45, best_ks_per_min: 225, runs: 1, last_run: '2026-05-27' };
      const r = ProgressionEngine.recordMissionRun(prev, m(9000, 50, 333), '2026-05-28');
      expect(r.best_time_ms).toBe(9000);   // faster → updated
      expect(r.best_keystrokes).toBe(45);  // 50 > 45 → kept
      expect(r.best_ks_per_min).toBe(333); // higher → updated
      expect(r.runs).toBe(2);
    });

    it('does not regress bests on a worse run', () => {
      const prev = { best_time_ms: 9000, best_keystrokes: 40, best_ks_per_min: 333, runs: 2, last_run: '2026-05-28' };
      const r = ProgressionEngine.recordMissionRun(prev, m(20000, 99, 100), '2026-05-29');
      expect(r.best_time_ms).toBe(9000);
      expect(r.best_keystrokes).toBe(40);
      expect(r.best_ks_per_min).toBe(333);
      expect(r.runs).toBe(3);
    });
  });

  describe('getXpProgress', () => {
    it('reports progress within level 1 toward level 2 (66 xp)', () => {
      const p = ProgressionEngine.getXpProgress(33);
      expect(p.level).toBe(1);
      expect(p.into).toBe(33);
      expect(p.span).toBe(66);
      expect(p.pct).toBe(50);
      expect(p.nextLevelXp).toBe(66);
      expect(p.nextTitle).toBe('GHOST OPERATOR');
    });

    it('reports progress within a mid level', () => {
      const p = ProgressionEngine.getXpProgress(186); // exactly level 3 start
      expect(p.level).toBe(3);
      expect(p.into).toBe(0);
      expect(p.span).toBe(371 - 186);
      expect(p.pct).toBe(0);
      expect(p.nextTitle).toBe('NEON WRAITH');
    });

    it('caps at max level (no next)', () => {
      const p = ProgressionEngine.getXpProgress(3000); // beyond level 10
      expect(p.level).toBe(10);
      expect(p.pct).toBe(100);
      expect(p.nextLevelXp).toBeNull();
      expect(p.nextTitle).toBeNull();
    });
  });
});
