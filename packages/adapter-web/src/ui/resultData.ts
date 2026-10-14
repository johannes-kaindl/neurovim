import type { CompletionResult, MetricsResult } from '@neurovim/core';
import type { MissionResultData } from './MissionResult';

/**
 * The result modal's view of a solved run. A run without a single keystroke wins and earns XP
 * but sets no bests (core `unverified`), so it carries no best values and the modal says why.
 */
export function completeResult(done: CompletionResult, metrics: MetricsResult, debrief: string | undefined): MissionResultData {
  return {
    status: 'complete',
    debrief,
    xp: done.xp,
    levelUp: done.level_up ? done.level_up.new_level : null,
    timeMs: metrics.elapsed_ms,
    keystrokes: metrics.keystrokes,
    bestTimeMs: done.unverified ? undefined : done.record.best_time_ms,
    bestKeystrokes: done.unverified ? undefined : done.record.best_keystrokes,
    unverified: done.unverified,
    tier: done.tier,
    parKeystrokes: done.par,
    toNextTier: done.to_next_tier,
    unlocked: done.level_up ? done.level_up.unlocked_missions : undefined,
  };
}
