# Par-Tiers — Design Spec

> **Date:** 2026-06-03 · **Status:** approved (brainstorm), pending implementation plan
> **Goal:** turn one-and-done missions into mastery challenges by scoring each run
> against a keystroke "par" and awarding a gold/silver/bronze tier — using the metrics
> NeuroVim already tracks. Highest replayability-per-effort lever from the 2026-06-03
> next-steps audit.

## Decisions (locked during brainstorm)

| Question | Decision |
|---|---|
| What does a tier measure? | **Keystrokes** (Vim efficiency; strongest skill signal, no time pressure) |
| Where do par values come from? | **Hybrid** — a computed default, overridable per mission via frontmatter |
| Computed-default formula | **Difficulty-scaled, deliberately generous** (not diff-size — that overrates regex missions) |
| Where do tiers surface? | Result-modal badge · NEXUS list chip · "almost there" nudge |
| Adapter scope | **Web-first UI, shared core logic** (per the documented Obsidian web-first posture) |

## Architecture

### Core — new pure module `packages/core/src/engine/ParTier.ts`

No ports, no DOM, no `obsidian` — pure functions, unit-tested. Exported via the core barrel.

```ts
export type Tier = 'gold' | 'silver' | 'bronze' | null; // null = completed, no tier

// Threshold multipliers off par (gold is the par itself). Named + tunable.
export const SILVER_FACTOR = 1.5;
export const BRONZE_FACTOR = 2.5;

// Deliberately generous, difficulty-scaled baseline. Initial values — tune after
// playtesting against the web keystroke counter. difficulty 0/undefined → FALLBACK.
export const PAR_BASE = 20;
export const PAR_PER_DIFFICULTY = 20;
export const FALLBACK_DIFFICULTY = 3;

export function defaultParKeystrokes(difficulty: number | null | undefined): number {
  const d = difficulty && difficulty > 0 ? difficulty : FALLBACK_DIFFICULTY;
  return PAR_BASE + d * PAR_PER_DIFFICULTY; // e.g. diff 2 → 60, diff 5 → 120
}

export function resolvePar(input: { parOverride?: number | null; difficulty?: number | null }): number {
  return input.parOverride && input.parOverride > 0
    ? input.parOverride
    : defaultParKeystrokes(input.difficulty);
}

export function tierFor(keystrokes: number, par: number): Tier {
  if (keystrokes <= 0 || par <= 0) return null;
  if (keystrokes <= par) return 'gold';
  if (keystrokes <= par * SILVER_FACTOR) return 'silver';
  if (keystrokes <= par * BRONZE_FACTOR) return 'bronze';
  return null;
}

// For the "almost there" nudge: the next better tier and how many keystrokes away.
// null when already gold (nothing better) or when no tier yet (too far).
export function keystrokesToNextTier(
  keystrokes: number,
  par: number,
): { nextTier: Exclude<Tier, null>; delta: number } | null;
```

`keystrokesToNextTier` semantics: returns the threshold immediately better than the
current tier and `delta = keystrokes - threshold` (the count to shave off). If current
tier is gold → `null`. If currently below bronze (no tier) → target `bronze`.

### Content schema

- `MissionFrontmatter` (`packages/core/src/types.ts`): add `par_keystrokes?: number` and
  `difficulty?: number`. `difficulty` already exists in the `.md` frontmatter but is
  currently dropped before reaching the app.
- `MissionSummary` (`toSummary` in `packages/content/src/index.ts`): add
  `par_keystrokes: number | null` and `difficulty: number | null`, read from
  `fm.par_keystrokes` / `fm.difficulty`. These flow through `getMission` and
  `listMissions` automatically (both go through `toSummary`).
- **No content rebuild expected:** values live in the raw frontmatter already captured
  in `generated/content.ts`. **Plan must verify** `build.mjs` does not strip `difficulty`
  from the stored frontmatter; if it does, include `difficulty` in the manifest.
- No `.md` edits in this feature — `par_keystrokes` overrides are authored later.

### Web data flow & surfacing (adapter-web only)

- `submit()` (`packages/adapter-web/src/ui/App.tsx`): compute
  `par = resolvePar({ parOverride: mission.par_keystrokes, difficulty: mission.difficulty })`,
  the run tier `tierFor(metrics.keystrokes, par)`, and `keystrokesToNextTier(...)`.
  Extend `MissionResultData` with `tier?: Tier`, `parKeystrokes?: number`,
  `toNextTier?: { nextTier, delta } | null`.
- **Result modal** (`MissionResult.tsx`): render a tier badge (gold/silver/bronze pill).
  When not gold, render the nudge ("N keystrokes from gold ⭐").
- **NEXUS list** (`App.tsx` mission rows): best tier per completed mission, computed from
  `data.missions[id]?.best_keystrokes` vs `resolvePar(missionSummary)` — **no new
  persisted state**. Small chip per completed row.
- All styling via `--nv-*` tokens in `styles.css` (no inline hex). Tier colors reuse the
  palette (gold/amber, silver/grey-green, bronze) as additive `:root` tokens.

## Testing

- Core `ParTier.test.ts`: `defaultParKeystrokes` monotonic in difficulty + fallback for
  0/undefined; `resolvePar` prefers a positive override; `tierFor` exact boundaries
  (`= par` → gold, `= par*1.5` → silver, `= par*2.5` → bronze, just above → null, and
  `keystrokes <= 0` → null); `keystrokesToNextTier` (gold → null, silver→gold delta,
  no-tier → bronze target). ~8 tests.
- Gate stays green (160 → ~168). No adapter-web UI test (consistent with the existing
  UI-test boundary); core covers the logic.

## Adapter scope & the keystroke-parity note

The tier **logic** lives in core and is adapter-agnostic. The **UI** ships web-first per
the documented Obsidian posture (`AGENTS.md`: logic-parity, not visual-parity). This
deliberately keeps the Obsidian↔CM6 keystroke-counting difference (Obsidian counts via a
`document` keydown listener; web counts via the CM6 metrics tracker) out of scope for now:
par values are tuned against the **web** counter (the primary public target). When/if
Obsidian adopts the tier UI, counting alignment is revisited then — a few-line follow-on.

## Out of scope (YAGNI)

- No `.md` `par_keystrokes` overrides authored in this feature.
- No Obsidian tier UI.
- No achievement/streak coupling, no new persisted tier state.
- Threshold/par constants are initial values; playtest-tuning is later content work.
