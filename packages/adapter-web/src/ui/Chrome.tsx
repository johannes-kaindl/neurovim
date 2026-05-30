interface Props {
  audioOn: boolean; reduceEffects: boolean;
  onToggleAudio: () => void; onToggleEffects: () => void;
}
export function ControlCluster({ audioOn, reduceEffects, onToggleAudio, onToggleEffects }: Props) {
  return (
    <div class="nv-controls">
      <button class="nv-ctl" aria-pressed={audioOn} aria-label={audioOn ? 'Sound on' : 'Sound off'} title={audioOn ? 'Sound on' : 'Sound off'} onClick={onToggleAudio}>
        {audioOn ? <span>♪</span> : <span class="nv-ctl-mute">♪</span>}
      </button>
      <button class="nv-ctl" aria-pressed={!reduceEffects} aria-label={reduceEffects ? 'Effects off' : 'Effects on'} title={reduceEffects ? 'Effects off' : 'Effects on'} onClick={onToggleEffects}>
        {reduceEffects ? '▢' : '▣'}
      </button>
    </div>
  );
}
