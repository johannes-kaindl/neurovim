import type { Rng } from './rng';
import { planTyping, type TypeStep, type TypingProfile } from './typing';

export type BeatTheme = 'corp' | 'fault' | 'warning' | 'cipher' | 'unlock';
export type SfxCue = 'boot' | 'glitch' | 'klaxon' | 'signal' | 'unlock';

export interface Beat {
  id: string;
  /** lines for this beat; joined with '\n' and typed as one block */
  lines: string[];
  typing: TypingProfile;
  /** 0..1 CRT glitch intensity for this beat */
  glitch: number;
  theme: BeatTheme;
  /** audio cue fired when this beat begins */
  sfx?: SfxCue;
  /** dwell time (ms) after typing completes, before the next beat */
  holdMs: number;
}

export interface Cutscene { id: string; beats: Beat[]; }

export interface BeatWindow {
  beat: Beat;
  startMs: number;
  endMs: number;
  plan: TypeStep[];
}

export interface Timeline { windows: BeatWindow[]; totalMs: number; }

export interface RenderFrame {
  beatIndex: number;
  text: string;
  glitch: number;
  theme: BeatTheme;
  done: boolean;
}

/** Expand a cutscene into absolute-timed windows. Deterministic for a given rng seed. */
export function buildTimeline(cutscene: Cutscene, rng: Rng): Timeline {
  const windows: BeatWindow[] = [];
  let cursor = 0;
  for (const beat of cutscene.beats) {
    const text = beat.lines.join('\n');
    const plan = planTyping(text, beat.typing, rng, cursor);
    const typeEnd = plan.length ? plan[plan.length - 1].atMs : cursor;
    const endMs = typeEnd + beat.holdMs;
    windows.push({ beat, startMs: cursor, endMs, plan });
    cursor = endMs;
  }
  return { windows, totalMs: cursor };
}

/** The render state at absolute time `tMs`. Clamps to the last beat when past the end. */
export function frameAt(timeline: Timeline, tMs: number): RenderFrame {
  const { windows, totalMs } = timeline;
  const done = tMs >= totalMs;
  let idx = windows.findIndex((w) => tMs >= w.startMs && tMs < w.endMs);
  if (idx < 0) idx = done ? windows.length - 1 : 0;
  const w = windows[idx];
  // full text during the hold / past the end; otherwise the last step typed so far
  const lastAtMs = w.plan.length ? w.plan[w.plan.length - 1].atMs : w.startMs;
  let text = '';
  if (done || tMs >= lastAtMs) {
    text = w.beat.lines.join('\n');
  } else {
    for (const step of w.plan) {
      if (step.atMs <= tMs) text = step.text;
      else break;
    }
  }
  return { beatIndex: idx, text, glitch: w.beat.glitch, theme: w.beat.theme, done };
}
