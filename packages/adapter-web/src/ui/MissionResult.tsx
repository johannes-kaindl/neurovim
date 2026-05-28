/**
 * MissionResult — Overlay-Modal nach Submit (ersetzt das Inline-Feedback).
 * Complete-State: XP-Gain + ggf. Level-Up. Fail-State: wie viele Zeilen noch
 * abweichen. Buttons: Retry/Review (Modal schließen), Next Mission, ← NEXUS.
 * Metrics-Felder (Zeit/Keystrokes) werden gerendert, sobald gesetzt (Item 6).
 */
export interface MissionResultData {
  status: 'complete' | 'fail';
  xp?: number;
  /** Neues Level, falls dieser Run ein Level-Up auslöste. */
  levelUp?: number | null;
  /** Fail: Anzahl noch abweichender Zeilen. */
  linesOff?: number;
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
