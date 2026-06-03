# Story-Mode — Design Spec

> **Date:** 2026-06-03 · **Status:** approved (brainstorm), pending implementation plan
> **Goal:** turn the web from an "all-unlocked" demo into a real **Story-Mode** where
> missions, KATAs, and LOOT unlock progressively as the player levels up — using the
> XP→level-up→`UNLOCK_MAP` machinery that already exists and is already honored by the
> Obsidian adapter. FIRST of two cycles; **Arc-2 rebalance is the next, separate cycle.**

## Decisions (locked during brainstorm)

| Question | Decision |
|---|---|
| Story-Mode vs demo | **Replace** the all-unlocked demo — the web is gated/progressive |
| Unlock granularity | **Level-batched** (existing `UNLOCK_MAP`, XP-driven; matches Obsidian; no new unlock logic) |
| Unlock feedback | Result-modal unlocked-list **+ a "Mission Unlocked" reveal animation** on NEXUS |
| Lore gating | **LOOT gated as rewards** (🔒 until unlocked); FRAGMENT/REF stay open |
| Sandbox | Always open (free drill — never gated) |

## Current state (why this is mostly wiring)

The core already gates: `ProgressionEngine.addXp` returns `level_up` and appends
`UNLOCK_MAP[newLevel]` ids to `data.unlocked`; `DEFAULT_PLUGIN_DATA.unlocked =
['M-01','M-02','M-03','M-04','KATA-01']`; `data.unlocked` is persisted (WebStorage). The
web **ignores `data.unlocked` when rendering** — Arc 1 (M-* + KATAs) is all-clickable and
Arc 2 is hardcoded-locked ("not yet available on the web build"). Story-Mode = make the
web render from `data.unlocked`, add unlock feedback, and migrate existing saves safely.

## Architecture

### 1. Core — shared unlock helpers (pure, tested)

In `packages/core/src/engine/ProgressionEngine.ts`:
```ts
// Ensures `unlocked` ⊇ defaults ∪ every level's UNLOCK_MAP up to the player's level
// ∪ completed_missions. Idempotent. Used at load time by both adapters.
static backfillUnlocks(data: PluginData): PluginData
```
In `packages/core/src/data/levels.ts`:
```ts
// The level whose UNLOCK_MAP first contains `id`, or null (default-unlocked / not gated).
export function unlockLevelFor(id: string): number | null
```
**DRY:** `adapter-obsidian/src/main.ts` `loadData_` currently inlines this backfill (default
unlocks + a `for lvl=2..currentLevel` loop) — replace it with `backfillUnlocks` so both
adapters share one source of truth (same rationale as the v0.2.1 record-parity fix).

### 2. NEXUS gating (`adapter-web/src/ui/App.tsx`)

- Arc 1 rows (M-* + KATAs): render from `data.unlocked.includes(m.mission_id)`. Unlocked →
  current behavior (done/active, clickable). Locked → reuse `nv-row-locked` + `disabled`,
  show 🔒 and **`LVL {unlockLevelFor(id)}`** in the meta.
- Arc 2 rows: **remove the hardcoded locked block**; render R-* through the same
  `data.unlocked` check (they unlock at levels 5–9 via `UNLOCK_MAP`).
- `activeId` (the ▸ marker) = first mission that is **unlocked and not completed**.
- Sandbox + Archive section entries remain always present.

### 3. "Mission Unlocked" feedback

- **Result modal:** add `unlocked?: string[]` to `MissionResultData`; on a level-up, fill it
  from `level_up.unlocked_missions` (+ loot) and render an `UNLOCKED: …` line under the
  LEVEL UP badge.
- **NEXUS reveal animation:** App holds a transient `justUnlocked: string[]` set from
  `level_up.unlocked_missions` when returning to NEXUS (the `onNexus` path, alongside the
  existing `flashXp`). Matching rows get a `nv-just-unlocked` class → a CSS phosphor
  reveal (scan/glow fade-in) plus a `▸ MISSION UNLOCKED` marker; cleared by a timer (reuse
  the `xpFlash` setTimeout pattern). The animation **respects the existing reduce-effects
  setting** (no motion when reduced). Styling via `--nv-*` tokens in `styles.css`.

### 4. LOOT gating (`adapter-web/src/ui/LoreView.tsx`)

- `LoreView` gains an `unlocked: string[]` prop (App passes `data.unlocked`). For `kind:
  'loot'` items, if `!unlocked.includes(item.id)` render a **locked card** (🔒 + `LVL
  {unlockLevel}` from the existing `LoreSummary.unlockLevel`), not clickable. FRAGMENT/REF
  cards are unchanged (always open). The artifact count in the header still reflects all
  items, or switches to "N unlocked" — implementer's call, default: keep total.

### 5. Migration

Existing web saves have a persisted `data.unlocked` (the demo still ran `addXp`, so it
roughly tracks level). On load, `App.tsx` applies `backfillUnlocks(loaded)` after merging
defaults, so no returning player is locked out of content their level/progress earned, and
anything in `completed_missions` stays accessible.

## Testing

- Core `ProgressionEngine.test.ts`: `backfillUnlocks` — at level 1 yields just defaults; at
  level 3 includes L2+L3 unlocks; preserves `completed_missions`; idempotent (applying
  twice == once). `unlockLevelFor` — returns 2 for an L2 id, 5 for an R-* id, null for
  `M-01` (default) and for an unknown id.
- adapter-web stays UI-test-free (convention); the gating logic lives in the tested core.
- Gate green: `npm run typecheck && npm test && npm run build:web` (175 + new core tests).

## Out of scope (YAGNI)

- **Arc-2 rebalance** — the next cycle.
- FRAGMENT/REF gating (no `unlockLevel`; would need a new scheme).
- A Free-Play toggle (rejected — Story-Mode replaces the demo).
- Strict per-mission sequential unlock (we use level-batched).
- Obsidian UI changes (it already gates; it only gains the shared `backfillUnlocks`).
