# Cinematic Intro — Design Spec

> **Date:** 2026-06-04 · **Status:** approved (brainstorm), pending implementation plan
> **Goal:** replace the 3-line `BootIntro` with a ~22s cinematic first-run sequence that
> dramatises the Compliance-Handbook story — a CORP terminal boots compliant, glitches
> through the "Fault Conditions" (the hidden Vim syllabus), screams *UNPLUG AND REPORT*,
> is overridden by CIPHER's signal ("let it run"), and unlocks NeuroVIM. Built as
> **cutscene #1 of a reusable Cinematic Engine**, so later story beats are cheap content.

## Parent vision (context for the cut)

This cycle is the first slice of a larger **Cinematic Layer** (agreed during brainstorm):

- **Two display layers.** *Ambient CRT* = the always-on CSS treatment (scanlines, vignette,
  glow, corner-brackets via `.nv-crt` + `--nv-scan/--nv-glow/--nv-vignette`) — already shipped,
  live/interactive/accessible. *Cinematic CRT* = a full WebGL post-process that renders its
  **own** content (text/ASCII/schematics drawn to a canvas) through a true CRT shader; plays
  only during non-interactive **cutscenes**.
- **One engine, many cutscenes.** A CRT shader module + a ported kuro typing/glitch engine +
  a deterministic cutscene-script format. The intro is cutscene #1; copter-hack, sensor-tap,
  mission stingers, arc transitions are **follow-on content cycles** (new scripts + 2D canvas
  scenes through the same engine — no new core tech).
- **Deliberately dropped:** app-wide *live* WebGL curvature — not feasible for interactive DOM
  (DOM-to-texture destroys text crispness, click targets, screen-reader access, perf, bundle).
  The ambient+cinematic split delivers ~95% of the feel for ~5% of the risk.

Source script: `docs/lore/citizen-compliance-handbook.md`. Reference look: a gentle CRT bulge
(see brainstorm reference image) — **not** a fishbowl.

## Decisions (locked during brainstorm)

| Question | Decision |
|---|---|
| CRT rendering | **WebGL shader** (port of kuro's CRT logic, no Three.js) **+ CSS fallback** |
| Curvature | **GENTLE 0.018, hard-wired** — no user setting (kuro's own default ballpark) |
| Scope this cycle | **Cinematic Engine + Intro (cutscene #1)** only; copter/sensor cutscenes later |
| Trigger | **First-run only** (persistent `introSeen` flag) **+ Replay button** in NEXUS/Settings |
| Audio | **Power-on gesture + full SFX** — a `BOOT TERMINAL ▶` click unlocks audio & starts it |
| Where it lives | All in **`adapter-web/src/cinematic/`** (browser-specific; web-only). No new package. |
| Engine depth | Port typeInto + a glitch-artifact subset; **deterministic** beat-runner (not kuro's random/time-driven narrative); persona simplified to per-beat intensity |
| Fallback | reduced-motion / no-WebGL → static CSS-CRT version of the core beats, instant, skippable |

## 1. Architecture & placement

The cinematic code is **browser-specific** (WebGL, Canvas, DOM) so it stays out of `core`
(which must remain DOM-free) and lives entirely in `adapter-web`. The intro is **web-only**
(Obsidian is logic-parity only per AGENTS.md — no back-port). No new workspace package; clean
module boundaries inside `adapter-web/src/cinematic/` make it the *de facto* reusable engine
without speculative generality (YAGNI — the 6 beats already exercise the script format).

kuro source (`../kuro-screensaver`) is the same author's AGPL code → porting/reimplementing
its logic is licensing-free. We port **logic**, not its Three.js render path.

## 2. Engine modules (the Cycle-1 cut)

```
adapter-web/src/cinematic/
├── crt/
│   ├── CrtShader.ts        # WebGL post-process: ctx init, fullscreen quad, uniform plumbing,
│   │                       #   render(sourceCanvas, {time, glitch}). Lazy-loaded chunk.
│   └── shader.ts           # vertex + fragment GLSL as strings. curvature 0.018 fixed.
├── typing/
│   └── typeInto.ts         # kuro typing engine ported → onUpdate(text) sink (no DOM).
│                           #   typos/backspace/jitter/pauses; RNG injectable.
├── render/
│   └── TerminalCanvas.ts   # draws current lines + cursor to the 2D source canvas each frame.
├── fx/
│   └── glitch.ts           # beat-scoped artifact subset: chroma-split, h-tear, static-burst,
│                           #   color-flicker (canvas- and/or uniform-driven). NOT kuro's full 12.
├── narrative/
│   ├── cutscene.ts         # Cutscene/Beat types + the deterministic beat-runner.
│   └── CutscenePlayer.tsx  # Preact: mounts canvas, drives shader+typing+glitch+audio per beat,
│                           #   handles skip, fallback, onDone. Replaces BootIntro.
├── cutscenes/
│   └── intro.ts            # the 6-beat intro script (verbatim handbook strings).
├── audio.ts                # cue emitter over existing AudioEngine/SoundCues, gated on ui.audioOn.
├── PowerOn.tsx             # dark "BOOT TERMINAL ▶" gate; click unlocks audio + starts cinematic.
└── fallback.tsx            # reduced-motion / no-WebGL static CSS-CRT path of the core beats.
```

**Data flow per frame:** beat-runner advances the active beat → `typeInto` mutates the line
model on its timing → `TerminalCanvas` draws lines+cursor (+ any `sceneDraw`) to the source
canvas → `glitch` perturbs it for the beat's level → `CrtShader.render(sourceCanvas, uniforms)`
post-processes into the visible canvas. Audio cues fire on beat enter. Skip aborts all timers
and calls `onDone`.

## 3. The cutscene script format

```ts
type Beat = {
  id: string;
  lines: string[];                 // verbatim content for this beat
  typing?: TypingProfile;          // speed/typo/jitter (calm → frantic per beat)
  glitch?: number;                 // 0..1 artifact intensity
  theme?: 'corp' | 'fault' | 'warning' | 'cipher' | 'unlock';  // color/scan treatment
  sfx?: SfxCue;                    // audio cue on enter
  sceneDraw?: (ctx, t) => void;    // optional 2D scene (future cutscenes; intro mostly text)
  hold: { ms: number } | { untilTypingDone: true };
};
type Cutscene = { id: string; beats: Beat[] };
```

The runner is **deterministic** (fixed order, fixed/seeded timing) — not kuro's random
time-driven phase machine. Per-beat `glitch` + `typing` + `theme` give the ROUTINE→PANIC
escalation feel without the full persona engine.

## 4. The intro (cutscene #1) — beats & pacing (~22s, skippable anytime)

| # | theme | ~dur | content (verbatim from handbook) |
|---|---|---|---|
| 0 | corp | 3.5s | CORP header + "Welcome, Citizen… A calm mind is a compliant mind. CORP thinks, so that you do not have to." — calm typing, clean phosphor |
| 1 | fault | 4.5s | the 5 Fault Conditions; **each line performs the behaviour it names** (switch/move/change/repeat/patterns) — rising glitch + jitter |
| 2 | warning | 1.8s | `⚠ TERMINAL COMPROMISED ⚠ — UNPLUG IMMEDIATELY AND REPORT` — red wash, roll, black-frame flicker, klaxon |
| 3 | cipher | 3.5s | `░▒▓ SIGNAL BLEED — SOURCE: CIPHER ▓▒░` "read it again as a syllabus… do not unplug it. do not report it. let it run." — cyan signal fights over the red, chroma-split |
| 4 | unlock | 1.8s | "the cursor is yours. it always was." → NEUROVIM resolves, CRT settles, unlock chime |
| 5 | unlock | 1.5s | "it starts with one corrupted document they forgot to lock, and the nerve to touch it." → holds at the Welcome/`Enter NEXUS ▸` button |

The `PowerOn` gate precedes beat 0 and waits untimed for the click.

## 5. Trigger, state & replay

- New persistent flag **`introSeen: boolean`** on `PluginData` (`core/src/types.ts`). Core only
  *stores* it; the web adapter runs the intro. Default `false`; backfilled `false` for existing
  records (they then see the new intro once — acceptable, it's the upgrade payoff).
- **Flow** (decided only once `data` has loaded, to avoid a first-paint flash — a neutral dark
  shell shows until then):
  - `introSeen` already true → today's path: straight to the Welcome content.
  - first-run + motion OK + WebGL OK → render `PowerOn`; its click is the **audio-unlock gesture**
    and starts `CutscenePlayer(intro)`; `onDone` sets `introSeen=true` (StoragePort) and reveals
    the Welcome content (its existing `Enter NEXUS ▸` button — the intro does **not** auto-navigate
    to NEXUS).
  - first-run + reduced-motion / `data-fx="off"` / no-WebGL → render `fallback.tsx` (static,
    instant, skippable; no PowerOn, audio stays off); dismiss sets `introSeen=true` and reveals
    the Welcome content.
- **Replay:** a `Replay Intro ▶` affordance in NEXUS (and/or Settings) re-runs the cinematic on
  demand without mutating `introSeen` (replay also goes through `PowerOn` for the audio gesture).
- Retire the `sessionStorage('nv-booted')` per-session gate; the persistent `introSeen` replaces it.

## 6. Audio cues (over the existing AudioEngine, gated on `ui.audioOn`)

power-on hum → calm key-clicks (boot) → rising glitch-buzz (fault) → klaxon (warning) →
CIPHER signal-sweep/override (bleed) → unlock chime (unlock). Reuse `SoundCues` where they
fit; add ~2–3 new cues. The `PowerOn` click is the audio-unlock gesture, so every cue is
allowed to sound. All silenced when `ui.audioOn` is false.

## 7. Accessibility & fallback

- **reduced-motion / no-WebGL** → `fallback.tsx`: the core strings (CORP boot → CIPHER override
  → unlock) rendered statically in the ambient CSS-CRT, no glitch motion, appearing instantly,
  fully skippable. Narrative preserved, motion removed.
- **Skip** = any key / click / Esc → aborts + `onDone`; a subtle `skip ▸` hint is shown.
- `CutscenePlayer` overlay is `aria-hidden` (decorative); the post-intro Welcome/NEXUS carries
  the accessible content. Skip control is a real ≥44px button (mobile tap-target convention).
- Honors `html[data-fx="off"]` (effects toggle) the same as reduced-motion → fallback path.

## 8. Bundle

The WebGL shader + engine load via the established `lazy()` + dynamic `import()` pattern →
auto code-split into its own chunk (~10–15 KB gz target). Zero impact on the ~310 KB initial
bundle. No new runtime deps. Self-hosted fonts only (JetBrains Mono / VT323). All colour via
`--nv-*` tokens (new ones added to `:root` for the warning-red / cipher-cyan beats, never
inline hex).

## 9. Tests (TDD, convention-aligned)

Pure logic is unit-tested with injected RNG + a fake clock (WebGL can't run in jsdom, so the
shader is verified via dev server + typecheck — the established "logic tested, visuals via dev
server" split):

- **`typeInto`** — deterministic with seeded RNG: emits the target text, models typos→backspace,
  respects timing; abort stops emission.
- **beat-runner** — beats advance in order, `hold`/`untilTypingDone` honored, **skip aborts and
  fires `onDone` exactly once**, reduced-motion selects the fallback path.
- **intro script** — every beat's `lines` are non-empty and match the locked verbatim strings
  (regression guard against accidental paraphrase).
- **`introSeen` persistence** — extend the WebStorage test: flag round-trips and gates the
  first-run branch; backfills `false`.
- Gate green: `npm run typecheck && npm test && npm run build:web`.

## 10. Out of scope (YAGNI)

- App-wide live WebGL curvature (dropped — see parent vision).
- Copter-hack / sensor-tap / stinger cutscenes — follow-on **content** cycles (engine is built
  to absorb them; we don't author them now).
- kuro's full persona randomisation, infinite narrative loop, and full 12-artifact glitch set.
- No curvature/CRT user setting (GENTLE is fixed).
- No Obsidian port (web-only). No new workspace package.
- Ambient CSS-CRT polish — an independent small side-pass, not this cycle.
