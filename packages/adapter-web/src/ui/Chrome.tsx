interface Props {
  audioOn: boolean; reduceEffects: boolean;
  onToggleAudio: () => void; onToggleEffects: () => void;
}
export function ControlCluster({ audioOn, reduceEffects, onToggleAudio, onToggleEffects }: Props) {
  return (
    <div class="nv-controls">
      <button class="nv-ctl" aria-pressed={audioOn} title={audioOn ? 'Sound on' : 'Sound off'} onClick={onToggleAudio}>
        {audioOn ? '♪' : '♪̶'}
      </button>
      <button class="nv-ctl" aria-pressed={!reduceEffects} title={reduceEffects ? 'Effects off' : 'Effects on'} onClick={onToggleEffects}>
        {reduceEffects ? '▢' : '▣'}
      </button>
    </div>
  );
}
