import { useEffect, useRef, useState } from 'preact/hooks';
import { buildTimeline, frameAt, type Cutscene, type SfxCue } from '../cutscene';
import { mulberry32 } from '../rng';
import { CrtShader } from '../crt/CrtShader';
import { TerminalCanvas } from '../render/TerminalCanvas';

interface Props {
  cutscene: Cutscene;
  /** fire a beat's audio cue (already gated on ui.audioOn by the caller) */
  playCue: (cue: SfxCue) => void;
  onDone: () => void;
  /** deterministic seed (defaults to a fixed value for reproducible pacing) */
  seed?: number;
}

/**
 * Renders a cutscene: a hidden 2D "source" canvas holds the typed terminal text; a visible
 * WebGL canvas post-processes it through the CRT shader each frame. Skippable (key/click/Esc).
 */
export function CutscenePlayer({ cutscene, playCue, onDone, seed = 1337 }: Props) {
  const glRef = useRef<HTMLCanvasElement>(null);
  const [out, setOut] = useState(false);
  const doneRef = useRef(false);
  // Set inside the effect; lets the skip button reach the real finish() (rAF cancel + guard).
  const finishRef = useRef<() => void>(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setOut(true);
    window.setTimeout(onDone, 500);
  });

  useEffect(() => {
    const glCanvas = glRef.current;
    if (!glCanvas) return;

    const source = document.createElement('canvas');
    let crt: CrtShader;
    try {
      crt = new CrtShader(glCanvas);
    } catch {
      // WebGL died between probe and mount — bail straight to done.
      doneRef.current = true;
      onDone();
      return;
    }
    const term = new TerminalCanvas(source);
    const timeline = buildTimeline(cutscene, mulberry32(seed));

    const sync = () => {
      crt.resize();
      term.resize(glCanvas.width || 1280, glCanvas.height || 800);
    };
    sync();
    window.addEventListener('resize', sync);

    let raf = 0;
    let start = 0;
    let lastBeat = -1;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      cancelAnimationFrame(raf);
      setOut(true);                 // CSS fade-out
      window.setTimeout(onDone, 500);
    };
    finishRef.current = finish;     // share the real finish with the skip button

    const loop = (t: number) => {
      if (start === 0) start = t;
      const elapsed = t - start;
      const frame = frameAt(timeline, elapsed);
      if (frame.beatIndex !== lastBeat) {
        lastBeat = frame.beatIndex;
        const cue = timeline.windows[frame.beatIndex].beat.sfx;
        if (cue) playCue(cue);
      }
      term.draw(frame, elapsed);
      crt.render(source, { timeMs: elapsed, glitch: frame.glitch });
      if (frame.done) { finish(); return; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onKey = (e: KeyboardEvent) => { if (!e.repeat) finish(); };
    const onClick = () => finish();
    // GPU context loss mid-cutscene: end gracefully instead of freezing on the last frame.
    const onCtxLost = (e: Event) => { e.preventDefault(); finish(); };
    window.addEventListener('keydown', onKey);
    glCanvas.addEventListener('click', onClick);
    glCanvas.addEventListener('webglcontextlost', onCtxLost);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', sync);
      window.removeEventListener('keydown', onKey);
      glCanvas.removeEventListener('click', onClick);
      glCanvas.removeEventListener('webglcontextlost', onCtxLost);
      crt.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div class={`nv-cine${out ? ' nv-cine-out' : ''}`}>
      <canvas ref={glRef} class="nv-cine-canvas" aria-hidden="true" />
      <button class="nv-cine-skip" aria-label="Skip intro" onClick={() => finishRef.current()}>
        skip ▸
      </button>
    </div>
  );
}
