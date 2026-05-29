/**
 * MissionResult — overlay modal after submit (replaces the inline feedback).
 * Complete state: XP gain + optionally level-up. Fail state: how many lines still
 * differ. Buttons: Retry/Review (close modal), Next Mission, ← NEXUS.
 * Metrics fields (time/keystrokes) are rendered as soon as they are set (Item 6).
 */
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
  return (
    <div class="nv-modal-backdrop" onClick={onRetry}>
      <div class="nv-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h2 class={complete ? 'nv-modal-title nv-ok' : 'nv-modal-title nv-fail'}>
          {complete ? '✓ MISSION COMPLETE' : '✗ TRY AGAIN'}
        </h2>
        <p class="nv-modal-sub">{missionTitle}</p>

        {complete ? (
          <div class="nv-modal-body">
            <div class="nv-modal-xp">+{result.xp ?? 0} XP</div>
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
