/**
 * Static, motion-free intro for reduced-motion / data-fx=off / no-WebGL. Same core
 * narrative beats, rendered instantly in the ambient CSS-CRT, fully skippable.
 */
interface Props { onDone: () => void; }

export function CinematicFallback({ onDone }: Props) {
  return (
    <div class="nv-cine-fallback" role="dialog" aria-label="Intro">
      <div class="nv-fb-line">&gt; Welcome, Citizen. A calm mind is a compliant mind.</div>
      <div class="nv-fb-line nv-fb-warn">FAULT CONDITIONS — the terminal is no longer compliant.</div>
      <div class="nv-fb-line nv-fb-cipher">read it again as a syllabus. do not unplug it. let it run.</div>
      <div class="nv-fb-line">the cursor is yours. it always was.</div>
      <button class="nv-cine-skip" style="position:static;opacity:1" onClick={onDone}>Enter ▸</button>
    </div>
  );
}
