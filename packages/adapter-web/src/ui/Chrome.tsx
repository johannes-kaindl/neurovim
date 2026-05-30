interface Props {
  audioOn: boolean; reduceEffects: boolean;
  onToggleAudio: () => void; onToggleEffects: () => void;
  onCheatsheet: () => void;
}
export function ControlCluster({ audioOn, reduceEffects, onToggleAudio, onToggleEffects, onCheatsheet }: Props) {
  return (
    <div class="nv-controls">
      <button class="nv-ctl" aria-label="Vim cheatsheet" title="Vim cheatsheet" onClick={onCheatsheet}>⌨</button>
      <button class="nv-ctl" aria-pressed={audioOn} aria-label={audioOn ? 'Sound on' : 'Sound off'} title={audioOn ? 'Sound on' : 'Sound off'} onClick={onToggleAudio}>
        {audioOn ? <span>♪</span> : <span class="nv-ctl-mute">♪</span>}
      </button>
      <button class="nv-ctl" aria-pressed={!reduceEffects} aria-label={reduceEffects ? 'Effects off' : 'Effects on'} title={reduceEffects ? 'Effects off' : 'Effects on'} onClick={onToggleEffects}>
        {reduceEffects ? '▢' : '▣'}
      </button>
    </div>
  );
}

/** One-time first-run cue: audio is off by default; points at the ♪ control. Non-blocking (role=status). */
export function AudioHint({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div class="nv-audiohint" role="status" aria-live="polite">
      <span>Audio is off — click <b>♪</b> above to bring the signal online.</span>
      <button class="nv-audiohint-x" aria-label="Dismiss hint" onClick={onDismiss}>×</button>
    </div>
  );
}
