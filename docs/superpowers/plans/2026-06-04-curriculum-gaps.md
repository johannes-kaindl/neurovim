# Curriculum Gaps (:g KATA) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (or subagent-driven-development) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Add KATA-14 "Dragnet" — a global-command (`:g/pattern/d`) drill — closing the one curriculum gap teachable via the text-diff verb.

**Architecture:** Content authoring, same pattern as the find-char/dot KATAs: append a KATA (transmission + solution), wire it into `chapters.ts` + `UNLOCK_MAP`, bump the content-test counts.

**Spec:** `docs/superpowers/specs/2026-06-04-curriculum-gaps-design.md`. **Branch:** `feat/curriculum-gaps` (spec committed).

**Conventions:** never hand-edit `src/generated/*` (edit source + `npm run build:content`); ASCII header byte-identical between transmission + solution; gate green before commit; Conventional Commits ending with `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

### Task 1: Author KATA-14 + wire it + update counts

**Files:**
- Create: `packages/content/src/content/KATAS/KATA-14-TRANSMISSION-Dragnet.md`
- Create: `packages/content/src/solutions/KATA-14-SOLUTION-Dragnet.md`
- Modify: `packages/core/src/data/chapters.ts` (KATAS array)
- Modify: `packages/core/src/data/levels.ts` (UNLOCK_MAP level 6)
- Test: `packages/content/test/content.test.ts` (counts)

- [ ] **Step 1: Create the transmission**

`KATA-14-TRANSMISSION-Dragnet.md`:

`````md
---
mission_id: KATA-14
title: "Dragnet"
tier: "⬛ KATA"
xp_reward: 10
completed: false
difficulty: 3
category: ex-commands
par_keystrokes: 14
tags:
  - kata
  - vim/ex-commands
  - vim/global
sticker: lucide//filter
color: "#444444"
summary: A trace flood buried the real log. One global command — :g/TRACE/d — nets every junk line at once. (:v keeps only matches; :g//normal runs an edit on each.) No story. Just precision.
mission_type: practice
locked: true
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-14 // DRAGNET                       ║
║  Skills: :g/pat/d   :v/pat/d              ║
╚══════════════════════════════════════════╝
```

CHANNEL LOG — STRIP THE TRACE FLOOD

[OK]    auth alpha
[TRACE] step 0x01
[OK]    auth bravo
[TRACE] step 0x02
[OK]    auth charlie
[TRACE] step 0x03
[OK]    auth delta
[TRACE] step 0x04
[OK]    auth echo
[TRACE] step 0x05
`````

- [ ] **Step 2: Create the solution** (header byte-identical; the 5 `[TRACE]` lines removed)

`KATA-14-SOLUTION-Dragnet.md`:

`````md
```ascii
╔══════════════════════════════════════════╗
║  KATA-14 // DRAGNET                       ║
║  Skills: :g/pat/d   :v/pat/d              ║
╚══════════════════════════════════════════╝
```

CHANNEL LOG — STRIP THE TRACE FLOOD

[OK]    auth alpha
[OK]    auth bravo
[OK]    auth charlie
[OK]    auth delta
[OK]    auth echo
`````

(Diff = delete the 5 `[TRACE]` lines → `:g/TRACE/d`. par 14.)

- [ ] **Step 3: Append the chapters.ts KATAS entry**

In `packages/core/src/data/chapters.ts`, after the `KATA-13` entry (before the `KATAS` array's closing `];`):

```ts
  { id: 'KATA-14', title: 'DRAGNET',             path: `${K}/KATA-14-TRANSMISSION-Dragnet.md`,             solution_path: `${KS}/KATA-14-SOLUTION-Dragnet.md`,             corrupted_path: `${KS}/KATA-14-CORRUPTED-Dragnet.md`,             category: 'ex-commands',  xp_reward: 10, difficulty: 3 },
```

- [ ] **Step 4: Add KATA-14 to UNLOCK_MAP level 6**

In `packages/core/src/data/levels.ts`, change:
```ts
  6: { missions: ['R-05', 'R-06', 'R-07', 'R-08', 'KATA-07'],                            loot: ['LOOT-05'] },
```
to:
```ts
  6: { missions: ['R-05', 'R-06', 'R-07', 'R-08', 'KATA-07', 'KATA-14'],                 loot: ['LOOT-05'] },
```

- [ ] **Step 5: Update content-test counts (run first to see them fail)**

Run: `npm run build:content && npm test --workspace @neurovim/content`
Expected: FAIL — counts now 165/14/53/54 vs the asserted 163/13/52/53.

Then in `packages/content/test/content.test.ts`:
- `expect(ENTRIES.length).toBe(163);` → `165`, title `'has all 163 content entries (111 content + 52 solutions)'` → `'has all 165 content entries (112 content + 53 solutions)'`.
- `expect(count('kata')).toBe(13);` → `14`; `expect(count('solution')).toBe(52);` → `53`; title `'… 13 kata, …, 52 solution)'` → `'… 14 kata, …, 53 solution)'`.
- `expect(listMissions().length).toBe(53);` → `54`; title `'returns 53 playable missions (40 transmission + 13 kata)'` → `'returns 54 playable missions (40 transmission + 14 kata)'`.

- [ ] **Step 6: Verify green**

Run: `npm test --workspace @neurovim/content && npm run typecheck`
Expected: PASS + GREEN.

- [ ] **Step 7: Commit**

```bash
git add packages/content/src/content/KATAS/KATA-14-TRANSMISSION-Dragnet.md packages/content/src/solutions/KATA-14-SOLUTION-Dragnet.md packages/core/src/data/chapters.ts packages/core/src/data/levels.ts packages/content/src/generated/content.ts packages/content/test/content.test.ts
git commit -m "feat(content): KATA-14 Dragnet — global-command (:g) drill

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Full gate

- [ ] **Step 1:** Run `npm run typecheck && npm test && npm run build:web` → all green (183 total), `✓ built`.
- [ ] **Step 2:** `npm run build:content && git diff --exit-code -- packages/content/src/generated` → no diff.
- [ ] **Step 3:** `git status --short` → empty.

---

## Self-Review

**Spec coverage:** KATA-14 (:g drill) → Task 1 ✓; chapters.ts + UNLOCK_MAP L6 → Task 1 Steps 3-4 ✓; counts 165/14/53/54 → Step 5 ✓; cheatsheet untouched (category exists) ✓; folding/jumps/marks out of scope (not touched) ✓.
**Placeholder scan:** none — full file contents + exact count edits.
**Type consistency:** `KataDefinition` fields match (difficulty 3 ∈ `1|2|3`); `category: 'ex-commands'` matches the cheatsheet id; counts arithmetic: +1 kata +1 solution = +2 entries (163→165). par/difficulty flow via `toSummary` (par-tiers cycle).
