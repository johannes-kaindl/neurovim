import { PluginData, LevelUpResult, MissionRecord } from '../types';
import { LEVELS, UNLOCK_MAP } from '../data/levels';
import type { MetricsResult } from './MetricsTracker';

interface AddXpResult {
  new_data: PluginData;
  level_up: LevelUpResult | null;
}

export class ProgressionEngine {
  static getLevelForXp(xp: number): number {
    let level = 1;
    for (const l of LEVELS) {
      if (xp >= l.xp_required) level = l.level;
    }
    return level;
  }

  static addXp(data: PluginData, amount: number): AddXpResult {
    const old_level = this.getLevelForXp(data.total_xp);
    const new_xp = data.total_xp + amount;
    const new_level = this.getLevelForXp(new_xp);
    const new_unlocked = [...data.unlocked];

    let level_up: LevelUpResult | null = null;

    if (new_level > old_level) {
      const unlocks = UNLOCK_MAP[new_level] ?? { missions: [], loot: [] };
      for (const id of [...unlocks.missions, ...unlocks.loot]) {
        if (!new_unlocked.includes(id)) new_unlocked.push(id);
      }
      level_up = {
        old_level,
        new_level,
        unlocked_missions: unlocks.missions,
        unlocked_loot: unlocks.loot,
      };
    }

    return {
      new_data: { ...data, total_xp: new_xp, unlocked: new_unlocked },
      level_up,
    };
  }

  static recordCompletion(data: PluginData): PluginData {
    const today = new Date().toISOString().slice(0, 10);
    const last = data.streak_last_date;
    if (last === today) return data;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const streak = last === yesterday ? data.streak_current + 1 : 1;
    return { ...data, streak_current: streak, streak_last_date: today };
  }

  static getLevelData(level: number) {
    return LEVELS.find(l => l.level === level) ?? LEVELS[0];
  }

  /**
   * XP progress within the current level (for the NEXUS progress bar).
   * `into`/`span` = XP since level start / until the next level; `pct` 0..100.
   * At max level: pct=100, nextLevelXp=null, nextTitle=null.
   */
  static getXpProgress(xp: number): {
    level: number; into: number; span: number; pct: number;
    nextLevelXp: number | null; nextTitle: string | null;
  } {
    const level = this.getLevelForXp(xp);
    const cur = this.getLevelData(level);
    const next = LEVELS.find(l => l.level === level + 1);
    if (!next) return { level, into: 0, span: 0, pct: 100, nextLevelXp: null, nextTitle: null };
    const span = next.xp_required - cur.xp_required;
    const into = xp - cur.xp_required;
    const pct = span > 0 ? Math.min(100, Math.round((into / span) * 100)) : 100;
    return { level, into, span, pct, nextLevelXp: next.xp_required, nextTitle: next.title };
  }

  /**
   * Personal-best update for a mission after a successful run.
   * best_time_ms / best_keystrokes = minimum (smaller = better; 0 = no best yet),
   * best_ks_per_min = maximum (higher throughput). `runs` is incremented.
   * `today` is injectable (tests pass in a fixed date).
   */
  static recordMissionRun(
    prev: MissionRecord | undefined,
    metrics: MetricsResult,
    today: string = new Date().toISOString().slice(0, 10),
  ): MissionRecord {
    const lower = (cur: number, next: number) => (cur > 0 ? Math.min(cur, next) : next);
    return {
      best_time_ms: lower(prev?.best_time_ms ?? 0, metrics.elapsed_ms),
      best_keystrokes: lower(prev?.best_keystrokes ?? 0, metrics.keystrokes),
      best_ks_per_min: Math.max(prev?.best_ks_per_min ?? 0, metrics.ks_per_min),
      runs: (prev?.runs ?? 0) + 1,
      last_run: today,
    };
  }
}
