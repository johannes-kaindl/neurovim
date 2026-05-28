import { PluginData, LevelUpResult } from '../types';
import { LEVELS, UNLOCK_MAP } from '../data/levels';

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
}
