# find-char + dot KATAs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two appended KATAs — KATA-12 "Target Lock" (find-char `f/F/t/T/;/,`) and KATA-13 "Echo" (the `.` dot command) — that drill the two systemic gaps from the audit, plus a FIND CHAR cheatsheet group, wired to unlock early.

**Architecture:** KATAs are self-contained free drills (transmission start-text + solution target-text, no briefing), authored as Markdown SSOT and regenerated into the typed manifest by `build:content`. They append cleanly (KATA-12/13, no renumbering) and are wired through the existing `chapters.ts` KATAS array + `UNLOCK_MAP` + `cheatsheet.ts`. par_keystrokes (from the v0.2.2 par-tier cycle) is hand-tuned per kata.

**Tech Stack:** Markdown + gray-matter (`build.mjs`), TypeScript core data tables, jest (content counts), npm workspaces.

**Spec:** `docs/superpowers/specs/2026-06-03-find-char-dot-missions-design.md`. **Branch:** `feat/find-char-dot-katas` (spec already committed).

**Conventions:** generated content is committed (CI content-gate enforces sync); never hand-edit `src/generated/*` — edit source + `npm run build:content`. Gate green before commits. Commits Conventional + end with `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`. The ASCII header block must be **byte-identical** between a kata's transmission and solution (only the body lines below it differ).

---

### Task 1: Author the four KATA content files

**Files:**
- Create: `packages/content/src/content/KATAS/KATA-12-TRANSMISSION-Target_Lock.md`
- Create: `packages/content/src/solutions/KATA-12-SOLUTION-Target_Lock.md`
- Create: `packages/content/src/content/KATAS/KATA-13-TRANSMISSION-Echo.md`
- Create: `packages/content/src/solutions/KATA-13-SOLUTION-Echo.md`

- [ ] **Step 1: Create KATA-12 transmission**

`packages/content/src/content/KATAS/KATA-12-TRANSMISSION-Target_Lock.md`:

`````md
---
mission_id: KATA-12
title: "Target Lock"
tier: "⬛ KATA"
xp_reward: 10
completed: false
difficulty: 1
category: navigation
par_keystrokes: 22
tags:
  - kata
  - vim/navigation
  - vim/find-char
sticker: lucide//crosshair
color: "#444444"
summary: CORP slipped stray markers into the grid. Jump straight to each one with f/t — no h/l crawling — and repeat with ;. No story. Just precision.
mission_type: practice
locked: true
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-12 // TARGET LOCK                   ║
║  Skills: f  F  t  T  ;  ,                 ║
╚══════════════════════════════════════════╝
```

SECTOR SCAN — PURGE THE STRAY MARKERS

grid alpha7 clear
grid bravo7 clear
grid charlie7 clear
grid delta7 secure7
`````

- [ ] **Step 2: Create KATA-12 solution** (no frontmatter; header byte-identical to the transmission's)

`packages/content/src/solutions/KATA-12-SOLUTION-Target_Lock.md`:

`````md
```ascii
╔══════════════════════════════════════════╗
║  KATA-12 // TARGET LOCK                   ║
║  Skills: f  F  t  T  ;  ,                 ║
╚══════════════════════════════════════════╝
```

SECTOR SCAN — PURGE THE STRAY MARKERS

grid alpha clear
grid bravo clear
grid charlie clear
grid delta secure
`````

(Diff = remove each stray `7`. Optimal solve jumps to each `7` with `f7` + `x`, repeating the find with `;` on the last line — calibrated to par 22.)

- [ ] **Step 3: Create KATA-13 transmission**

`packages/content/src/content/KATAS/KATA-13-TRANSMISSION-Echo.md`:

`````md
---
mission_id: KATA-13
title: "Echo"
tier: "⬛ KATA"
xp_reward: 10
completed: false
difficulty: 2
category: fundamentals
par_keystrokes: 16
tags:
  - kata
  - vim/editing
  - vim/dot
sticker: lucide//repeat
color: "#444444"
summary: The same junk tag, five times over. Fix it once, then let the dot command (.) echo the change down the list. No story. Just precision.
mission_type: practice
locked: true
---
```ascii
╔══════════════════════════════════════════╗
║  KATA-13 // ECHO                          ║
║  Skills: .  (repeat last change)          ║
╚══════════════════════════════════════════╝
```

SIGNAL BUFFER — STRIP THE DUP TAGS

DUP relay alpha
DUP relay bravo
DUP relay charlie
DUP relay delta
DUP relay echo
`````

- [ ] **Step 4: Create KATA-13 solution** (no frontmatter; header byte-identical)

`packages/content/src/solutions/KATA-13-SOLUTION-Echo.md`:

`````md
```ascii
╔══════════════════════════════════════════╗
║  KATA-13 // ECHO                          ║
║  Skills: .  (repeat last change)          ║
╚══════════════════════════════════════════╝
```

SIGNAL BUFFER — STRIP THE DUP TAGS

relay alpha
relay bravo
relay charlie
relay delta
relay echo
`````

(Diff = remove the `DUP ` prefix from each line. Optimal solve: `dw` once, then `j0.` repeats the change — calibrated to par 16.)

- [ ] **Step 5: Regenerate the manifest and verify the new entries are picked up**

Run: `npm run build:content && grep -c "KATA-12\|KATA-13" packages/content/src/generated/content.ts`
Expected: build succeeds; grep count ≥ 4 (KATA-12/13 transmission + solution entries present).

---

### Task 2: Update the content count tests (red → green) + commit content

**Files:**
- Modify: `packages/content/test/content.test.ts`

- [ ] **Step 1: Run the content tests to confirm the counts are now red**

Run: `npm test --workspace @neurovim/content`
Expected: FAIL — `ENTRIES.length` is 163 (was 159), `kata` 13, `solution` 52, `listMissions` 53; the old hard-coded expectations no longer match.

- [ ] **Step 2: Update the four count assertions (+ their descriptive strings)**

In `packages/content/test/content.test.ts`:

Change `expect(ENTRIES.length).toBe(159);` → `expect(ENTRIES.length).toBe(163);` and its `it(...)` title `'has all 159 content entries (109 content + 50 solutions)'` → `'has all 163 content entries (111 content + 52 solutions)'`.

Change the role-distribution assertions `expect(count('kata')).toBe(11);` → `.toBe(13);` and `expect(count('solution')).toBe(50);` → `.toBe(52);`, and its `it(...)` title `'... 11 kata, 6 loot, 10 fragment, 2 ref, 50 solution)'` → `'... 13 kata, 6 loot, 10 fragment, 2 ref, 52 solution)'`.

Change `expect(listMissions().length).toBe(51);` → `.toBe(53);` and its `it(...)` title `'returns 51 playable missions (40 transmission + 11 kata)'` → `'returns 53 playable missions (40 transmission + 13 kata)'`.

- [ ] **Step 3: Run the content tests to verify green**

Run: `npm test --workspace @neurovim/content`
Expected: PASS (9 tests).

- [ ] **Step 4: Commit content + manifest + tests**

```bash
git add packages/content/src/content/KATAS/KATA-12-TRANSMISSION-Target_Lock.md \
        packages/content/src/content/KATAS/KATA-13-TRANSMISSION-Echo.md \
        packages/content/src/solutions/KATA-12-SOLUTION-Target_Lock.md \
        packages/content/src/solutions/KATA-13-SOLUTION-Echo.md \
        packages/content/src/generated/content.ts \
        packages/content/test/content.test.ts
git commit -m "feat(content): KATA-12 find-char + KATA-13 dot drills

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Wire the KATAs into core (chapters, unlock map, cheatsheet)

**Files:**
- Modify: `packages/core/src/data/chapters.ts` (append to `KATAS`)
- Modify: `packages/core/src/data/levels.ts` (`UNLOCK_MAP`)
- Modify: `packages/core/src/data/cheatsheet.ts` (FIND CHAR group)

- [ ] **Step 1: Append the two KATAS entries**

In `packages/core/src/data/chapters.ts`, add these two lines immediately after the `KATA-11` entry (before the closing `];` of the `KATAS` array):

```ts
  { id: 'KATA-12', title: 'TARGET LOCK',         path: `${K}/KATA-12-TRANSMISSION-Target_Lock.md`,         solution_path: `${KS}/KATA-12-SOLUTION-Target_Lock.md`,         corrupted_path: `${KS}/KATA-12-CORRUPTED-Target_Lock.md`,         category: 'navigation',   xp_reward: 10, difficulty: 1 },
  { id: 'KATA-13', title: 'ECHO',                path: `${K}/KATA-13-TRANSMISSION-Echo.md`,                solution_path: `${KS}/KATA-13-SOLUTION-Echo.md`,                corrupted_path: `${KS}/KATA-13-CORRUPTED-Echo.md`,                category: 'fundamentals', xp_reward: 10, difficulty: 2 },
```

- [ ] **Step 2: Add the KATAs to the UNLOCK_MAP**

In `packages/core/src/data/levels.ts`, in `UNLOCK_MAP`:

Change the level-2 line:
```ts
  2: { missions: ['M-05', 'M-06', 'M-07', 'M-08', 'KATA-02', 'KATA-03'],                 loot: ['LOOT-01'] },
```
to:
```ts
  2: { missions: ['M-05', 'M-06', 'M-07', 'M-08', 'KATA-02', 'KATA-03', 'KATA-12'],      loot: ['LOOT-01'] },
```

Change the level-3 line:
```ts
  3: { missions: ['M-09', 'M-10', 'M-11', 'M-12', 'KATA-04'],                            loot: ['LOOT-02'] },
```
to:
```ts
  3: { missions: ['M-09', 'M-10', 'M-11', 'M-12', 'KATA-04', 'KATA-13'],                 loot: ['LOOT-02'] },
```

- [ ] **Step 3: Add the FIND CHAR cheatsheet group**

In `packages/core/src/data/cheatsheet.ts`, inside the `navigation` category's `groups` array, add this group object immediately after the `FILE JUMPS` group (i.e., as the last group in `navigation`):

```ts
      {
        label: 'FIND CHAR',
        keys: [
          { key: 'f',  description: 'jump to next <char>' },
          { key: 'F',  description: 'jump to previous <char>' },
          { key: 't',  description: 'jump just before next <char>' },
          { key: 'T',  description: 'jump just before previous <char>' },
          { key: ';',  description: 'repeat last f/F/t/T' },
          { key: ',',  description: 'repeat it, reversed' },
        ],
      },
```

(The `.` dot command already lives in `fundamentals` → `EDIT` — leave it.)

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck`
Expected: GREEN (all 4 workspaces).

- [ ] **Step 5: Commit core wiring**

```bash
git add packages/core/src/data/chapters.ts packages/core/src/data/levels.ts packages/core/src/data/cheatsheet.ts
git commit -m "feat(core): wire KATA-12/13 (chapters, unlock map, find-char cheatsheet)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Full quality gate

- [ ] **Step 1: Run the full gate**

Run: `npm run typecheck && npm test && npm run build:web`
Expected: typecheck clean; all tests green (core 153, content 9, adapter-obsidian 6, adapter-web 7 = 175); web build `✓ built`.

- [ ] **Step 2: Confirm generated content is in sync (CI content-gate parity)**

Run: `npm run build:content && git diff --exit-code -- packages/content/src/generated`
Expected: no diff (the manifest committed in Task 2 is current).

- [ ] **Step 3: Confirm working tree clean**

Run: `git status --short`
Expected: empty.

---

## Self-Review

**Spec coverage:**
- Two KATAs (KATA-12 find-char, KATA-13 dot), appended, no renumbering → Task 1 ✓
- Authoring format (transmission + solution, header identical, fix solvable with f/t resp. dot) → Task 1 (concrete content + diff notes) ✓
- par_keystrokes hand-set (22 / 16) → Task 1 frontmatter ✓
- chapters.ts KATAS entries → Task 3 Step 1 ✓
- UNLOCK_MAP L2 / L3 → Task 3 Step 2 ✓
- Cheatsheet FIND CHAR group (dot already present) → Task 3 Step 3 ✓
- Content count tests updated (163 / 13 / 52 / 53) → Task 2 ✓
- build:content regenerates + committed; gate green → Tasks 1/2/4 ✓
- Out of scope (Story-Mode, Arc-2, Obsidian CORRUPTED files) → not touched ✓

**Placeholder scan:** none — all four files have complete content; all edits show exact code.

**Type consistency:** `KataDefinition` fields (id/title/path/solution_path/corrupted_path/category/xp_reward/difficulty `1|2|3`) match the two appended entries (difficulty 1 and 2). `par_keystrokes` + `difficulty` frontmatter already flow through `toSummary` (par-tiers cycle) into `MissionSummary`. Cheatsheet group shape `{ label, keys: [{key, description}] }` matches `CheatsheetCategory`. Count deltas are arithmetically consistent: +2 kata entries +2 solution entries = +4 total (159→163), kata 11→13, solution 50→52, listMissions (transmission 40 + kata 13) 51→53.
