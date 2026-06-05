# Guidance Backbone (P2) — Design Spec

> **Date:** 2026-06-05 · **Status:** approved (brainstorm), pending implementation plan
> **Goal:** take a **Vim-naive** player by the hand without breaking the disguise that
> makes the learning invisible. Every atmospheric moment also **orients** — "what comes
> next and why it matters" — and all reference material is **one click away**, everywhere.
> The orientation speaks in the **CIPHER** voice (diegetic guidance), and it **fades
> adaptively** as the player levels up. This is **P2 of three** (P1 "reference at hand" is
> folded in here; **P3** = cinematic intro reframe + adbusting cutscenes — a later, separate
> cycle).

## North star

> Every atmospheric moment **orients at the same time** ("what's next & why is it relevant"),
> and everything important is **a few clicks away**. Hand-holding is delivered *in the voice
> of the world* (CIPHER), so it deepens immersion instead of breaking it. NeuroVim is a
> **Vim gym**: the coach is generous early and steps back as you get stronger.

## Decisions (locked during brainstorm)

| Question | Decision |
|---|---|
| Guidance voice | **Diegetic** — CIPHER carries orientation in-character (not tooltips) |
| Intrusiveness | **Adaptive / fading by level** — generous early, recedes by level; deepening always 1 tap away |
| In-mission surface | **CIPHER Comms-Rail** right of the editor: Objective · Why · Keys · ↳ Manual |
| Rail collapse | Tier 0 (L1–2) full · Tier 1 (L3–5) compact (keys inline) · Tier 2 (L6+) spine-only |
| User override | A **pin toggle** (force rail open / quiet) — adaptive default, user in control |
| First-run Vim primer | **Shown once** on first run (CIPHER voice, ≈25s), **skippable**, re-readable later |
| Reference surface | **One** "Reference" overlay, **two tabs** (Cheat-Sheet \| Manual), context-aware, 1 click from NEXUS / Briefing / Mission |
| Per-mission copy | **Hybrid** — derive structurally (skill-tag, keys, "leads to", debrief); author **one** CIPHER `why:` line per mission |
| Reveal corruption | **In scope.** Sandbox = precise (injected glitch lines); Mission = divergent-vs-solution lines (location, not the fix); opt-in + adaptive |
| Fade trigger | **Level-based** (per-skill mastery tracking deferred) |
| Obsidian UI | **Untouched** (web-first); only the pure core + content `why:` field are shared |

## Why this is achievable (existing machinery)

A lot of P2 is **surfacing dormant logic**, not inventing it:

- `packages/core/src/utils/hints.ts` — `getHintKeys(category, cheatsheet)` already returns the
  mission-relevant keys; **built but unused on web**.
- `packages/core/src/data/cipher-quotes.ts` — `getCipherQuote(category, event)` already speaks
  in CIPHER's voice by `category × event`, with a `universal` fallback. We **extend the event
  vocabulary**, not the mechanism.
- `packages/core/src/types.ts` — `HudMode = 'guide-onboard' | 'guide-idle' | 'mission'` already
  models guide modes (Obsidian uses them; web does not). `MissionFrontmatter` is the typed
  contract we extend with `why?`.
- `packages/core/src/utils/diff.ts` — `getDiff` already computes `first_divergent_line` /
  `lines_off`; we add a sibling that returns **all** divergent line indices for highlighting.
- `packages/core/src/engine/GlitchEngine.ts` — sandbox already tracks `AppliedGlitch.line_number`
  → precise, spoiler-free reveal for THE RAVEN.
- Reference content already exists: `packages/content/src/content/REF/REF-EN-Quick_Reference.md`
  (~360 lines, comprehensive) + the 13-category cheatsheet (`core/src/data/cheatsheet.ts`).
  Today the manual is buried in the Archive (2–3 clicks, static); we **re-surface** it.

## Architecture

The guidance **derivation** is pure logic → core (testable, platform-neutral). The single new
hand-authored input is one frontmatter line → content (SSOT). All **surfaces** are web-only.
Obsidian is untouched (it may consume the pure core later; no UI built).

```
content (+why:) ──► core GuidanceEngine (pure) ──► adapter-web surfaces (web-only UI)
                         ▲ cipher-quotes, hints, chapterNav, diff
```

### 1. Content — one authored line per mission (SSOT)

- Add an **optional** `why:` field to TRANSMISSION frontmatter
  (`packages/content/src/content/**/*-TRANSMISSION-*.md`): a single in-world CIPHER line on
  *why this skill matters* (e.g., M-01 → `why: "Modes are the spine of everything you'll touch."`).
- `packages/content/build.mjs` passes `why` (and the already-present `summary`) through into
  `src/generated/content.ts`. **Fallback:** when `why` is absent, the GuidanceEngine falls back
  to a `category`-level line from `cipher-quotes` — so the feature ships before all ~30 lines are
  authored, and authoring can land incrementally.
- The CI content-gate already enforces `generated/*` is in sync (`npm run build:content`).

### 2. Core — `GuidanceEngine` (new, pure, tested)

`packages/core/src/engine/GuidanceEngine.ts`:

```ts
export type VerbosityTier = 0 | 1 | 2;           // 0 full · 1 compact · 2 spine

export interface GuidanceModel {
  skillTag: string;        // short NEXUS/briefing label, derived from category (+summary)
  keys: Keybinding[];      // getHintKeys(category, cheatsheet)
  why: string;             // frontmatter.why ?? cipher-quotes(category,'guide_why')
  leadsTo: string | null;  // next mission's title + skillTag (from chapterNav), or null at arc end
  debrief: string;         // "you can now <summary> → next <leadsTo>" + cipher flourish
  tier: VerbosityTier;     // visibility for the current level (unless pinned)
}

export function verbosityTier(level: number): VerbosityTier;  // L1–2→0, L3–5→1, L6+→2
export function deriveGuidance(args: {
  mission: MissionFrontmatter & { summary?: string; why?: string };
  next: { mission_id: string; title: string; category: string } | null;
  cheatsheet: CheatsheetCategory[];
  level: number;
  pin?: 'open' | 'quiet' | null;   // user override (see §6)
}): GuidanceModel;
```

- `leadsTo`/`next` is computed from the existing sequence helpers
  (`packages/core/src/utils/chapterNav.ts` + `data/chapters.ts`).
- `skillTag` derives from `category` (a small `category → label` map, e.g. `navigation →
  "Navigation (hjkl)"`), refined by `summary` when present.
- No ports needed — pure data in/out, wired by the adapter.

### 3. Core — `cipher-quotes` guidance events (extend, not replace)

`packages/core/src/data/cipher-quotes.ts`:

- Extend `QuoteEvent` with `'guide_why' | 'guide_next' | 'debrief'`.
- Add per-`category` entries for these events (+ `universal` fallbacks), reusing the existing
  `getCipherQuote(category, event)` selection + fallback chain. These supply the **voice** for
  the derived debrief and the **fallback** `why` when a mission has no authored line.

### 4. Core — divergent-line helper for reveal (extend `diff.ts`)

`packages/core/src/utils/diff.ts`:

```ts
// All line indices where current ≠ solution (superset of getDiff.first_divergent_line).
export function getDivergentLines(current: string, solution: string): number[];
```

Pure, unit-tested. The mission "reveal corruption" highlights these line numbers (location to
look at), **never** the solution text. Sandbox reveal uses `AppliedGlitch.line_number` (already
exact). Spoiler note: the solution already ships client-side (needed for local diff-verify) — the
reveal exposes no information not already in the bundle; it just visualizes *where*, gated by
adaptive visibility + opt-in.

### 5. Web — surfaces (`adapter-web/src/ui/`, web-only)

All styled via `--nv-*` tokens in `styles.css`. The GuidanceEngine supplies the data; the UI
reacts to the player's level (and the pin override).

1. **`CommsRail.tsx` (new)** — a slim diegetic panel right of the CodeMirror editor in
   `MissionEditor.tsx`. Shows `Objective · Why · Keys · ↳ Manual` and a **↳ reveal corruption**
   action. Collapses by `tier`: Tier 0 full; Tier 1 spine **with the keys row inline**, Objective/
   Why behind one tap; Tier 2 spine-only (`◢`), everything on tap. Respects reduce-motion.
2. **`ReferenceOverlay.tsx` (new, replaces `CheatsheetOverlay.tsx`)** — one overlay, two tabs:
   **Cheat-Sheet** (the existing categorized view, current mission's `category` floated to top)
   and **Manual** (renders `REF-EN-Quick_Reference.md` via the existing lazy `marked`
   renderer). Opened in **1 click** from NEXUS, **Briefing** (new button), and **Mission**
   (the existing `⌨ Keys` button + the rail's `↳ Manual` deep-links into the relevant section).
3. **`BriefingView.tsx` (enhanced)** — the DIRECTIVE box gains **WHAT YOU'LL LEARN**
   (skillTag/skills), **WHY** (CIPHER `why`), **LEADS TO** (`leadsTo`), plus a Reference button
   (none today).
4. **`App.tsx` NEXUS (enhanced)** — explicit **START HERE** on the active mission (replacing the
   subtle `▸`), a per-mission **skill-tag**, a one-line **content-type legend** (M · KATA ·
   RAVEN · Archive), and a CIPHER **"next: … because …"** line on the active row. All subject to
   `verbosityTier` (dezent at high levels).
5. **`MissionResult.tsx` (enhanced)** — add a CIPHER **debrief** line ("you can now X → next Y")
   above the existing score/tier/unlock block; full at Tier 0, one line at Tier 1+.
6. **`WelcomeView.tsx` Vim primer (new)** — a first-run, skippable, CIPHER-voiced "What is Vim &
   why" primer (≈25s of typed beats; re-readable later via the Manual). Gated by a new persisted
   flag (see §7); independent of the P3 cinematic.

### 6. Adaptive visibility + pin override

- Default visibility = `verbosityTier(level)`.
- A **pin toggle** in the rail lets the player force `open` or `quiet`; persisted as a small
  preference. `deriveGuidance` honors `pin` over the level default.

### 7. Persistence (`PluginData`, `types.ts`)

- Add `vimPrimerSeen: boolean` (first-run primer gate) and `railPin: 'open' | 'quiet' | null`
  to `PluginData` + `DEFAULT_PLUGIN_DATA`. Both are additive and backward-safe (merged with
  defaults on load, same pattern as `onboarded`).

## Build sequence (for the plan — each step keeps the gate green, ships incrementally)

1. **Content** — `why:` frontmatter + `build.mjs` pass-through + `MissionFrontmatter.why?` /
   `summary?` typing. (Authoring of the ~30 lines can trail behind the fallback.)
2. **Core** — `GuidanceEngine` (`deriveGuidance`, `verbosityTier`) + `cipher-quotes` guidance
   events + `getDivergentLines` + unit tests.
3. **Web** — `ReferenceOverlay` (Cheat-Sheet \| Manual), reachable 1-click from NEXUS / Briefing /
   Mission.
4. **Web** — `CommsRail` in `MissionEditor` + adaptive wiring + pin toggle + **reveal corruption**.
5. **Web** — Briefing+ / NEXUS+ / Result debrief.
6. **Web** — Welcome Vim primer (first-run gate).

## Testing

- **Core (Jest, pure):** `GuidanceEngine.test.ts` — `verbosityTier` boundaries (2→0, 3→1, 6→2);
  `deriveGuidance` uses authored `why` when present and the `cipher-quotes` fallback when absent;
  `leadsTo` is the next mission and `null` at an arc's end; `skillTag`/`keys` track `category`.
  `cipher-quotes.test.ts` — new events resolve per category and fall back to `universal`.
  `diff.test.ts` — `getDivergentLines` returns the full divergent set (and `[]` on a match).
- **Content:** `build.mjs` carries `why`/`summary`; content tests assert the field round-trips;
  CI content-gate enforces `generated/*` sync.
- **adapter-web:** a small data-wiring test (fake-indexeddb, no UI render — matching the existing
  WebStorage / submit-flow tests) covering the primer/pin flags and the guidance data feeding a
  mission. UI itself stays verified via dev server + typecheck (house convention).
- **Gate green:** `npm run typecheck && npm test && npm run build:web` (+ `npm run build:content`
  for the content step). 182 existing + new core/content tests.

## Out of scope (YAGNI / boundaries)

- **P3** — cinematic intro reframe + adbusting "Citizen Manual" cutscenes (separate cycle). The
  Vim primer here is a plain first-run screen, **not** coupled to P3 so P2 doesn't wait on it.
- **Per-skill mastery tracking** for the fade — level-based is enough for now.
- **Obsidian UI** — no rail/primer/overlay there; it keeps its current UX (web-first posture).
- **Bespoke per-mission debrief/leads-to copy** — derived + cipher-flourished; only `why` is
  authored.
- **Scoring penalty for reveal/hints** — opt-in + adaptive is the only gate; no par penalty.
```
