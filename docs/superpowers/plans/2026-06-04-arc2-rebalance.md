# Arc-2 Rebalance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Smooth Arc 2's difficulty plateau into a monotonic 1→5 ramp and break the regex monoculture by re-theming three mid-arc missions into visual-block, macro, and register drills.

**Architecture:** Pure content work — edit `difficulty:` frontmatter across the 24 R-* transmissions and rewrite the content of R-06/R-10/R-14 (transmission + solution + briefing) in place. `build:content` regenerates the manifest; one new content test guards the ramp.

**Tech Stack:** Markdown SSOT + gray-matter (`build.mjs`), jest (content), npm workspaces.

**Spec:** `docs/superpowers/specs/2026-06-04-arc2-rebalance-design.md`. **Branch:** `feat/arc2-rebalance` (spec committed).

**Plan-author decision (deviation from spec):** filenames are **kept** (no rename). The mission `id` comes from frontmatter `mission_id` (transmission) / filename prefix `R-NN` (solution), so re-theming in place keeps `chapters.ts`, briefing `links_to`, and the briefing wikilink valid with **zero** path-wiring edits — much lower risk. The stale filename (`…Frequency_Match.md` holding a visual-block mission) is an internal-only wart; the player sees the frontmatter `title`. Counts are unchanged.

**Conventions:** never hand-edit `src/generated/*` — edit source + `npm run build:content` (CI content-gate enforces sync); the ASCII header block must be **byte-identical** between a mission's transmission and solution; gate green before commits; Conventional Commits ending with `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`.

---

### Task 1: Difficulty ramp + monotonic regression test

Target ramp (monotonic non-decreasing): R-01..04 `1 1 1 2` · R-05..08 `2 2 2 2` · R-09..12 `3 3 3 3` · R-13..16 `3 3 4 4` · R-17..20 `4 4 4 4` · R-21..24 `5 5 5 5`.

Only the missions whose current `difficulty` differs from the target are edited (current→target): **R-03** 2→1, **R-07** 3→2, **R-09** 2→3, **R-13** 2→3, **R-15** 3→4, **R-16** 3→4, **R-17** 3→4, **R-18** 3→4, **R-19** 3→4, **R-20** 3→4, **R-21** 3→5, **R-22** 3→5, **R-23** 3→5, **R-24** 4→5. (R-10 2→3 and R-14 2→3 are set in their re-theme tasks; R-06 stays 2. R-01/02/04/05/06/08/11/12 already match.)

**Files:** the 14 R-* transmission `.md` listed above (under `packages/content/src/content/0{5..10} - …/`); Test: `packages/content/test/content.test.ts`.

- [ ] **Step 1: Write the failing test**

Append to `packages/content/test/content.test.ts` inside the `describe('listMissions', …)` block (it already imports `listMissions`):

```ts
  it('Arc II difficulty is a monotonic non-decreasing ramp', () => {
    const arc2 = [...listMissions('II')].sort((a, b) => a.mission_id.localeCompare(b.mission_id));
    const diffs = arc2.map((m) => m.difficulty ?? 0);
    for (let i = 1; i < diffs.length; i++) {
      expect(diffs[i]).toBeGreaterThanOrEqual(diffs[i - 1]);
    }
    expect(diffs[0]).toBe(1);
    expect(diffs[diffs.length - 1]).toBe(5);
  });
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npm test --workspace @neurovim/content`
Expected: FAIL — current difficulties dip (e.g. R-12=3 then R-13=2) and the last is 4, not 5.

- [ ] **Step 3: Edit the 14 difficulty lines**

In each file, change the single `difficulty:` frontmatter line (the value is unique within its file). Exact files + edits:

| File | Change |
|---|---|
| `content/05 - Literal Frequencies/R-03-TRANSMISSION-Trace_Purge.md` | `difficulty: 2` → `difficulty: 1` |
| `content/06 - Wildcard Protocol/R-07-TRANSMISSION-Lazy_Trace.md` | `difficulty: 3` → `difficulty: 2` |
| `content/07 - Codex Matrix/R-09-TRANSMISSION-Set_Theory.md` | `difficulty: 2` → `difficulty: 3` |
| `content/08 - Anchor Doctrine/R-13-TRANSMISSION-Line_Zero.md` | `difficulty: 2` → `difficulty: 3` |
| `content/08 - Anchor Doctrine/R-15-TRANSMISSION-Boundary_Scan.md` | `difficulty: 3` → `difficulty: 4` |
| `content/08 - Anchor Doctrine/R-16-TRANSMISSION-Full_Anchor.md` | `difficulty: 3` → `difficulty: 4` |
| `content/09 - Capture Operation/R-17-TRANSMISSION-First_Capture.md` | `difficulty: 3` → `difficulty: 4` |
| `content/09 - Capture Operation/R-18-TRANSMISSION-Mirror_Word.md` | `difficulty: 3` → `difficulty: 4` |
| `content/09 - Capture Operation/R-19-TRANSMISSION-Format_Shift.md` | `difficulty: 3` → `difficulty: 4` |
| `content/09 - Capture Operation/R-20-TRANSMISSION-Multi_Group.md` | `difficulty: 3` → `difficulty: 4` |
| `content/10 - Mirror Rewrite/R-21-TRANSMISSION-Global_Strike.md` | `difficulty: 3` → `difficulty: 5` |
| `content/10 - Mirror Rewrite/R-22-TRANSMISSION-Inverse_Delete.md` | `difficulty: 3` → `difficulty: 5` |
| `content/10 - Mirror Rewrite/R-23-TRANSMISSION-Cascade.md` | `difficulty: 3` → `difficulty: 5` |
| `content/10 - Mirror Rewrite/R-24-TRANSMISSION-Project_Mirror.md` | `difficulty: 4` → `difficulty: 5` |

(All under `packages/content/src/`. If a filename differs, find it: `ls "packages/content/src/content/10 - Mirror Rewrite/"`.)

- [ ] **Step 4: Rebuild content + run the test**

Run: `npm run build:content && npm test --workspace @neurovim/content`
Expected: PASS (the new ramp test green; counts unchanged at 9 tests… now 10 with the new `it`).

- [ ] **Step 5: Commit**

```bash
git add "packages/content/src/content" packages/content/src/generated/content.ts packages/content/test/content.test.ts
git commit -m "feat(content): smooth Arc-2 difficulty into a monotonic 1->5 ramp

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Re-theme R-06 → Visual-block ("Column Strike")

**Files (overwrite in place — keep names):**
- `packages/content/src/content/06 - Wildcard Protocol/R-06-TRANSMISSION-Frequency_Match.md`
- `packages/content/src/solutions/R-06-SOLUTION-Frequency_Match.md`
- `packages/content/src/content/06 - Wildcard Protocol/R-06-BRIEFING-Frequency_Match.md`

- [ ] **Step 1: Overwrite the transmission**

`R-06-TRANSMISSION-Frequency_Match.md`:

`````md
---
mission_id: R-06
title: "Column Strike"
tier: "🔵 ARC II"
xp_reward: 25
completed: false
difficulty: 2
category: visual-block
par_keystrokes: 14
mission_type: practice
locked: true
unlock_requirement: "Level 6"
tags:
  - vim/visual-block
  - arc2
  - arc2-ch6
sticker: lucide//columns-3
color: "#ff6600"
summary: "[LOCKED] CORP wedged a status column into the relay grid. A pattern can't carve a column — drop into visual-block and strike it out."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP RELAY GRID — COLUMN INJECTION                              ║
║  Document       : Aligned node table // bogus status column      ║
║  Timestamp      : 2047-05-11 // 09:30                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Processing note
> The `X | ` column is the same width on every row. `Ctrl-V` selects a block down the column, then `d` deletes it in one strike. No pattern needed.

---

NODE | X | alpha online
NODE | X | bravo online
NODE | X | charlie online
NODE | X | delta online
NODE | X | echo online
`````

- [ ] **Step 2: Overwrite the solution** (header byte-identical; the `X | ` column removed)

`R-06-SOLUTION-Frequency_Match.md`:

`````md
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  CORP RELAY GRID — COLUMN INJECTION                              ║
║  Document       : Aligned node table // bogus status column      ║
║  Timestamp      : 2047-05-11 // 09:30                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Processing note
> The `X | ` column is the same width on every row. `Ctrl-V` selects a block down the column, then `d` deletes it in one strike. No pattern needed.

---

NODE | alpha online
NODE | bravo online
NODE | charlie online
NODE | delta online
NODE | echo online
`````

(Diff = remove the 4-char `X | ` block from each row — exactly a visual-block delete. par 14.)

- [ ] **Step 3: Overwrite the briefing** (frontmatter `links_to` + the bottom wikilink stay — filename unchanged)

`R-06-BRIEFING-Frequency_Match.md`:

`````md
---
mission_type: briefing
links_to: "06 - Wildcard Protocol/R-06-TRANSMISSION-Frequency_Match"
locked: true
tags: [briefing, arc2, arc2-ch6]
sticker: lucide//columns-3
color: "#ff6600"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-06 // COLUMN STRIKE             ║
║  Clearance: SIGNAL HUNTER  //  ARC II        ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"Patterns work on text. But some corruption is structural — a whole column wedged into an aligned grid.*
> *`Ctrl-V` is visual-block mode. Move down to extend the selection over the rows, move right to set its width, then operate: `d` deletes the block, `I` inserts before it, `A` appends after it.*
> *CORP slipped a status column into the relay grid. Carve it out in one strike — no substitution will do this cleanly."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Delete the `X | ` column so each row reads `NODE | <name> online`.
>
> > [!tip] SKILLS
> > `Ctrl-V` (visual-block) → select the column down all rows → `d`
>
> > [!success] +25 XP
>
> → **[[_content/06 - Wildcard Protocol/R-06-TRANSMISSION-Frequency_Match|R-06-TRANSMISSION-Frequency_Match]]** — open to begin. Timer starts on file open.
`````

- [ ] **Step 4: Rebuild + gate**

Run: `npm run build:content && npm run typecheck && npm test`
Expected: green (counts unchanged; ramp test still green).

- [ ] **Step 5: Commit**

```bash
git add "packages/content/src/content/06 - Wildcard Protocol/R-06-TRANSMISSION-Frequency_Match.md" "packages/content/src/content/06 - Wildcard Protocol/R-06-BRIEFING-Frequency_Match.md" packages/content/src/solutions/R-06-SOLUTION-Frequency_Match.md packages/content/src/generated/content.ts
git commit -m "feat(content): re-theme R-06 into a visual-block drill (Column Strike)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Re-theme R-10 → Macro ("Echo Chamber")

**Files (overwrite in place):**
- `packages/content/src/content/07 - Codex Matrix/R-10-TRANSMISSION-Digit_Sweep.md`
- `packages/content/src/solutions/R-10-SOLUTION-Digit_Sweep.md`
- `packages/content/src/content/07 - Codex Matrix/R-10-BRIEFING-Digit_Sweep.md`

- [ ] **Step 1: Overwrite the transmission**

`R-10-TRANSMISSION-Digit_Sweep.md`:

`````md
---
mission_id: R-10
title: "Echo Chamber"
tier: "🔵 ARC II"
xp_reward: 30
completed: false
difficulty: 3
category: marks-macros
par_keystrokes: 24
mission_type: practice
locked: true
unlock_requirement: "Level 7"
tags:
  - vim/macros
  - arc2
  - arc2-ch7
sticker: lucide//repeat
color: "#ff6600"
summary: "[LOCKED] Five relay lines need the same two edits. Record the fix once as a macro, then echo it down the list."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE RELAY ROSTER — BULK REFORMAT                         ║
║  Document       : Relay status list // same edit, every line     ║
║  Timestamp      : 2047-05-19 // 06:30                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Processing note
> Each line needs the same two edits: comment it with `# ` and flip `active` to `[OK]`. Record it once with `qa … q`, then replay with `@a` down the rest.

---

relay alpha active
relay bravo active
relay charlie active
relay delta active
relay echo active
`````

- [ ] **Step 2: Overwrite the solution** (header byte-identical)

`R-10-SOLUTION-Digit_Sweep.md`:

`````md
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE RELAY ROSTER — BULK REFORMAT                         ║
║  Document       : Relay status list // same edit, every line     ║
║  Timestamp      : 2047-05-19 // 06:30                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Processing note
> Each line needs the same two edits: comment it with `# ` and flip `active` to `[OK]`. Record it once with `qa … q`, then replay with `@a` down the rest.

---

# relay alpha [OK]
# relay bravo [OK]
# relay charlie [OK]
# relay delta [OK]
# relay echo [OK]
`````

(Diff per line = prepend `# ` + change `active`→`[OK]` — two edits, identical on each line, i.e. a macro. par 24.)

- [ ] **Step 3: Overwrite the briefing**

`R-10-BRIEFING-Digit_Sweep.md`:

`````md
---
mission_type: briefing
links_to: "07 - Codex Matrix/R-10-TRANSMISSION-Digit_Sweep"
locked: true
tags: [briefing, arc2, arc2-ch7]
sticker: lucide//repeat
color: "#ff6600"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-10 // ECHO CHAMBER              ║
║  Clearance: PROTOCOL READER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"When every line needs the same multi-step edit, don't repeat yourself — record yourself.*
> *`qa` starts recording into register a. Do the edit on the first line, end with the cursor on the next line, then `q` to stop. Now `@a` replays it; `@@` repeats the last replay; `4@a` runs it four times.*
> *Five relay lines, the same two edits each. Record once. Echo down."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Make each line read `# relay <name> [OK]` (prefix `# `, change `active` to `[OK]`).
>
> > [!tip] SKILLS
> > `qa` `I# `<Esc> `$` `ciw[OK]`<Esc> `0j` `q` — then `4@a`
>
> > [!success] +30 XP
>
> → **[[_content/07 - Codex Matrix/R-10-TRANSMISSION-Digit_Sweep|R-10-TRANSMISSION-Digit_Sweep]]** — open to begin. Timer starts on file open.
`````

- [ ] **Step 4: Rebuild + gate**

Run: `npm run build:content && npm run typecheck && npm test`
Expected: green.

- [ ] **Step 5: Commit**

```bash
git add "packages/content/src/content/07 - Codex Matrix/R-10-TRANSMISSION-Digit_Sweep.md" "packages/content/src/content/07 - Codex Matrix/R-10-BRIEFING-Digit_Sweep.md" packages/content/src/solutions/R-10-SOLUTION-Digit_Sweep.md packages/content/src/generated/content.ts
git commit -m "feat(content): re-theme R-10 into a macro drill (Echo Chamber)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Re-theme R-14 → Register ("Dead Drop")

**Files (overwrite in place):**
- `packages/content/src/content/08 - Anchor Doctrine/R-14-TRANSMISSION-Tail_Mark.md`
- `packages/content/src/solutions/R-14-SOLUTION-Tail_Mark.md`
- `packages/content/src/content/08 - Anchor Doctrine/R-14-BRIEFING-Tail_Mark.md`

- [ ] **Step 1: Overwrite the transmission**

`R-14-TRANSMISSION-Tail_Mark.md`:

`````md
---
mission_id: R-14
title: "Dead Drop"
tier: "🔵 ARC II"
xp_reward: 30
completed: false
difficulty: 3
category: registers
par_keystrokes: 30
mission_type: practice
locked: true
unlock_requirement: "Level 8"
tags:
  - vim/registers
  - arc2
  - arc2-ch8
sticker: lucide//clipboard-copy
color: "#ff6600"
summary: "[LOCKED] One master key, four empty slots. Yank the key into a named register once, then drop it into every slot."
---
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE KEY DISTRIBUTION — DEAD DROP                         ║
║  Document       : Master key + empty slots // fill all slots     ║
║  Timestamp      : 2047-05-26 // 05:44                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Processing note
> Yank the key into a named register so later edits can't clobber it: `"ayiw` on the key, then `"ap` to drop it into each slot. The unnamed register would be overwritten the moment you delete a placeholder — a named register survives.

---

MASTER KEY: K7741

slot one: ____
slot two: ____
slot three: ____
slot four: ____
`````

- [ ] **Step 2: Overwrite the solution** (header byte-identical)

`R-14-SOLUTION-Tail_Mark.md`:

`````md
```ascii
╔══════════════════════════════════════════════════════════════════╗
║  RESISTANCE KEY DISTRIBUTION — DEAD DROP                         ║
║  Document       : Master key + empty slots // fill all slots     ║
║  Timestamp      : 2047-05-26 // 05:44                           ║
╚══════════════════════════════════════════════════════════════════╝
```

> [!note] CIPHER — Processing note
> Yank the key into a named register so later edits can't clobber it: `"ayiw` on the key, then `"ap` to drop it into each slot. The unnamed register would be overwritten the moment you delete a placeholder — a named register survives.

---

MASTER KEY: K7741

slot one: K7741
slot two: K7741
slot three: K7741
slot four: K7741
`````

(Diff = replace each `____` with `K7741`, copied from the master line — yank-to-named-register then paste ×4. par 30.)

- [ ] **Step 3: Overwrite the briefing**

`R-14-BRIEFING-Tail_Mark.md`:

`````md
---
mission_type: briefing
links_to: "08 - Anchor Doctrine/R-14-TRANSMISSION-Tail_Mark"
locked: true
tags: [briefing, arc2, arc2-ch8]
sticker: lucide//clipboard-copy
color: "#ff6600"
---

```ascii
╔══════════════════════════════════════════════╗
║  INCOMING — CIPHER                           ║
║  BRIEFING: R-14 // DEAD DROP                 ║
║  Clearance: PATTERN BREAKER  //  ARC II      ║
╚══════════════════════════════════════════════╝
```

> [!quote] CIPHER
> *"The unnamed register is a single clipboard — every delete and yank overwrites it. When you need a value to survive a sequence of edits, name it.*
> *`"ayiw` yanks the inner word into register a. `"ap` pastes from register a. Register a holds until you yank into it again — paste it as many times as you like.*
> *One master key, four dead drops. Yank once, drop it everywhere."*


> [!abstract] DIRECTIVE
> > [!warning] OBJECTIVE
> > Fill every `____` with the master key `K7741`.
>
> > [!tip] SKILLS
> > `"ayiw` on the key → on each slot `cw`<Esc> then `"ap` (or replace `____` and paste from register a)
>
> > [!success] +30 XP
>
> → **[[_content/08 - Anchor Doctrine/R-14-TRANSMISSION-Tail_Mark|R-14-TRANSMISSION-Tail_Mark]]** — open to begin. Timer starts on file open.
`````

- [ ] **Step 4: Rebuild + gate**

Run: `npm run build:content && npm run typecheck && npm test`
Expected: green.

- [ ] **Step 5: Commit**

```bash
git add "packages/content/src/content/08 - Anchor Doctrine/R-14-TRANSMISSION-Tail_Mark.md" "packages/content/src/content/08 - Anchor Doctrine/R-14-BRIEFING-Tail_Mark.md" packages/content/src/solutions/R-14-SOLUTION-Tail_Mark.md packages/content/src/generated/content.ts
git commit -m "feat(content): re-theme R-14 into a register drill (Dead Drop)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Full gate

- [ ] **Step 1: Run the full gate**

Run: `npm run typecheck && npm test && npm run build:web`
Expected: typecheck clean; all tests green (content gains the ramp test → 182 total); web build `✓ built`.

- [ ] **Step 2: Confirm generated content is in sync**

Run: `npm run build:content && git diff --exit-code -- packages/content/src/generated`
Expected: no diff.

- [ ] **Step 3: Confirm working tree clean**

Run: `git status --short`
Expected: empty.

---

## Self-Review

**Spec coverage:**
- Difficulty curve → monotonic ramp → Task 1 (14 edits + the 2 variety set in Tasks 3/4; R-06 stays 2) ✓
- Three variety missions (visual-block R-06, macro R-10, register R-14) → Tasks 2/3/4 ✓
- No renumber; ids/wiring intact → kept filenames (deviation noted), `mission_id`/`chapters.ts`/`links_to` unchanged ✓
- Cheatsheet no change → not touched (categories `visual-block`/`marks-macros`/`registers` already exist; the missions reference them) ✓
- Monotonic-ramp regression test → Task 1 Step 1 ✓
- Counts unchanged → only `difficulty`/content/category edited; no add/remove ✓

**Placeholder scan:** none — full file contents + exact difficulty edits given.

**Type consistency:** categories used (`visual-block`, `marks-macros`, `registers`) match existing cheatsheet ids (verified). Each transmission's ASCII header is byte-identical to its solution's. `par_keystrokes`/`difficulty` are numbers (flow through `toSummary` since the par-tiers cycle). The ramp test reads `m.difficulty` (number|undefined → `?? 0`) and asserts 1…5 endpoints, matching the Task-1 ramp + the variety difficulties (R-06=2, R-10=3, R-14=3).
