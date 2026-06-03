/**
 * MissionResult — overlay modal after submit (replaces the inline feedback).
 * Complete state: XP gain + optionally level-up. Fail state: how many lines still
 * differ. Buttons: Retry/Review (close modal), Next Mission, ← NEXUS.
 * Metrics fields (time/keystrokes) are rendered as soon as they are set (Item 6).
 */
import { useEffect, useRef } from 'preact/hooks';
import type { Tier } from '@neurovim/core';
import { fmtTime } from './format';

export interface MissionResultData {
  status: 'complete' | 'fail';
  xp?: number;
  /** New level, if this run triggered a level-up. */
  levelUp?: number | null;
  /** Fail: number of lines still differing. */
  linesOff?: number;
  /** Metrics for this run (complete). */
  timeMs?: number;
  keystrokes?: number;
  /** Personal best values after this run. */
  bestTimeMs?: number;
  bestKeystrokes?: number;
  /** Tier earned on this run (gold/silver/bronze) or null = completed, no tier. */
  tier?: Tier;
  /** Resolved par for the mission (gold threshold), for the badge subtitle. */
  parKeystrokes?: number;
  /** Next better tier + keystrokes to shave, for the nudge. null when gold/absent. */
  toNextTier?: { nextTier: Exclude<Tier, null>; delta: number } | null;
  /** Mission ids newly unlocked by this run's level-up (for the UNLOCKED line + NEXUS reveal). */
  unlocked?: string[];
}

interface Props {
  result: MissionResultData;
  missionTitle: string;
  hasNext: boolean;
  onRetry: () => void;
  onNext: () => void;
  onNexus: () => void;
}

export function MissionResult({ result, missionTitle, hasNext, onRetry, onNext, onNexus }: Props) {
  const complete = result.status === 'complete';
  const panel = useRef<HTMLDivElement>(null);

  // a11y: Escape-to-dismiss + Tab focus-trap + focus-restore, initial focus on the
  // primary action — mirrors CheatsheetOverlay (spec §4 Result, §5 a11y). onRetry is
  // the dismiss path (same as the backdrop click) for both complete and fail states.
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const focusFirst = () =>
      panel.current?.querySelector<HTMLElement>('.nv-modal-primary') ??
      panel.current?.querySelector<HTMLElement>('button');
    focusFirst()?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { e.preventDefault(); onRetry(); return; }
      if (e.key === 'Tab' && panel.current) {
        const f = Array.from(
          panel.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'),
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [onRetry]);

  return (
    <div class="nv-modal-backdrop" onClick={onRetry}>
      <div ref={panel} class="nv-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h2 class={complete ? 'nv-modal-title nv-ok' : 'nv-modal-title nv-fail'}>
          {complete ? '✓ MISSION COMPLETE' : '✗ TRY AGAIN'}
        </h2>
        <p class="nv-modal-sub">{missionTitle}</p>

        {complete ? (
          <div class="nv-modal-body">
            <div class="nv-modal-xp">+{result.xp ?? 0} XP</div>
            {result.tier && (
              <div class={`nv-tier-badge nv-tier-${result.tier}`}>
                {result.tier === 'gold' ? '★' : result.tier === 'silver' ? '◆' : '▲'} {result.tier.toUpperCase()}
                <span class="nv-tier-par"> · {result.keystrokes}/{result.parKeystrokes} ks</span>
              </div>
            )}
            {result.toNextTier && (
              <div class="nv-tier-nudge">
                {Math.ceil(result.toNextTier.delta)} keystroke{Math.ceil(result.toNextTier.delta) !== 1 ? 's' : ''} from {result.toNextTier.nextTier} — retry?
              </div>
            )}
            {result.levelUp != null && (
              <div class="nv-modal-levelup">LEVEL UP → {result.levelUp}</div>
            )}
            {result.timeMs != null && (
              <div class="nv-modal-metrics">
                <span>{fmtTime(result.timeMs)}</span>
                <span>{result.keystrokes} keystrokes</span>
                {(result.bestTimeMs != null || result.bestKeystrokes != null) && (
                  <span class="nv-modal-best">
                    best {fmtTime(result.bestTimeMs ?? result.timeMs)} · {result.bestKeystrokes ?? result.keystrokes} ks
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <p class="nv-modal-body">
            {result.linesOff ?? 0} line{result.linesOff !== 1 ? 's' : ''} still differ — keep editing.
          </p>
        )}

        <div class="nv-modal-actions">
          <button onClick={onRetry}>{complete ? 'Review' : 'Retry'}</button>
          {complete && hasNext && (
            <button class="nv-modal-primary" onClick={onNext}>Next Mission →</button>
          )}
          <button onClick={onNexus}>← NEXUS</button>
        </div>
      </div>
    </div>
  );
}
