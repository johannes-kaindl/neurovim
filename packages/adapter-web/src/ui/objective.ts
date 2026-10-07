/**
 * What the mission editor shows under "Objective" — the one thing the player must never
 * have to guess. A mission with authored `objective` steps gets them as a list, each step
 * split into prose and exact target strings (backtick spans); a mission without steps
 * falls back to its summary line, and a mission without either to a generic line, so the
 * panel is never empty. Pure, so the decision is testable without rendering.
 */
import { splitInlineCode, type MissionSummary, type ObjectiveSegment } from '@neurovim/core';

export const FALLBACK_OBJECTIVE = 'Restore the transmission.';

export type ObjectiveView =
  | { kind: 'steps'; steps: ObjectiveSegment[][] }
  | { kind: 'summary'; text: string };

export function objectiveView(mission: Pick<MissionSummary, 'objective' | 'summary'>): ObjectiveView {
  const steps = (mission.objective ?? []).map((s) => s.trim()).filter((s) => s.length > 0);
  if (steps.length > 0) return { kind: 'steps', steps: steps.map(splitInlineCode) };
  const summary = mission.summary?.trim();
  return { kind: 'summary', text: summary ? summary : FALLBACK_OBJECTIVE };
}
