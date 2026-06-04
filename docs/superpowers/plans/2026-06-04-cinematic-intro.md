# Cinematic Intro Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 3-line `BootIntro` with a ~16s first-run cinematic that dramatises the Compliance-Handbook story (CORP boot → Fault-Conditions glitch → UNPLUG warning → CIPHER override → unlock), built as cutscene #1 of a reusable, web-only Cinematic Engine.

**Architecture:** All code lives in `packages/adapter-web/src/cinematic/` (browser-specific; web-only — Obsidian is logic-parity only). The engine splits into **pure logic** (typing model + cutscene timeline — unit-tested in node-jest) and **impure rendering** (WebGL CRT shader + 2D terminal canvas + Preact rAF player — verified via typecheck + `build:web` + a manual dev-server checklist, because adapter-web jest is `testEnvironment: 'node'` with no WebGL/Canvas/DOM). The WebGL chunk is lazy-loaded after the power-on gesture so the initial bundle is untouched. A new persistent `introSeen` flag on `PluginData` gates first-run; a Replay button re-runs it on demand.

**Tech Stack:** Preact 10 (`preact/hooks`, `preact/compat` lazy/Suspense), raw WebGL (no Three.js), Web Audio via the existing `AudioEngine`/`SoundCues`, Vite code-splitting, ts-jest (node env), `--nv-*` CSS tokens.

**Spec:** `docs/superpowers/specs/2026-06-04-cinematic-intro-design.md`.

**Before you start:** create a feature branch (`git switch -c feat/cinematic-intro`). Gate after each task where noted: `npm run typecheck && npm test`. Visual tasks add `npm run build:web`.

---

## File structure (decomposition)

```
packages/core/src/types.ts                         # MODIFY: add introSeen to PluginData + DEFAULT_PLUGIN_DATA
packages/adapter-web/test/introSeen.test.ts         # NEW: persistence/default test (pure)
packages/adapter-web/test/typing.test.ts            # NEW: planTyping tests (pure)
packages/adapter-web/test/cutscene.test.ts          # NEW: timeline tests (pure)
packages/adapter-web/test/intro-script.test.ts      # NEW: intro verbatim-strings test (pure)
packages/adapter-web/src/cinematic/
├── rng.ts                                          # NEW: mulberry32 seeded RNG (pure)
├── typing.ts                                       # NEW: planTyping() typing model (pure)
├── cutscene.ts                                     # NEW: Beat/Cutscene types + buildTimeline/frameAt (pure)
├── theme.ts                                        # NEW: BeatTheme → colour (reads --nv-* tokens)
├── audio.ts                                        # NEW: playCue(cue, audio) → SoundCues (impure)
├── cutscenes/intro.ts                              # NEW: the 6-beat INTRO cutscene (verbatim strings)
├── crt/support.ts                                  # NEW: webglSupported() — LIGHT, statically imported
├── crt/shader.ts                                   # NEW: VERT + FRAG GLSL strings
├── crt/CrtShader.ts                                # NEW: WebGL post-process class (HEAVY, lazy)
├── render/TerminalCanvas.ts                        # NEW: draws a RenderFrame to a 2D canvas
├── narrative/CutscenePlayer.tsx                    # NEW: Preact rAF player (HEAVY, lazy)
├── PowerOn.tsx                                     # NEW: "BOOT TERMINAL ▶" gate
├── fallback.tsx                                    # NEW: static reduced-motion/no-WebGL path
└── CinematicIntro.tsx                              # NEW: orchestrator (power-on/cutscene vs fallback)
packages/adapter-web/src/ui/WelcomeView.tsx         # MODIFY: render CinematicIntro instead of BootIntro
packages/adapter-web/src/ui/App.tsx                 # MODIFY: introSeen wiring + replay + cue/unlock props
packages/adapter-web/src/ui/BootIntro.tsx           # DELETE (replaced)
packages/adapter-web/src/styles.css                 # MODIFY: --nv-cipher token + cinematic CSS
```

---

## Task 1: `introSeen` flag on PluginData

**Files:**
- Modify: `packages/core/src/types.ts:55-67` (interface) and `:145-157` (default)
- Test: `packages/adapter-web/test/introSeen.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/adapter-web/test/introSeen.test.ts`:

```ts
/**
 * introSeen is the first-run gate for the cinematic intro. It must default false,
 * survive a save/load round-trip, and default false when an OLD record (saved before
 * the field existed) is spread over DEFAULT_PLUGIN_DATA on load (the App's load pattern).
 */
import 'fake-indexeddb/auto';
import { DEFAULT_PLUGIN_DATA, type PluginData } from '@neurovim/core';
import { WebStorage } from '../src/ports/WebStorage';

describe('introSeen flag', () => {
  const storage = new WebStorage();

  it('defaults to false', () => {
    expect(DEFAULT_PLUGIN_DATA.introSeen).toBe(false);
  });

  it('defaults false when an old record (no introSeen) is merged over defaults', () => {
    const oldRecord = { total_xp: 99 } as Partial<PluginData>;
    const merged = { ...DEFAULT_PLUGIN_DATA, ...oldRecord };
    expect(merged.introSeen).toBe(false);
  });

  it('round-trips introSeen=true through storage', async () => {
    const next: PluginData = { ...DEFAULT_PLUGIN_DATA, introSeen: true };
    await storage.saveData(next, 'introseen-rt');
    const loaded = await storage.loadData<PluginData>('introseen-rt');
    expect(loaded?.introSeen).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test --workspace @neurovim/adapter-web -- introSeen`
Expected: FAIL — `Property 'introSeen' does not exist on type 'PluginData'` (ts-jest type error) / `expect(undefined).toBe(false)`.

- [ ] **Step 3: Add the field to the interface**

In `packages/core/src/types.ts`, inside the `PluginData` interface (after `onboarded: boolean;`), add:

```ts
  /** First-run cinematic intro has played once. Gates the intro; a Replay button ignores it. */
  introSeen: boolean;
```

- [ ] **Step 4: Add the default**

In `packages/core/src/types.ts`, inside `DEFAULT_PLUGIN_DATA` (after `onboarded: false,`), add:

```ts
  introSeen: false,
```

- [ ] **Step 5: Run test to verify it passes + full typecheck (catches other PluginData literals)**

Run: `npm test --workspace @neurovim/adapter-web -- introSeen && npm run typecheck`
Expected: PASS. If typecheck flags any object literal that builds a full `PluginData` without `introSeen` (e.g. in obsidian/tests), fix it by spreading `DEFAULT_PLUGIN_DATA` or adding `introSeen: false`.

- [ ] **Step 6: Commit**

```bash
git add packages/core/src/types.ts packages/adapter-web/test/introSeen.test.ts
git commit -m "feat(core): add introSeen flag to PluginData for cinematic first-run gate"
```

---

## Task 2: Seeded RNG + the typing model (`planTyping`)

**Files:**
- Create: `packages/adapter-web/src/cinematic/rng.ts`, `packages/adapter-web/src/cinematic/typing.ts`
- Test: `packages/adapter-web/test/typing.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/adapter-web/test/typing.test.ts`:

```ts
import { mulberry32 } from '../src/cinematic/rng';
import { planTyping, type TypingProfile } from '../src/cinematic/typing';

const CALM: TypingProfile = { cps: 25, typoChance: 0, jitter: 0.2 };
const SLOPPY: TypingProfile = { cps: 25, typoChance: 0.5, jitter: 0.3 };

describe('planTyping', () => {
  it('with no typos, emits one step per character, ending in the full text', () => {
    const steps = planTyping('hello', CALM, mulberry32(1));
    expect(steps).toHaveLength(5);
    expect(steps[steps.length - 1].text).toBe('hello');
  });

  it('produces strictly increasing timestamps', () => {
    const steps = planTyping('a calm line of text', CALM, mulberry32(7));
    for (let i = 1; i < steps.length; i++) {
      expect(steps[i].atMs).toBeGreaterThan(steps[i - 1].atMs);
    }
  });

  it('starts after startMs', () => {
    const steps = planTyping('x', CALM, mulberry32(1), 1000);
    expect(steps[0].atMs).toBeGreaterThan(1000);
  });

  it('with typos, the final text is still exactly the target', () => {
    const steps = planTyping('compliance', SLOPPY, mulberry32(3));
    expect(steps[steps.length - 1].text).toBe('compliance');
  });

  it('with typos, at least one step shortens the text (a backspace correction)', () => {
    const steps = planTyping('compliance terminal', SLOPPY, mulberry32(3));
    const hasBackspace = steps.some((s, i) => i > 0 && s.text.length < steps[i - 1].text.length);
    expect(hasBackspace).toBe(true);
  });

  it('is deterministic for a given seed', () => {
    const a = planTyping('signal bleed', SLOPPY, mulberry32(42));
    const b = planTyping('signal bleed', SLOPPY, mulberry32(42));
    expect(a).toEqual(b);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test --workspace @neurovim/adapter-web -- typing`
Expected: FAIL — cannot find module `../src/cinematic/rng`.

- [ ] **Step 3: Implement the seeded RNG**

Create `packages/adapter-web/src/cinematic/rng.ts`:

```ts
/** mulberry32 — tiny deterministic PRNG. Returns a function yielding floats in [0,1). */
export type Rng = () => number;

export function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```

- [ ] **Step 4: Implement the typing model**

Create `packages/adapter-web/src/cinematic/typing.ts`:

```ts
import type { Rng } from './rng';

export interface TypingProfile {
  /** base characters per second */
  cps: number;
  /** 0..1 probability of a typo+backspace before a visible char */
  typoChance: number;
  /** 0..1 timing variance applied to each char delay */
  jitter: number;
}

/** A single render step: the cumulative visible text at time `atMs` (absolute ms). */
export interface TypeStep { atMs: number; text: string; }

const TYPO_CHARS = 'etaoinshrdlu';

/**
 * Deterministically expand `text` into timed steps, occasionally injecting a wrong char
 * followed by a backspace correction. Pure: identical (text, profile, seed, startMs) →
 * identical steps. The final step's text is always exactly `text`.
 */
export function planTyping(text: string, profile: TypingProfile, rng: Rng, startMs = 0): TypeStep[] {
  const steps: TypeStep[] = [];
  const base = 1000 / Math.max(1, profile.cps);
  let t = startMs;
  let shown = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const jit = 1 + (rng() * 2 - 1) * profile.jitter;
    t += Math.max(8, base * jit);
    if (profile.typoChance > 0 && ch !== ' ' && ch !== '\n' && rng() < profile.typoChance) {
      const wrong = TYPO_CHARS[Math.floor(rng() * TYPO_CHARS.length)];
      shown = shown + wrong;
      steps.push({ atMs: t, text: shown });
      t += base * 1.2;                 // notice the mistake
      shown = shown.slice(0, -1);
      steps.push({ atMs: t, text: shown }); // backspace
      t += base * 0.8;                 // re-aim
    }
    shown = shown + ch;
    steps.push({ atMs: t, text: shown });
  }
  return steps;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test --workspace @neurovim/adapter-web -- typing`
Expected: PASS (6 tests).

- [ ] **Step 6: Commit**

```bash
git add packages/adapter-web/src/cinematic/rng.ts packages/adapter-web/src/cinematic/typing.ts packages/adapter-web/test/typing.test.ts
git commit -m "feat(cinematic): deterministic typing model (planTyping) + seeded rng"
```

---

## Task 3: Cutscene types + timeline (`buildTimeline` / `frameAt`)

**Files:**
- Create: `packages/adapter-web/src/cinematic/cutscene.ts`
- Test: `packages/adapter-web/test/cutscene.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/adapter-web/test/cutscene.test.ts`:

```ts
import { mulberry32 } from '../src/cinematic/rng';
import { buildTimeline, frameAt, type Cutscene } from '../src/cinematic/cutscene';

const CUT: Cutscene = {
  id: 'test',
  beats: [
    { id: 'a', lines: ['hello'], typing: { cps: 50, typoChance: 0, jitter: 0 }, glitch: 0.1, theme: 'corp', holdMs: 500 },
    { id: 'b', lines: ['world', 'two'], typing: { cps: 50, typoChance: 0, jitter: 0 }, glitch: 0.8, theme: 'warning', holdMs: 300 },
  ],
};

describe('buildTimeline / frameAt', () => {
  it('produces contiguous windows whose total equals totalMs', () => {
    const tl = buildTimeline(CUT, mulberry32(1));
    expect(tl.windows).toHaveLength(2);
    expect(tl.windows[0].startMs).toBe(0);
    expect(tl.windows[1].startMs).toBe(tl.windows[0].endMs);
    expect(tl.totalMs).toBe(tl.windows[1].endMs);
  });

  it('each window fully types its beat text', () => {
    const tl = buildTimeline(CUT, mulberry32(1));
    expect(tl.windows[0].plan[tl.windows[0].plan.length - 1].text).toBe('hello');
    expect(tl.windows[1].plan[tl.windows[1].plan.length - 1].text).toBe('world\ntwo');
  });

  it('frameAt(0) is beat 0, not done', () => {
    const tl = buildTimeline(CUT, mulberry32(1));
    const f = frameAt(tl, 0);
    expect(f.beatIndex).toBe(0);
    expect(f.theme).toBe('corp');
    expect(f.done).toBe(false);
  });

  it('frameAt past the end is done and on the last beat', () => {
    const tl = buildTimeline(CUT, mulberry32(1));
    const f = frameAt(tl, tl.totalMs + 100);
    expect(f.done).toBe(true);
    expect(f.beatIndex).toBe(1);
    expect(f.text).toBe('world\ntwo');
  });

  it('during the hold after typing, the full beat text is shown', () => {
    const tl = buildTimeline(CUT, mulberry32(1));
    const w0 = tl.windows[0];
    const holdT = w0.endMs - 10; // inside beat 0's hold
    const f = frameAt(tl, holdT);
    expect(f.beatIndex).toBe(0);
    expect(f.text).toBe('hello');
    expect(f.glitch).toBeCloseTo(0.1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test --workspace @neurovim/adapter-web -- cutscene`
Expected: FAIL — cannot find module `../src/cinematic/cutscene`.

- [ ] **Step 3: Implement cutscene types + timeline**

Create `packages/adapter-web/src/cinematic/cutscene.ts`:

```ts
import type { Rng } from './rng';
import { planTyping, type TypeStep, type TypingProfile } from './typing';

export type BeatTheme = 'corp' | 'fault' | 'warning' | 'cipher' | 'unlock';
export type SfxCue = 'boot' | 'glitch' | 'klaxon' | 'signal' | 'unlock';

export interface Beat {
  id: string;
  /** lines for this beat; joined with '\n' and typed as one block */
  lines: string[];
  typing: TypingProfile;
  /** 0..1 CRT glitch intensity for this beat */
  glitch: number;
  theme: BeatTheme;
  /** audio cue fired when this beat begins */
  sfx?: SfxCue;
  /** dwell time (ms) after typing completes, before the next beat */
  holdMs: number;
}

export interface Cutscene { id: string; beats: Beat[]; }

export interface BeatWindow {
  beat: Beat;
  startMs: number;
  endMs: number;
  plan: TypeStep[];
}

export interface Timeline { windows: BeatWindow[]; totalMs: number; }

export interface RenderFrame {
  beatIndex: number;
  text: string;
  glitch: number;
  theme: BeatTheme;
  done: boolean;
}

/** Expand a cutscene into absolute-timed windows. Deterministic for a given rng seed. */
export function buildTimeline(cutscene: Cutscene, rng: Rng): Timeline {
  const windows: BeatWindow[] = [];
  let cursor = 0;
  for (const beat of cutscene.beats) {
    const text = beat.lines.join('\n');
    const plan = planTyping(text, beat.typing, rng, cursor);
    const typeEnd = plan.length ? plan[plan.length - 1].atMs : cursor;
    const endMs = typeEnd + beat.holdMs;
    windows.push({ beat, startMs: cursor, endMs, plan });
    cursor = endMs;
  }
  return { windows, totalMs: cursor };
}

/** The render state at absolute time `tMs`. Clamps to the last beat when past the end. */
export function frameAt(timeline: Timeline, tMs: number): RenderFrame {
  const { windows, totalMs } = timeline;
  const done = tMs >= totalMs;
  let idx = windows.findIndex((w) => tMs >= w.startMs && tMs < w.endMs);
  if (idx < 0) idx = done ? windows.length - 1 : 0;
  const w = windows[idx];
  // last plan step whose atMs <= tMs (or full text if we're in the hold / past the end)
  let text = '';
  for (const step of w.plan) {
    if (step.atMs <= tMs) text = step.text;
    else break;
  }
  if (done || tMs >= (w.plan.length ? w.plan[w.plan.length - 1].atMs : w.startMs)) {
    text = w.beat.lines.join('\n');
  }
  return { beatIndex: idx, text, glitch: w.beat.glitch, theme: w.beat.theme, done };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test --workspace @neurovim/adapter-web -- cutscene`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add packages/adapter-web/src/cinematic/cutscene.ts packages/adapter-web/test/cutscene.test.ts
git commit -m "feat(cinematic): cutscene timeline model (buildTimeline/frameAt)"
```

---

## Task 4: The intro cutscene script (verbatim)

**Files:**
- Create: `packages/adapter-web/src/cinematic/cutscenes/intro.ts`
- Test: `packages/adapter-web/test/intro-script.test.ts`

- [ ] **Step 1: Write the failing test**

Create `packages/adapter-web/test/intro-script.test.ts`:

```ts
import { INTRO } from '../src/cinematic/cutscenes/intro';
import { buildTimeline } from '../src/cinematic/cutscene';
import { mulberry32 } from '../src/cinematic/rng';

describe('INTRO cutscene', () => {
  it('has the six locked beats in order', () => {
    expect(INTRO.beats.map((b) => b.theme)).toEqual([
      'corp', 'fault', 'warning', 'cipher', 'unlock', 'unlock',
    ]);
  });

  it('keeps the locked verbatim payload lines (regression guard against paraphrase)', () => {
    const all = INTRO.beats.flatMap((b) => b.lines).join('\n');
    expect(all).toContain('A calm mind is a compliant mind');
    expect(all).toContain('UNPLUG IMMEDIATELY AND REPORT');
    expect(all).toContain('read it again as a syllabus');
    expect(all).toContain('let it run.');
    expect(all).toContain('the cursor is yours. it always was.');
    expect(all).toContain('the nerve to touch it.');
  });

  it('every beat has at least one non-empty line', () => {
    for (const b of INTRO.beats) {
      expect(b.lines.join('').trim().length).toBeGreaterThan(0);
    }
  });

  it('runs in a sane cinematic window (8s..30s)', () => {
    const tl = buildTimeline(INTRO, mulberry32(1));
    expect(tl.totalMs).toBeGreaterThan(8000);
    expect(tl.totalMs).toBeLessThan(30000);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test --workspace @neurovim/adapter-web -- intro-script`
Expected: FAIL — cannot find module `../src/cinematic/cutscenes/intro`.

- [ ] **Step 3: Implement the intro script**

Create `packages/adapter-web/src/cinematic/cutscenes/intro.ts`:

```ts
import type { Cutscene } from '../cutscene';

/**
 * Cutscene #1 — the first-run intro. Strings are VERBATIM from
 * docs/lore/citizen-compliance-handbook.md. Do not paraphrase (see intro-script.test.ts).
 * Pacing tuned for ~16s; adjust holdMs/cps in the dev server, not here blindly.
 */
export const INTRO: Cutscene = {
  id: 'intro',
  beats: [
    {
      id: 'boot',
      theme: 'corp',
      sfx: 'boot',
      typing: { cps: 22, typoChance: 0, jitter: 0.15 },
      glitch: 0.04,
      holdMs: 700,
      lines: [
        'CORP // CENTRAL OFFICE OF REGULATED PRODUCTIVITY',
        'CITIZEN COMPLIANCE TERMINAL  ·  Rev 47.3  ·  MANDATORY',
        '',
        '> Welcome, Citizen. You have been issued a Terminal.',
        '> A calm mind is a compliant mind.',
        '> CORP thinks, so that you do not have to.',
      ],
    },
    {
      id: 'fault',
      theme: 'fault',
      sfx: 'glitch',
      typing: { cps: 30, typoChance: 0.06, jitter: 0.5 },
      glitch: 0.55,
      holdMs: 900,
      lines: [
        '> FAULT CONDITIONS — UNPLUG AND REPORT',
        '> it switches states ............ [door]',
        '> it moves on its own .......... w·o·r·d ▸ line ▸ ●',
        '> the text changes under your hands',
        '> a change repeats itself ... itself ... itself',
        '> it sees patterns ........ s/compliance//g',
      ],
    },
    {
      id: 'warning',
      theme: 'warning',
      sfx: 'klaxon',
      typing: { cps: 40, typoChance: 0.02, jitter: 0.3 },
      glitch: 0.8,
      holdMs: 700,
      lines: [
        '  ⚠  TERMINAL COMPROMISED  ⚠',
        '  >> UNPLUG IMMEDIATELY AND REPORT <<',
      ],
    },
    {
      id: 'cipher',
      theme: 'cipher',
      sfx: 'signal',
      typing: { cps: 26, typoChance: 0.03, jitter: 0.4 },
      glitch: 0.45,
      holdMs: 900,
      lines: [
        '░▒▓ SIGNAL BLEED — SOURCE: CIPHER ▓▒░',
        '',
        'you read the Fault Conditions as malfunctions.',
        'read it again as a syllabus.',
        'do not unplug it. do not report it. let it run.',
      ],
    },
    {
      id: 'unlock',
      theme: 'unlock',
      sfx: 'unlock',
      typing: { cps: 24, typoChance: 0, jitter: 0.2 },
      glitch: 0.1,
      holdMs: 700,
      lines: [
        '> the cursor is yours. it always was.',
        '',
        '  N E U R O V I M',
        '  guardian channel online',
      ],
    },
    {
      id: 'hook',
      theme: 'unlock',
      typing: { cps: 28, typoChance: 0, jitter: 0.2 },
      glitch: 0.05,
      holdMs: 1200,
      lines: [
        'it starts with one corrupted document they forgot to lock,',
        'and the nerve to touch it.',
      ],
    },
  ],
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test --workspace @neurovim/adapter-web -- intro-script`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add packages/adapter-web/src/cinematic/cutscenes/intro.ts packages/adapter-web/test/intro-script.test.ts
git commit -m "feat(cinematic): the 6-beat intro cutscene script (verbatim handbook)"
```

---

## Task 5: CSS — `--nv-cipher` token + cinematic styles

**Files:**
- Modify: `packages/adapter-web/src/styles.css` (`:root` tokens + new cinematic rules)

This task is CSS only (no unit test possible). Verify via `npm run build:web` + the dev-server checklist in Task 14.

- [ ] **Step 1: Add the CIPHER token**

In `packages/adapter-web/src/styles.css`, in the `:root` semantic-accents group (after `--nv-fail: #ff5b5b;`), add:

```css
  --nv-cipher: #46e8ff;         /* CIPHER signal-bleed cyan (cinematic only) */
```

- [ ] **Step 2: Add cinematic CSS at the end of the file**

Append to `packages/adapter-web/src/styles.css`:

```css
/* ============================================================
   CINEMATIC INTRO  (cutscene #1) — overlay above WelcomeView
   ============================================================ */
.nv-cine {
  position: fixed; inset: 0; z-index: 20;
  background: #000;
  display: flex; align-items: center; justify-content: center;
  transition: opacity .5s var(--nv-ease);
}
.nv-cine-out { opacity: 0; pointer-events: none; }
.nv-cine-canvas { width: 100%; height: 100%; display: block; }
.nv-cine-load { position: fixed; inset: 0; z-index: 20; background: #000; }

/* skip hint */
.nv-cine-skip {
  position: fixed; bottom: 18px; right: 18px; z-index: 21;
  font-family: var(--nv-mono); font-size: var(--nv-fs-sm);
  color: var(--nv-muted); background: transparent;
  border: 1px solid var(--nv-border); border-radius: 4px;
  padding: 8px 14px; min-height: 44px; cursor: pointer;
  opacity: .65; transition: opacity .2s var(--nv-ease);
}
.nv-cine-skip:hover { opacity: 1; color: var(--nv-accent); }

/* power-on gate */
.nv-poweron {
  position: fixed; inset: 0; z-index: 20; background: #000;
  display: flex; flex-direction: column; gap: var(--nv-s5);
  align-items: center; justify-content: center;
}
.nv-poweron-btn {
  font-family: var(--nv-display); font-size: 30px; letter-spacing: .06em;
  color: var(--nv-accent); background: transparent;
  border: 1px solid var(--nv-accent-dim); border-radius: 6px;
  padding: 18px 34px; min-height: 44px; cursor: pointer;
  text-shadow: 0 0 calc(10px * var(--nv-glow)) color-mix(in oklab, var(--nv-accent) 60%, transparent);
  animation: nv-pulse 2.6s ease-in-out infinite;
}
.nv-poweron-btn:hover { color: var(--nv-accent-hot); border-color: var(--nv-accent); }
.nv-poweron-sub { font-family: var(--nv-mono); font-size: var(--nv-fs-sm); color: var(--nv-muted); }
@keyframes nv-pulse { 0%, 100% { opacity: .85; } 50% { opacity: 1; } }

/* static fallback (reduced-motion / no-WebGL) */
.nv-cine-fallback {
  position: fixed; inset: 0; z-index: 20; background: var(--nv-bg);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: var(--nv-s4); padding: var(--nv-s6);
  font-family: var(--nv-mono); color: var(--nv-accent);
  text-shadow: 0 0 calc(6px * var(--nv-glow)) color-mix(in oklab, var(--nv-accent) 50%, transparent);
}
.nv-cine-fallback .nv-fb-line { font-size: var(--nv-fs-body); line-height: 1.8; text-align: center; max-width: 60ch; }
.nv-cine-fallback .nv-fb-cipher { color: var(--nv-cipher); }
.nv-cine-fallback .nv-fb-warn { color: var(--nv-fail); }

@media (prefers-reduced-motion: reduce) {
  .nv-poweron-btn { animation: none; }
  .nv-cine, .nv-cine-out { transition: none; }
}
```

- [ ] **Step 3: Verify the build is green**

Run: `npm run build:web`
Expected: build succeeds (CSS parses; no token errors).

- [ ] **Step 4: Commit**

```bash
git add packages/adapter-web/src/styles.css
git commit -m "feat(cinematic): --nv-cipher token + cinematic/power-on/fallback CSS"
```

---

## Task 6: WebGL — support probe, GLSL, and the CRT shader class

**Files:**
- Create: `packages/adapter-web/src/cinematic/crt/support.ts`, `crt/shader.ts`, `crt/CrtShader.ts`

No unit test (WebGL is absent in node-jest). Verify via `npm run typecheck` + `npm run build:web` + Task 14.

- [ ] **Step 1: Implement the light support probe**

Create `packages/adapter-web/src/cinematic/crt/support.ts`:

```ts
/** Cheap, dependency-free WebGL availability check. Statically importable (no GLSL pulled in). */
export function webglSupported(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}
```

- [ ] **Step 2: Implement the GLSL strings**

Create `packages/adapter-web/src/cinematic/crt/shader.ts`:

```ts
export const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }
`;

/** Ported from kuro-screensaver's CRT composite. GENTLE curvature (0.018) is fixed. */
export const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform vec2 resolution;
uniform float time;
uniform float glitch;          // 0..1 beat intensity
const float CURV = 0.018;
const float APERTURE = 0.35;

float hash(float n){ return fract(sin(n) * 43758.5453123); }

void main(){
  vec2 uv = vUv;
  // gentle barrel curvature
  vec2 cc = uv * 2.0 - 1.0;
  float aspect = resolution.x / resolution.y;
  cc.x *= aspect;
  vec2 warp = cc * (1.0 + CURV * dot(cc, cc));
  warp.x /= aspect;
  uv = warp * 0.5 + 0.5;
  // glitch-driven horizontal tear
  float row = floor(uv.y * resolution.y);
  uv.x += (hash(row + floor(time * 30.0)) - 0.5) * glitch * 0.04;
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) { gl_FragColor = vec4(0.0,0.0,0.0,1.0); return; }
  vec2 e = smoothstep(vec2(0.0), vec2(0.02), uv) * smoothstep(vec2(0.0), vec2(0.02), 1.0 - uv);
  float frame = e.x * e.y;
  // chroma split driven by glitch
  float ca = glitch * 0.004;
  vec3 col;
  col.r = texture2D(tDiffuse, uv + vec2(ca, 0.0)).r;
  col.g = texture2D(tDiffuse, uv).g;
  col.b = texture2D(tDiffuse, uv - vec2(ca, 0.0)).b;
  // halation bloom
  vec2 px = 1.0 / resolution;
  float g = 0.0;
  g += texture2D(tDiffuse, uv + vec2(1.5, 0.0) * px).g;
  g += texture2D(tDiffuse, uv - vec2(1.5, 0.0) * px).g;
  g += texture2D(tDiffuse, uv + vec2(0.0, 3.5) * px).g;
  g += texture2D(tDiffuse, uv - vec2(0.0, 3.5) * px).g;
  col += vec3(0.35, 1.0, 0.55) * max(g * 0.25 - 0.12, 0.0) * 0.8;
  // ntsc dot-crawl (scales with glitch)
  vec2 pos = uv * resolution;
  float cr = sin(pos.y * 1.7 + pos.x * 0.9 + time * 18.0) * (0.02 + glitch * 0.05);
  col.r += cr; col.b -= cr;
  // aperture-grille rgb mask
  float tx = fract(uv.x * resolution.x / 3.0);
  float mr = 0.5 + 0.5 * cos(6.2831853 * tx);
  float mg = 0.5 + 0.5 * cos(6.2831853 * tx - 2.0943951);
  float mb = 0.5 + 0.5 * cos(6.2831853 * tx + 2.0943951);
  col *= mix(vec3(1.0), vec3(mr, mg, mb), APERTURE) * (1.0 + APERTURE * 0.55);
  // scanlines (intensify with glitch)
  float sl = 0.5 + 0.5 * sin(uv.y * resolution.y * 3.14159);
  col *= 1.0 - (0.10 + glitch * 0.08) * (1.0 - sl);
  // rare black-frame flicker on heavy glitch
  col *= 1.0 - 0.6 * step(0.985, hash(floor(time * 20.0))) * glitch;
  col *= frame;
  gl_FragColor = vec4(col, 1.0);
}
`;
```

- [ ] **Step 3: Implement the CRT shader class**

Create `packages/adapter-web/src/cinematic/crt/CrtShader.ts`:

```ts
import { VERT, FRAG } from './shader';

/**
 * Minimal raw-WebGL post-process. Renders a source canvas (the terminal text) through the
 * CRT fragment shader into its own canvas. No Three.js. One fullscreen quad, one texture.
 */
export class CrtShader {
  private gl: WebGLRenderingContext;
  private prog: WebGLProgram;
  private tex: WebGLTexture;
  private u: Record<string, WebGLUniformLocation | null> = {};

  constructor(private canvas: HTMLCanvasElement) {
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) throw new Error('webgl unavailable');
    this.gl = gl;
    this.prog = this.link(VERT, FRAG);
    gl.useProgram(this.prog);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(this.prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    for (const name of ['resolution', 'time', 'glitch']) {
      this.u[name] = gl.getUniformLocation(this.prog, name);
    }

    this.tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  }

  private link(vsrc: string, fsrc: string): WebGLProgram {
    const gl = this.gl;
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        throw new Error('shader compile: ' + gl.getShaderInfoLog(s));
      }
      return s;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, compile(gl.VERTEX_SHADER, vsrc));
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fsrc));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      throw new Error('program link: ' + gl.getProgramInfoLog(p));
    }
    return p;
  }

  /** Match the drawing buffer to the canvas's CSS size × dpr (cap 2). Call on resize. */
  resize(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(this.canvas.clientWidth * dpr);
    const h = Math.round(this.canvas.clientHeight * dpr);
    if (w === 0 || h === 0) return;
    this.canvas.width = w;
    this.canvas.height = h;
    this.gl.viewport(0, 0, w, h);
    this.gl.uniform2f(this.u.resolution, w, h);
  }

  /** Upload `source` as the texture and draw one CRT-shaded frame. */
  render(source: HTMLCanvasElement, opts: { timeMs: number; glitch: number }): void {
    const gl = this.gl;
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    gl.uniform1f(this.u.time, opts.timeMs / 1000);
    gl.uniform1f(this.u.glitch, opts.glitch);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  dispose(): void {
    const ext = this.gl.getExtension('WEBGL_lose_context');
    ext?.loseContext();
  }
}
```

- [ ] **Step 4: Verify typecheck + build**

Run: `npm run typecheck && npm run build:web`
Expected: green. (The shader code is reachable only via the lazy player added later; building now confirms it compiles.)

- [ ] **Step 5: Commit**

```bash
git add packages/adapter-web/src/cinematic/crt/
git commit -m "feat(cinematic): raw-WebGL CRT shader (gentle curvature, glitch uniform) + support probe"
```

---

## Task 7: Terminal canvas renderer + theme colours

**Files:**
- Create: `packages/adapter-web/src/cinematic/theme.ts`, `packages/adapter-web/src/cinematic/render/TerminalCanvas.ts`

No unit test (Canvas 2D is absent in node-jest). Verify via typecheck + build + Task 14.

- [ ] **Step 1: Implement theme colours (token-faithful)**

Create `packages/adapter-web/src/cinematic/theme.ts`:

```ts
import type { BeatTheme } from './cutscene';

/** Which --nv-* token drives each beat's text colour. */
const TOKEN: Record<BeatTheme, string> = {
  corp: '--nv-accent',
  fault: '--nv-amber',
  warning: '--nv-fail',
  cipher: '--nv-cipher',
  unlock: '--nv-accent-hot',
};

/** Fallback hexes (node/SSR or missing token) — mirror styles.css :root. */
const FALLBACK: Record<BeatTheme, string> = {
  corp: '#39ff7a',
  fault: '#ffb02e',
  warning: '#ff5b5b',
  cipher: '#46e8ff',
  unlock: '#9dffc2',
};

/** Resolve a beat theme to a concrete colour, reading the CSS token when available. */
export function themeColor(theme: BeatTheme): string {
  if (typeof document === 'undefined') return FALLBACK[theme];
  const v = getComputedStyle(document.documentElement).getPropertyValue(TOKEN[theme]).trim();
  return v || FALLBACK[theme];
}
```

- [ ] **Step 2: Implement the terminal canvas renderer**

Create `packages/adapter-web/src/cinematic/render/TerminalCanvas.ts`:

```ts
import type { RenderFrame } from '../cutscene';
import { themeColor } from '../theme';

/** Draws a RenderFrame (themed, glowing monospace text + cursor) onto a 2D source canvas. */
export class TerminalCanvas {
  private ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2d context unavailable');
    this.ctx = ctx;
  }

  resize(w: number, h: number): void {
    this.canvas.width = w;
    this.canvas.height = h;
  }

  /** `timeMs` drives the cursor blink. */
  draw(frame: RenderFrame, timeMs: number): void {
    const { ctx, canvas } = this;
    const { width: w, height: h } = canvas;
    ctx.fillStyle = '#040d07';
    ctx.fillRect(0, 0, w, h);

    const color = themeColor(frame.theme);
    const fs = Math.max(12, Math.round(w * 0.022));
    ctx.font = `${fs}px "JetBrains Mono", ui-monospace, monospace`;
    ctx.textBaseline = 'top';
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = fs * 0.55;

    const padX = Math.round(w * 0.08);
    const padY = Math.round(h * 0.14);
    const lh = Math.round(fs * 1.6);
    const lines = frame.text.split('\n');
    lines.forEach((line, i) => ctx.fillText(line, padX, padY + i * lh));

    // blinking block cursor after the last line (only while not done)
    if (!frame.done && Math.floor(timeMs / 530) % 2 === 0) {
      const last = lines[lines.length - 1] ?? '';
      const cx = padX + ctx.measureText(last).width + 2;
      const cy = padY + (lines.length - 1) * lh;
      ctx.fillRect(cx, cy, fs * 0.55, fs);
    }
  }
}
```

- [ ] **Step 3: Verify typecheck + build**

Run: `npm run typecheck && npm run build:web`
Expected: green.

- [ ] **Step 4: Commit**

```bash
git add packages/adapter-web/src/cinematic/theme.ts packages/adapter-web/src/cinematic/render/
git commit -m "feat(cinematic): themed terminal canvas renderer + token-faithful theme colours"
```

---

## Task 8: Audio cue mapping

**Files:**
- Create: `packages/adapter-web/src/cinematic/audio.ts`

- [ ] **Step 1: Implement the cue mapper**

Create `packages/adapter-web/src/cinematic/audio.ts`:

```ts
import { AudioEngine, SoundCues } from '@neurovim/core';
import type { SfxCue } from './cutscene';

/**
 * Map a cinematic beat cue to the closest existing SoundCue. Caller gates on ui.audioOn
 * and must have unlocked audio (PowerOn gesture). Synchronous; safe if audio isn't ready
 * (SoundCues guard against an uninitialised engine).
 */
export function playCue(cue: SfxCue, audio: AudioEngine): void {
  switch (cue) {
    case 'boot': SoundCues.drillToggle(audio); break;       // mechanical key-thud
    case 'glitch': SoundCues.glitchFeedback(audio); break;  // clinical CORP intrusion sine
    case 'klaxon': SoundCues.lockMessage(audio); break;     // pure 150Hz denial tone
    case 'signal': SoundCues.vimModeVisual(audio); break;   // ascending acquisition sweep
    case 'unlock': SoundCues.missionComplete(audio); break; // warm resistance bell
  }
}
```

- [ ] **Step 2: Verify typecheck**

Run: `npm run typecheck`
Expected: green (imports resolve against `@neurovim/core`).

- [ ] **Step 3: Commit**

```bash
git add packages/adapter-web/src/cinematic/audio.ts
git commit -m "feat(cinematic): map beat sfx cues to existing SoundCues"
```

---

## Task 9: The cutscene player (Preact rAF)

**Files:**
- Create: `packages/adapter-web/src/cinematic/narrative/CutscenePlayer.tsx`

No unit test (rAF + WebGL + Canvas). Verify via typecheck + build + Task 14.

- [ ] **Step 1: Implement the player**

Create `packages/adapter-web/src/cinematic/narrative/CutscenePlayer.tsx`:

```tsx
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

  useEffect(() => {
    const glCanvas = glRef.current;
    if (!glCanvas) return;

    const source = document.createElement('canvas');
    let crt: CrtShader;
    try {
      crt = new CrtShader(glCanvas);
    } catch {
      // WebGL died between probe and mount — bail straight to done.
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
    window.addEventListener('keydown', onKey);
    glCanvas.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', sync);
      window.removeEventListener('keydown', onKey);
      glCanvas.removeEventListener('click', onClick);
      crt.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div class={`nv-cine${out ? ' nv-cine-out' : ''}`} aria-hidden="true">
      <canvas ref={glRef} class="nv-cine-canvas" />
      <button class="nv-cine-skip" onClick={() => { if (!doneRef.current) { doneRef.current = true; setOut(true); window.setTimeout(onDone, 500); } }}>
        skip ▸
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Verify typecheck + build**

Run: `npm run typecheck && npm run build:web`
Expected: green. Confirm Vite reports a **separate chunk** for the cinematic player (it is lazy-imported in Task 11) — note its size for the bundle log.

- [ ] **Step 3: Commit**

```bash
git add packages/adapter-web/src/cinematic/narrative/
git commit -m "feat(cinematic): CutscenePlayer — rAF loop wiring timeline+typing+CRT+audio+skip"
```

---

## Task 10: Power-on gate + static fallback

**Files:**
- Create: `packages/adapter-web/src/cinematic/PowerOn.tsx`, `packages/adapter-web/src/cinematic/fallback.tsx`

- [ ] **Step 1: Implement the power-on gate**

Create `packages/adapter-web/src/cinematic/PowerOn.tsx`:

```tsx
interface Props { onPowerOn: () => void; }

/** Dark CORP terminal; the click is the audio-unlock gesture that starts the cinematic. */
export function PowerOn({ onPowerOn }: Props) {
  return (
    <div class="nv-poweron" aria-hidden="true">
      <button class="nv-poweron-btn" onClick={onPowerOn}>BOOT TERMINAL ▶</button>
      <div class="nv-poweron-sub">CORP // secure terminal · press to power on</div>
    </div>
  );
}
```

- [ ] **Step 2: Implement the static fallback**

Create `packages/adapter-web/src/cinematic/fallback.tsx`:

```tsx
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
```

- [ ] **Step 3: Verify typecheck + build**

Run: `npm run typecheck && npm run build:web`
Expected: green.

- [ ] **Step 4: Commit**

```bash
git add packages/adapter-web/src/cinematic/PowerOn.tsx packages/adapter-web/src/cinematic/fallback.tsx
git commit -m "feat(cinematic): power-on gate + static reduced-motion fallback"
```

---

## Task 11: The orchestrator (`CinematicIntro`)

**Files:**
- Create: `packages/adapter-web/src/cinematic/CinematicIntro.tsx`

No unit test. Verify via typecheck + build + Task 14.

- [ ] **Step 1: Implement the orchestrator**

Create `packages/adapter-web/src/cinematic/CinematicIntro.tsx`:

```tsx
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
  onUnlockAudio: () => void;
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
    return <PowerOn onPowerOn={() => { onUnlockAudio(); setPowered(true); }} />;
  }
  return (
    <Suspense fallback={<div class="nv-cine-load" />}>
      <CutscenePlayer cutscene={INTRO} playCue={playCue} onDone={onDone} />
    </Suspense>
  );
}
```

- [ ] **Step 2: Verify typecheck + build (confirm the lazy split)**

Run: `npm run typecheck && npm run build:web`
Expected: green; Vite emits the `CutscenePlayer` (+ `CrtShader`) in its own chunk separate from the welcome chunk.

- [ ] **Step 3: Commit**

```bash
git add packages/adapter-web/src/cinematic/CinematicIntro.tsx
git commit -m "feat(cinematic): CinematicIntro orchestrator (lazy cutscene vs static fallback)"
```

---

## Task 12: Wire into WelcomeView (replace BootIntro)

**Files:**
- Modify: `packages/adapter-web/src/ui/WelcomeView.tsx`

No unit test. Verify via typecheck + build + Task 14.

- [ ] **Step 1: Replace the file contents**

Replace the entirety of `packages/adapter-web/src/ui/WelcomeView.tsx` with:

```tsx
/**
 * WelcomeView — landing page at app start (before the NEXUS picker).
 * Renders the welcome intro (from @neurovim/content) as Markdown.
 * On true first run, overlays the cinematic intro (cutscene #1). Button: Enter NEXUS → picker.
 */
import { useState } from 'preact/hooks';
import { getWelcome } from '@neurovim/content';
import { renderMarkdown } from './markdown';
import { CinematicIntro } from '../cinematic/CinematicIntro';
import type { SfxCue } from '../cinematic/cutscene';

interface Props {
  onEnter: () => void;
  /** false → play the cinematic once; true → skip straight to the welcome content */
  introSeen: boolean;
  /** persist introSeen=true after the cinematic finishes */
  onIntroDone: () => void;
  onUnlockAudio: () => void;
  playCue: (cue: SfxCue) => void;
}

export function WelcomeView({ onEnter, introSeen, onIntroDone, onUnlockAudio, playCue }: Props) {
  const html = renderMarkdown(getWelcome());
  const [playing, setPlaying] = useState(!introSeen);

  function finishIntro() {
    onIntroDone();
    setPlaying(false);
  }

  return (
    <div class="nv-doc nv-welcome nv-crt nv-hud-frame">
      <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />
      {playing && (
        <CinematicIntro playCue={playCue} onUnlockAudio={onUnlockAudio} onDone={finishIntro} />
      )}
      <article class="nv-md" dangerouslySetInnerHTML={{ __html: html }} />
      <div class="nv-doc-foot">
        <button class="nv-modal-primary nv-welcome-enter" onClick={onEnter}>Enter NEXUS →</button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify typecheck (will fail at the App call site — expected, fixed in Task 13)**

Run: `npm run typecheck`
Expected: FAIL only at `App.tsx` (`WelcomeView` now requires new props). That is the next task. Do NOT commit yet — commit together with Task 13 so the tree never has a broken typecheck mid-commit.

---

## Task 13: Wire into App + Replay + remove BootIntro

**Files:**
- Modify: `packages/adapter-web/src/ui/App.tsx`
- Delete: `packages/adapter-web/src/ui/BootIntro.tsx`

No unit test for the wiring (Preact UI). The `introSeen` persistence is already covered by Task 1. Verify via typecheck + test + build + Task 14.

- [ ] **Step 1: Add cinematic imports**

In `packages/adapter-web/src/ui/App.tsx`, after the existing `import { ControlCluster, AudioHint } from './Chrome';` line, add:

```tsx
import { playCue as playSfxCue } from '../cinematic/audio';
import type { SfxCue } from '../cinematic/cutscene';
import { CinematicIntro } from '../cinematic/CinematicIntro';
```

- [ ] **Step 2: Add `markIntroSeen` (mirror `markOnboarded`)**

In `App.tsx`, immediately after the `markOnboarded` function (around line 97-102), add:

```tsx
  async function markIntroSeen() {
    if (data.introSeen) return;
    const next = { ...data, introSeen: true };
    setData(next);
    await storage.saveData(next);
  }

  /** Fire a cinematic cue, gated on the audio toggle. */
  function introCue(cue: SfxCue) {
    if (ui.audioOn) playSfxCue(cue, audio);
  }
```

- [ ] **Step 3: Add the replay state**

In `App.tsx`, alongside the other `useState` declarations (after `const [justUnlocked, setJustUnlocked] = useState<string[]>([]);`), add:

```tsx
  const [replayIntro, setReplayIntro] = useState(false);
```

- [ ] **Step 4: Pass the new props to WelcomeView**

In `App.tsx`, replace the welcome branch (currently lines 153-159):

```tsx
  if (view === 'welcome') {
    return (
      <Suspense fallback={<div class="nv-loading">loading…</div>}>
        <WelcomeView onEnter={() => { unlockAudio(); setView('nexus'); }} />
      </Suspense>
    );
  }
```

with:

```tsx
  if (view === 'welcome') {
    return (
      <Suspense fallback={<div class="nv-loading">loading…</div>}>
        <WelcomeView
          onEnter={() => { unlockAudio(); setView('nexus'); }}
          introSeen={data.introSeen}
          onIntroDone={markIntroSeen}
          onUnlockAudio={unlockAudio}
          playCue={introCue}
        />
      </Suspense>
    );
  }
```

- [ ] **Step 5: Add a Replay overlay + button on NEXUS**

In `App.tsx`, find the NEXUS container open tag (line 271):

```tsx
    <div class="nv-app nv-nexus nv-crt nv-hud-frame" onPointerDown={unlockAudio}>
```

Immediately **after** that opening tag, add the replay overlay:

```tsx
      {replayIntro && (
        <CinematicIntro
          playCue={introCue}
          onUnlockAudio={unlockAudio}
          onDone={() => setReplayIntro(false)}
        />
      )}
```

Then add a Replay button next to the existing controls. Find the `<ControlCluster ... />` usage in the NEXUS render and add this button immediately before or after it (it lives in the same control row):

```tsx
      <button
        class="nv-ctl"
        title="Replay the intro cinematic"
        onClick={() => { unlockAudio(); setReplayIntro(true); }}
      >
        ⟳ intro
      </button>
```

(If `ControlCluster` encapsulates the control row and exposes no slot, instead place the button inside the NEXUS header control area next to the audio/effects toggles — match the surrounding `nv-ctl` buttons.)

- [ ] **Step 6: Delete BootIntro**

```bash
git rm packages/adapter-web/src/ui/BootIntro.tsx
```

- [ ] **Step 7: Verify the full gate**

Run: `npm run typecheck && npm test && npm run build:web`
Expected: typecheck green, all tests pass (incl. Tasks 1-4 suites), web build succeeds with a separate cinematic chunk. If typecheck flags an unused import or a missing prop, fix it.

- [ ] **Step 8: Commit (Tasks 12 + 13 together)**

```bash
git add packages/adapter-web/src/ui/WelcomeView.tsx packages/adapter-web/src/ui/App.tsx
git commit -m "feat(cinematic): wire CinematicIntro into Welcome/App, first-run gate + replay, drop BootIntro"
```

---

## Task 14: Manual dev-server verification + bundle check

The shader/canvas/player can't be unit-tested (node-jest has no WebGL/Canvas). Verify behaviour by hand in the dev server. This task has no code; it is a required checklist.

- [ ] **Step 1: Reset first-run state and launch**

In the browser devtools console (after `npm run dev` → http://localhost:5173/), clear persisted state so the intro re-triggers:
```js
indexedDB.deleteDatabase('neurovim'); location.reload();
```
(Use the actual DB name if different — check `WebStorage.ts`.)

- [ ] **Step 2: Walk the checklist**

Run: `npm run dev`, then verify:
- [ ] A dark **BOOT TERMINAL ▶** screen appears first (no audio yet).
- [ ] Clicking it unlocks audio and starts the cinematic; the CRT bulge is **gentle** (not fishbowl).
- [ ] Beats play in order: CORP green boot → amber Fault glitch → red UNPLUG warning → cyan CIPHER override → unlock → hook line, ~16s total.
- [ ] Audio cues fire per beat (with the audio toggle ON); silent with it OFF.
- [ ] **skip ▸** (and any key / Esc / click) ends the cinematic and reveals the Welcome content with **Enter NEXUS →**.
- [ ] After completing/skipping once, a reload does **not** replay it (introSeen persisted).
- [ ] The **⟳ intro** button on NEXUS replays it on demand (and does not un-set introSeen).
- [ ] Toggle "reduce effects" (data-fx=off) OR set OS reduced-motion, reset DB, reload → the **static fallback** shows (no motion, no power-on), skippable, and sets introSeen.
- [ ] In a browser/profile without WebGL (or temporarily make `webglSupported()` return false) → fallback path, no crash.
- [ ] Mobile width (≤560px): the skip button is a ≥44px tap target.

- [ ] **Step 3: Bundle budget check**

Run: `npm run build:web`
Expected: the initial bundle stays ~310 KB (the cinematic player + CrtShader land in their own lazy chunk). Note the chunk size in the commit message if it's meaningfully large.

- [ ] **Step 4: Final gate + (optional) doc sync**

Run: `npm run typecheck && npm test && npm run build:web`
Expected: all green (test count rises by the 4 new pure suites: introSeen, typing, cutscene, intro-script).

Optionally update `AGENTS.md`/`README.md` status lines if you sync docs at release time (per the repo's release habit — not required to land the feature).

- [ ] **Step 5: Commit any fixes found during verification**

```bash
git add -A
git commit -m "fix(cinematic): dev-server verification adjustments (pacing/skip/fallback)"
```

---

## Self-review notes (author)

- **Spec coverage:** §1 placement → Task structure (all under `cinematic/`). §2 modules → Tasks 2,3,6,7,8,9,10. §3 script format → Task 3. §4 beats/pacing → Task 4 (+ Task 14 timing check). §5 trigger/state/replay → Tasks 1,12,13. §6 audio → Tasks 8,9,13 (gesture+gate). §7 a11y/fallback → Tasks 5,10,11,14. §8 bundle → Tasks 11,14. §9 tests → Tasks 1-4 (pure) + 14 (manual). §10 out-of-scope respected (no app-wide WebGL, no setting, no Obsidian, no new package).
- **Type consistency:** `TypingProfile`/`TypeStep` (typing.ts) used by `Beat`/`buildTimeline` (cutscene.ts); `RenderFrame` consumed by `TerminalCanvas`; `SfxCue` shared by cutscene.ts → audio.ts → CutscenePlayer → CinematicIntro → WelcomeView → App; `themeColor(BeatTheme)`; `CrtShader.render(source,{timeMs,glitch})` matches the player call.
- **No placeholders:** every code step is complete. The only non-code step is the Task 14 manual checklist (justified — WebGL is untestable in node-jest, matching the repo's existing convention).
