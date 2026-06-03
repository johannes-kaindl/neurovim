# Story-Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the web from an all-unlocked demo into a progressive Story-Mode — the NEXUS gates missions/KATAs/LOOT from `data.unlocked`, new content reveals on level-up with feedback, and existing saves migrate cleanly.

**Architecture:** A shared pure core helper (`ProgressionEngine.backfillUnlocks`) computes the entitled unlock set from the existing `UNLOCK_MAP`; the web NEXUS + Lore Archive render gated from `data.unlocked`; a transient `justUnlocked` set drives a reveal animation. Obsidian already gates and just adopts the shared helper (DRY).

**Tech Stack:** TypeScript core, Preact, jest, Vite. Web is the primary target.

**Spec:** `docs/superpowers/specs/2026-06-03-story-mode-design.md`. **Branch:** `feat/story-mode` (spec committed).

**Conventions:** core stays pure; CSS only in `adapter-web/src/styles.css` via `--nv-*` tokens; reduce-effects = `html[data-fx="off"]` (zeroes glow/scan) + a global `prefers-reduced-motion` block already kills animations; gate green before commits; Conventional Commits ending with `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

### Task 1: Core unlock helpers (`backfillUnlocks` + `unlockLevelFor`)

**Files:**
- Modify: `packages/core/src/engine/ProgressionEngine.ts`
- Modify: `packages/core/src/data/levels.ts`
- Test: `packages/core/test/ProgressionEngine.test.ts`

- [ ] **Step 1: Write the failing tests**

Append to `packages/core/test/ProgressionEngine.test.ts` (it already imports from `../src/...`; add imports for `DEFAULT_PLUGIN_DATA` from `../src/types` and `unlockLevelFor` from `../src/data/levels` at the top if not present):

```ts
import { DEFAULT_PLUGIN_DATA } from '../src/types';
import { unlockLevelFor } from '../src/data/levels';

describe('ProgressionEngine.backfillUnlocks', () => {
  it('at level 1 yields exactly the defaults', () => {
    const d = ProgressionEngine.backfillUnlocks({ ...DEFAULT_PLUGIN_DATA });
    expect(new Set(d.unlocked)).toEqual(new Set(DEFAULT_PLUGIN_DATA.unlocked));
  });
  it('at level 3 includes the level-2 and level-3 unlocks', () => {
    const d = ProgressionEngine.backfillUnlocks({ ...DEFAULT_PLUGIN_DATA, total_xp: 186 });
    expect(d.unlocked).toEqual(expect.arrayContaining(['M-05', 'KATA-12', 'LOOT-01', 'M-09', 'KATA-13', 'LOOT-02']));
    expect(d.unlocked).not.toContain('M-13'); // level-4 content stays locked
  });
  it('preserves completed missions even if not otherwise unlocked', () => {
    const d = ProgressionEngine.backfillUnlocks({ ...DEFAULT_PLUGIN_DATA, completed_missions: ['R-20'] });
    expect(d.unlocked).toContain('R-20');
  });
  it('is idempotent', () => {
    const once = ProgressionEngine.backfillUnlocks({ ...DEFAULT_PLUGIN_DATA, total_xp: 601 });
    const twice = ProgressionEngine.backfillUnlocks(once);
    expect(new Set(twice.unlocked)).toEqual(new Set(once.unlocked));
  });
});

describe('unlockLevelFor', () => {
  it('returns the level that first unlocks an id', () => {
    expect(unlockLevelFor('M-05')).toBe(2);
    expect(unlockLevelFor('KATA-12')).toBe(2);
    expect(unlockLevelFor('KATA-13')).toBe(3);
    expect(unlockLevelFor('R-01')).toBe(5);
  });
  it('returns null for default-unlocked or unknown ids', () => {
    expect(unlockLevelFor('M-01')).toBeNull();
    expect(unlockLevelFor('NOPE')).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test --workspace @neurovim/core -- ProgressionEngine`
Expected: FAIL — `backfillUnlocks`/`unlockLevelFor` are not defined.

- [ ] **Step 3: Add `unlockLevelFor` to `levels.ts`**

At the end of `packages/core/src/data/levels.ts`:

```ts
/** The level whose UNLOCK_MAP first lists `id` (mission or loot), or null if not gated. */
export function unlockLevelFor(id: string): number | null {
  for (const lvl of Object.keys(UNLOCK_MAP).map(Number).sort((a, b) => a - b)) {
    const u = UNLOCK_MAP[lvl];
    if (u.missions.includes(id) || u.loot.includes(id)) return lvl;
  }
  return null;
}
```

- [ ] **Step 4: Add `backfillUnlocks` to `ProgressionEngine.ts`**

Add `DEFAULT_PLUGIN_DATA` to the existing `'../types'` import (it currently imports `PluginData, LevelUpResult, MissionRecord`). Then add this static method to the `ProgressionEngine` class (e.g. after `addXp`):

```ts
  /**
   * Ensure `unlocked` holds everything the player is entitled to: the defaults, every
   * UNLOCK_MAP level up to their current level, and any completed mission (so a migrated
   * save never shows a completed mission as locked). Idempotent.
   */
  static backfillUnlocks(data: PluginData): PluginData {
    const unlocked = new Set(data.unlocked);
    for (const id of DEFAULT_PLUGIN_DATA.unlocked) unlocked.add(id);
    const level = this.getLevelForXp(data.total_xp);
    for (let lvl = 2; lvl <= level; lvl++) {
      const u = UNLOCK_MAP[lvl] ?? { missions: [], loot: [] };
      for (const id of [...u.missions, ...u.loot]) unlocked.add(id);
    }
    for (const id of data.completed_missions) unlocked.add(id);
    return { ...data, unlocked: [...unlocked] };
  }
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test --workspace @neurovim/core -- ProgressionEngine`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add packages/core/src/engine/ProgressionEngine.ts packages/core/src/data/levels.ts packages/core/test/ProgressionEngine.test.ts
git commit -m "feat(core): backfillUnlocks + unlockLevelFor for progressive unlock

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Obsidian DRY — adopt the shared backfill

**Files:**
- Modify: `packages/adapter-obsidian/src/main.ts` (`loadData_`)

- [ ] **Step 1: Replace the inline backfill loops**

In `packages/adapter-obsidian/src/main.ts` `loadData_`, replace this block:

```ts
    // Ensure default unlocks are always present (forward-migration for new content)
    for (const id of DEFAULT_PLUGIN_DATA.unlocked) {
      if (!merged.unlocked.includes(id)) merged.unlocked.push(id);
    }
    // Backfill level-based unlocks — ensures new content added to UNLOCK_MAP
    // reaches existing players without requiring another level-up event
    const currentLevel = ProgressionEngine.getLevelForXp(merged.total_xp);
    for (let lvl = 2; lvl <= currentLevel; lvl++) {
      const unlocks = UNLOCK_MAP[lvl] ?? { missions: [], loot: [] };
      for (const id of [...unlocks.missions, ...unlocks.loot]) {
        if (!merged.unlocked.includes(id)) merged.unlocked.push(id);
      }
    }
    this.data = merged;
```

with:

```ts
    // Backfill unlocks (defaults + level-based + completed) via the shared core helper.
    this.data = ProgressionEngine.backfillUnlocks(merged);
```

- [ ] **Step 2: Remove the now-unused `UNLOCK_MAP` import**

`UNLOCK_MAP` is no longer referenced in `main.ts` after Step 1. Remove its import line:
```ts
import { UNLOCK_MAP } from '@neurovim/core';
```
(Leave `DEFAULT_PLUGIN_DATA` and `ProgressionEngine` imports — still used elsewhere.)

- [ ] **Step 3: Typecheck + tests**

Run: `npm run typecheck && npm test --workspace @neurovim/adapter-obsidian`
Expected: GREEN (typecheck clean; the 6 obsidian tests still pass — they don't touch `loadData_`).

- [ ] **Step 4: Commit**

```bash
git add packages/adapter-obsidian/src/main.ts
git commit -m "refactor(adapter-obsidian): use shared ProgressionEngine.backfillUnlocks

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Gate the NEXUS from `data.unlocked` (`App.tsx`)

**Files:**
- Modify: `packages/adapter-web/src/ui/App.tsx`

- [ ] **Step 1: Extend the core import + add the type**

In the `from '@neurovim/core'` import block, add the value `unlockLevelFor` and the type `MissionSummary`:

```ts
import {
  MissionEngine, ProgressionEngine, AudioEngine, SoundCues,
  resolvePar, tierFor, keystrokesToNextTier, unlockLevelFor,
  DEFAULT_PLUGIN_DATA, type PluginData, type MissionDoc, type MetricsResult,
  type MissionSummary, type SandboxDifficulty,
} from '@neurovim/core';
```

- [ ] **Step 2: Backfill unlocks on load + add the justUnlocked state**

Replace the load effect:
```ts
  useEffect(() => {
    storage.loadData<PluginData>().then((d) => { if (d) setData({ ...DEFAULT_PLUGIN_DATA, ...d }); });
  }, []);
```
with:
```ts
  useEffect(() => {
    storage.loadData<PluginData>().then((d) => {
      if (d) setData(ProgressionEngine.backfillUnlocks({ ...DEFAULT_PLUGIN_DATA, ...d }));
    });
  }, []);
```

Add a transient reveal-state near the other `useState` hooks (after `const [cheatOpen, setCheatOpen] = useState(false);`):
```ts
  const [justUnlocked, setJustUnlocked] = useState<string[]>([]);
```
And next to `flashXp`, add:
```ts
  function markJustUnlocked(ids: string[]) {
    setJustUnlocked(ids);
    window.setTimeout(() => setJustUnlocked([]), 2200);
  }
```

- [ ] **Step 3: Make nextMissionId arc-aware + gate the "Next" button**

Replace `nextMissionId`:
```ts
function nextMissionId(id: string): string | null {
  const list = listMissions('I');
  const i = list.findIndex((m) => m.mission_id === id);
  return i >= 0 && i < list.length - 1 ? list[i + 1].mission_id : null;
}
```
with:
```ts
function nextMissionId(id: string): string | null {
  const list = listMissions(id.startsWith('R-') ? 'II' : 'I');
  const i = list.findIndex((m) => m.mission_id === id);
  return i >= 0 && i < list.length - 1 ? list[i + 1].mission_id : null;
}
```

In the `<MissionResult ... />` mount, change the `hasNext` + `onNexus` props:
```tsx
            hasNext={result.status === 'complete' && (() => { const n = nextMissionId(mission.mission_id); return n != null && data.unlocked.includes(n); })()}
            onRetry={() => setResult(null)}
            onNext={() => { const n = nextMissionId(mission.mission_id); if (n) selectMission(n); }}
            onNexus={() => { const gained = result.status === 'complete'; const ju = result.unlocked ?? []; setResult(null); setView('nexus'); if (gained) flashXp(); if (ju.length) markJustUnlocked(ju); }}
```

- [ ] **Step 4: Update `activeId` to the first unlocked + uncompleted mission**

Replace:
```ts
  const activeId = arc1.find((m) => !data.completed_missions.includes(m.mission_id))?.mission_id ?? null;
```
with:
```ts
  const activeId = arc1.find((m) => data.unlocked.includes(m.mission_id) && !data.completed_missions.includes(m.mission_id))?.mission_id ?? null;
```

- [ ] **Step 5: Add a shared `missionRow` renderer**

Add this helper inside `App`, after `arc1Groups` is built (it reads `data`, `activeId`, `justUnlocked`):
```tsx
  function missionRow(m: MissionSummary) {
    const rec = data.missions[m.mission_id];
    const unlocked = data.unlocked.includes(m.mission_id);
    const done = data.completed_missions.includes(m.mission_id);
    if (!unlocked) {
      const lvl = unlockLevelFor(m.mission_id);
      return (
        <button class="nv-row nv-row-locked" key={m.mission_id} disabled aria-disabled="true"
                title={lvl ? `Unlocks at level ${lvl}` : 'Locked'}>
          <span class="nv-row-id">{m.mission_id}</span>
          <span class="nv-row-t">{m.title}</span>
          <span class="nv-row-meta nv-row-lock">🔒{lvl ? ` LVL ${lvl}` : ''}</span>
        </button>
      );
    }
    const active = m.mission_id === activeId;
    const justUp = justUnlocked.includes(m.mission_id);
    const bestTier = done && (rec?.best_keystrokes ?? 0) > 0
      ? tierFor(rec!.best_keystrokes, resolvePar({ parOverride: m.par_keystrokes, difficulty: m.difficulty }))
      : null;
    const cls = ['nv-row', done && 'nv-row-done', active && 'nv-row-active', justUp && 'nv-just-unlocked'].filter(Boolean).join(' ');
    return (
      <button class={cls} key={m.mission_id} onClick={() => selectMission(m.mission_id)}>
        <span class="nv-row-id">{active ? '▸ ' : ''}{m.mission_id}</span>
        <span class="nv-row-t">{m.title}</span>
        {justUp && <span class="nv-row-unlocked">▸ UNLOCKED</span>}
        {bestTier && <span class={`nv-row-tier nv-tier-${bestTier}`} title={`best: ${bestTier}`}>{bestTier === 'gold' ? '★' : bestTier === 'silver' ? '◆' : '▲'}</span>}
        {done && (rec?.best_time_ms ?? 0) > 0
          ? <span class="nv-row-meta">{fmtTime(rec!.best_time_ms)} · {rec!.best_keystrokes}ks</span>
          : <span class="nv-row-meta">{m.xp_reward} XP</span>}
        {done && <span class="nv-row-x">✓</span>}
      </button>
    );
  }
```

- [ ] **Step 6: Use `missionRow` for Arc I + replace the hardcoded Arc II block**

In the `arc1Groups.map(...)` section, replace the inline `g.items.map((m) => { ... })` body with:
```tsx
          {g.items.map(missionRow)}
```

Replace the entire hardcoded Arc II `<section>`:
```tsx
      <section class="nv-tier">
        <div class="nv-tier-label nv-label">Arc II — Encrypted</div>
        {arc2.map((m) => (
          <button class="nv-row nv-row-locked" key={m.mission_id} disabled aria-disabled="true"
                  title="ARC II — not yet available on the web build">
            <span class="nv-row-id">{m.mission_id}</span>
            <span class="nv-row-t">{m.title} · ARC II</span>
            <span class="nv-row-meta nv-row-lock">🔒</span>
          </button>
        ))}
      </section>
```
with:
```tsx
      <section class="nv-tier">
        <div class="nv-tier-label nv-label">Arc II — Encrypted</div>
        {arc2.map(missionRow)}
      </section>
```

- [ ] **Step 7: Typecheck**

Run: `npm run typecheck`
Expected: GREEN.

- [ ] **Step 8: Commit**

```bash
git add packages/adapter-web/src/ui/App.tsx
git commit -m "feat(adapter-web): gate NEXUS missions from data.unlocked (Story-Mode)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Mission-Unlocked feedback (result modal + NEXUS reveal)

**Files:**
- Modify: `packages/adapter-web/src/ui/MissionResult.tsx`
- Modify: `packages/adapter-web/src/ui/App.tsx` (`submit`)
- Modify: `packages/adapter-web/src/styles.css`

- [ ] **Step 1: Add `unlocked` to `MissionResultData` + render it**

In `MissionResult.tsx`, add to the `MissionResultData` interface (after `toNextTier?: ...`):
```ts
  /** Mission ids newly unlocked by this run's level-up (for the UNLOCKED line). */
  unlocked?: string[];
```
In the `complete` branch, add right after the `nv-modal-levelup` block:
```tsx
            {result.unlocked && result.unlocked.length > 0 && (
              <div class="nv-modal-unlocked">UNLOCKED: {result.unlocked.join(' · ')}</div>
            )}
```

- [ ] **Step 2: Fill `unlocked` in `submit()`**

In `App.tsx` `submit()`, add one field to the success `setResult({ ... })` object (after `toNextTier: ...`):
```ts
      unlocked: level_up ? level_up.unlocked_missions : undefined,
```

- [ ] **Step 3: Add the styles**

In `packages/adapter-web/src/styles.css`, near the other `.nv-modal-*` / `.nv-row-*` rules:
```css
/* Story-Mode: unlock feedback (animation gated by data-fx + reduced-motion) */
.nv-modal-unlocked { margin-top: 10px; font-size: 13px; color: var(--nv-accent); letter-spacing: 0.5px; }
.nv-row-unlocked { margin-left: auto; padding-right: 8px; color: var(--nv-accent-hot); font-size: var(--nv-fs-micro); letter-spacing: var(--nv-ls-label); }
.nv-just-unlocked { animation: nv-unlock-reveal 1.6s var(--nv-ease) both; }
@keyframes nv-unlock-reveal {
  0%   { opacity: 0; transform: translateX(-6px); }
  35%  { opacity: 1; box-shadow: 0 0 calc(16px * var(--nv-glow)) color-mix(in oklab, var(--nv-accent) 55%, transparent); }
  100% { opacity: 1; transform: none; box-shadow: none; }
}
html[data-fx="off"] .nv-just-unlocked { animation: none; }
```
(`prefers-reduced-motion` already neutralizes the animation globally via the existing media block.)

- [ ] **Step 4: Build + typecheck**

Run: `npm run typecheck && npm run build:web`
Expected: GREEN + `✓ built`.

- [ ] **Step 5: Commit**

```bash
git add packages/adapter-web/src/ui/MissionResult.tsx packages/adapter-web/src/ui/App.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): mission-unlocked feedback (modal list + NEXUS reveal)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: LOOT gating in the Lore Archive

**Files:**
- Modify: `packages/adapter-web/src/ui/LoreView.tsx`
- Modify: `packages/adapter-web/src/ui/App.tsx` (LoreView mount)
- Modify: `packages/adapter-web/src/styles.css`

- [ ] **Step 1: Add the `unlocked` prop + gate LOOT cards**

In `LoreView.tsx`, change the `Props` interface:
```ts
interface Props {
  onExit: () => void;
  unlocked: string[];
}
```
and the signature:
```ts
export function LoreView({ onExit, unlocked }: Props) {
```
Replace the `inGroup.map((it) => ( ... ))` card render with:
```tsx
              {inGroup.map((it) => {
                const locked = it.kind === 'loot' && !unlocked.includes(it.id);
                if (locked) {
                  return (
                    <div class="nv-card nv-card-locked" key={it.id} aria-disabled="true">
                      <span class="nv-card-t">🔒 {it.title}</span>
                      <span class="nv-card-badge nv-amber">LVL {it.unlockLevel}</span>
                      <span class="nv-card-s">Locked — unlock by reaching level {it.unlockLevel}.</span>
                    </div>
                  );
                }
                return (
                  <button class="nv-card" key={it.id} onClick={() => setCurrent(it)}>
                    <span class="nv-card-t">{it.title}</span>
                    {it.unlockLevel != null
                      ? <span class="nv-card-badge nv-amber">LVL {it.unlockLevel}</span>
                      : <span class="nv-card-badge">{it.kind === 'ref' ? 'REF' : 'INTEL'}</span>}
                    {it.summary && <span class="nv-card-s">{it.summary}</span>}
                  </button>
                );
              })}
```

- [ ] **Step 2: Pass `unlocked` from App**

In `App.tsx`, change the LoreView mount:
```tsx
        <LoreView onExit={() => setView('nexus')} />
```
to:
```tsx
        <LoreView unlocked={data.unlocked} onExit={() => setView('nexus')} />
```

- [ ] **Step 3: Add the locked-card style**

In `styles.css`, near `.nv-card`:
```css
.nv-card-locked { opacity: 0.55; border-style: dashed; border-color: color-mix(in oklab, var(--nv-amber) 35%, var(--nv-border)); cursor: default; }
.nv-card-locked .nv-card-t { color: var(--nv-amber); }
```

- [ ] **Step 4: Typecheck + build**

Run: `npm run typecheck && npm run build:web`
Expected: GREEN + `✓ built`.

- [ ] **Step 5: Commit**

```bash
git add packages/adapter-web/src/ui/LoreView.tsx packages/adapter-web/src/ui/App.tsx packages/adapter-web/src/styles.css
git commit -m "feat(adapter-web): gate LOOT artifacts in the Lore Archive (Story-Mode)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Full quality gate

- [ ] **Step 1: Run the full gate**

Run: `npm run typecheck && npm test && npm run build:content && npm run build:web`
Expected: typecheck clean; all tests green (core gains the backfill/unlockLevelFor tests, ~181 total); content in sync; web build `✓ built`.

- [ ] **Step 2: Confirm working tree clean**

Run: `git status --short`
Expected: empty.

---

## Self-Review

**Spec coverage:**
- Core `backfillUnlocks` + `unlockLevelFor` (pure, tested) → Task 1 ✓
- DRY: Obsidian adopts the shared helper → Task 2 ✓
- NEXUS gating (Arc 1 + Arc 2 from `data.unlocked`, locked rows + 🔒 LVL N, activeId = unlocked+uncompleted, backfill on load) → Task 3 ✓
- Mission-Unlocked feedback (modal UNLOCKED list + NEXUS `nv-just-unlocked` reveal, reduce-effects-aware) → Task 4 ✓
- LOOT gating (FRAGMENT/REF open, Sandbox open) → Task 5 ✓
- Migration (backfill on web load) → Task 3 Step 2 ✓
- Tests + gate green → Tasks 1/6 ✓
- Out of scope (Arc-2 rebalance, FRAGMENT/REF gating, Free-Play toggle, strict-sequential) → untouched ✓

**Placeholder scan:** none — every step has exact code.

**Type consistency:** `backfillUnlocks(data: PluginData): PluginData` and `unlockLevelFor(id: string): number | null` are used consistently (App load, missionRow, Obsidian). `MissionResultData.unlocked?: string[]` matches `level_up.unlocked_missions` (string[]) and `result.unlocked` reads in `onNexus`/MissionResult. `missionRow(m: MissionSummary)` matches `listMissions()` element type and is fed both `g.items` (MissionSummary[]) and `arc2` (MissionSummary[]). `LoreView` `unlocked: string[]` prop matches `data.unlocked`. `nextMissionId` arc-aware + `hasNext` gating both reference `data.unlocked`.
