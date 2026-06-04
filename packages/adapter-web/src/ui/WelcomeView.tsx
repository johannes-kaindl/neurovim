/**
 * WelcomeView — landing page at app start (before the NEXUS picker).
 * Renders the welcome intro (from @neurovim/content) as Markdown.
 * On true first run, overlays the cinematic intro (cutscene #1). Button: Enter NEXUS → picker.
 */
import { useEffect, useState } from 'preact/hooks';
import { getWelcome } from '@neurovim/content';
import { renderMarkdown } from './markdown';
import { CinematicIntro } from '../cinematic/CinematicIntro';
import type { SfxCue } from '../cinematic/cutscene';

interface Props {
  onEnter: () => void;
  /** persisted player data has loaded — gate the intro decision on this so a returning
   *  player (introSeen=true, which arrives a tick after the default) never flashes the intro */
  dataReady: boolean;
  /** false → play the cinematic once; true → skip straight to the welcome content */
  introSeen: boolean;
  /** persist introSeen=true after the cinematic finishes */
  onIntroDone: () => void;
  onUnlockAudio: () => void;
  playCue: (cue: SfxCue) => void;
}

export function WelcomeView({ onEnter, dataReady, introSeen, onIntroDone, onUnlockAudio, playCue }: Props) {
  const html = renderMarkdown(getWelcome());
  // 'wait' covers the screen with a neutral dark shell until data loads; then either play the
  // cinematic once ('intro') or reveal the welcome content ('content'). Decided exactly once.
  const [phase, setPhase] = useState<'wait' | 'intro' | 'content'>('wait');

  useEffect(() => {
    if (phase === 'wait' && dataReady) setPhase(introSeen ? 'content' : 'intro');
  }, [dataReady, introSeen, phase]);

  function finishIntro() {
    onIntroDone();
    setPhase('content');
  }

  return (
    <div class="nv-doc nv-welcome nv-crt nv-hud-frame">
      <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />
      {phase === 'wait' && <div class="nv-cine-load" />}
      {phase === 'intro' && (
        <CinematicIntro playCue={playCue} onUnlockAudio={onUnlockAudio} onDone={finishIntro} />
      )}
      {phase === 'content' && (
        <>
          <article class="nv-md" dangerouslySetInnerHTML={{ __html: html }} />
          <div class="nv-doc-foot">
            <button class="nv-modal-primary nv-welcome-enter" onClick={onEnter}>Enter NEXUS →</button>
          </div>
        </>
      )}
    </div>
  );
}
