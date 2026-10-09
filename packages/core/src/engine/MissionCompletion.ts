import { PluginData, LevelUpResult, MissionRecord } from '../types';
import { ProgressionEngine } from './ProgressionEngine';
import type { MetricsResult } from './MetricsTracker';
import { resolvePar, tierFor, keystrokesToNextTier, Tier } from './ParTier';

/** The mission fields a completion needs. */
export interface CompletedMission {
  mission_id: string;
  xp_reward: number;
  par_keystrokes?: number | null;
  difficulty?: number | null;
}

export interface CompletionResult {
  /** The new player state, ready to persist. */
  data: PluginData;
  xp: number;
  level_up: LevelUpResult | null;
  /** This mission's personal bests after the run (also in data.missions). */
  record: MissionRecord;
  par: number;
  tier: Tier;
  to_next_tier: { nextTier: Exclude<Tier, null>; delta: number } | null;
}

/**
 * Everything that happens when a mission is solved, as one pure function: XP on every
 * completion (repeats included), the daily streak, the completed list (no duplicates), the
 * personal bests, and the par score. Moved up from adapter-web's submit() so every consumer
 * scores a run the same way — the Neovim port is proven against its conformance vectors.
 * `today` is the UTC day (YYYY-MM-DD) the run counts for.
 */
export function completeMission(
  data: PluginData,
  mission: CompletedMission,
  metrics: MetricsResult,
  today: string,
): CompletionResult {
  const { new_data, level_up } = ProgressionEngine.addXp(data, mission.xp_reward);
  let next = ProgressionEngine.recordCompletion(new_data, today);
  if (!next.completed_missions.includes(mission.mission_id)) {
    next = { ...next, completed_missions: [...next.completed_missions, mission.mission_id] };
  }
  const record = ProgressionEngine.recordMissionRun(next.missions[mission.mission_id], metrics, today);
  next = { ...next, missions: { ...next.missions, [mission.mission_id]: record } };
  const par = resolvePar({ parOverride: mission.par_keystrokes, difficulty: mission.difficulty });
  return {
    data: next,
    xp: mission.xp_reward,
    level_up,
    record,
    par,
    tier: tierFor(metrics.keystrokes, par),
    to_next_tier: keystrokesToNextTier(metrics.keystrokes, par),
  };
}
