import { lazy, Suspense } from 'preact/compat';
import { useMemo, useState } from 'preact/hooks';
import { webglSupported } from './crt/support';
import { PowerOn } from './PowerOn';
import { CinematicFallback } from './fallback';
import { INTRO } from './cutscenes/intro';
import type { SfxCue } from './cutscene';

// Heavy WebGL chunk: only fetched after the power-on gesture.
const CutscenePlayer = lazy(() =>
  import('./narrative/CutscenePlayer').then((m) => ({ default: m.CutscenePlayer })),
);

interface Props {
  playCue: (cue: SfxCue) => void;
  onUnlockAudio: () => void | Promise<void>;
  onDone: () => void;
}

function canRunCinematic(): boolean {
  if (typeof window === 'undefined') return false;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const fxOff = document.documentElement.dataset.fx === 'off';
  return !reduce && !fxOff && webglSupported();
}

/** Decides power-on→cutscene vs static fallback; owns the audio-unlock gesture. */
export function CinematicIntro({ playCue, onUnlockAudio, onDone }: Props) {
  const cinematic = useMemo(canRunCinematic, []);
  const [powered, setPowered] = useState(false);

  if (!cinematic) return <CinematicFallback onDone={onDone} />;
  if (!powered) {
    // await the audio unlock so beat 0's opening cue isn't dropped before the context is ready
    return <PowerOn onPowerOn={async () => { await onUnlockAudio(); setPowered(true); }} />;
  }
  return (
    <Suspense fallback={<div class="nv-cine-load" />}>
      <CutscenePlayer cutscene={INTRO} playCue={playCue} onDone={onDone} />
    </Suspense>
  );
}
