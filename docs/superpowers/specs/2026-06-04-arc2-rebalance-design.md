# Arc-2 Rebalance — Design Spec

> **Date:** 2026-06-04 · **Status:** approved (brainstorm), pending implementation plan
> **Goal:** fix Arc 2's two real problems — a flat difficulty plateau and a 100%-regex
> monoculture — without gutting its coherent regex curriculum. Smooth the difficulty
> curve (metadata) and inject three variety missions that teach skills currently taught
> nowhere (visual-block, macros, registers).

## Context (from recon)

Arc 2 = 24 missions (R-01..R-24) across 6 regex-themed chapters (05 Literal Frequencies →
10 Mirror Rewrite), 4 each. All `category: regex`; difficulty clusters at 2–3 (2×d1, 9×d2,
12×d3, 1×d4) — a plateau, not a ramp. It is a *good* regex curriculum (literals →
wildcards → classes → anchors → captures → backrefs); the fix is to vary it, not rewrite
it. The cheatsheet **already** has `marks-macros`, `registers`, and `visual-block`
categories — no cheatsheet changes are needed.

## Decisions (locked during brainstorm)

| Question | Decision |
|---|---|
| Direction | Smooth the difficulty curve **+** inject ~3 variety missions (true Arc-2 rebalance) |
| Variety skills | **Visual-block (R-06), macro (R-10), register (R-14)** — one per mid-arc chapter |
| Constraint | No renumber (Story-Mode `UNLOCK_MAP` + `chapters.ts` reference R-* ids); keep each chapter regex-majority |
| Cheatsheet | No change (categories already exist) |

## 1. Difficulty curve (metadata re-tune)

Re-set the `difficulty:` frontmatter of all 24 R-* to a **monotonic non-decreasing** ramp
(par follows automatically via `defaultParKeystrokes`):

| Chapter | Missions | difficulty |
|---|---|---|
| 05 Literal Frequencies | R-01 R-02 R-03 R-04 | 1 1 1 2 |
| 06 Wildcard Protocol | R-05 R-06 R-07 R-08 | 2 2 2 2 |
| 07 Codex Matrix | R-09 R-10 R-11 R-12 | 3 3 3 3 |
| 08 Anchor Doctrine | R-13 R-14 R-15 R-16 | 3 3 4 4 |
| 09 Capture Operation | R-17 R-18 R-19 R-20 | 4 4 4 4 |
| 10 Mirror Rewrite | R-21 R-22 R-23 R-24 | 5 5 5 5 |

`build:content` regenerates the manifest. No renames for the 21 untouched regex missions.

## 2. Three variety missions (re-theme in place — ids/unlock wiring unchanged)

Each replaces a redundant d2/d3 regex mission with a skill drill, framed in the briefing as
a CIPHER curveball ("the pattern won't crack this — record a macro"). The one gameplay verb
stays "fix text, diff against solution"; the par target rewards the intended technique.

| Slot | New skill | category (cheatsheet float) | difficulty | New title (example) |
|---|---|---|---|---|
| R-06 (ch06) | Visual-block column edit (`Ctrl-V`) | `visual-block` | 2 | Column Strike |
| R-10 (ch07) | Macro record/replay (`qa…q`, `@a`) | `marks-macros` | 3 | Echo Chamber |
| R-14 (ch08) | Named registers (`"ay` / `"ap`) | `registers` | 3 | Dead Drop |

Per slot, rewrite **three files** — transmission (start text designed so the skill is the
efficient solve), solution (target), briefing (re-framed) — set `category` + `difficulty`
+ a hand-tuned `par_keystrokes`, **rename** the files to the new theme, and update the
references: `chapters.ts` (path / briefing_path / solution_path for that R-*) and the
briefing's `links_to` frontmatter. Mission `id` (R-06/R-10/R-14) stays, so `UNLOCK_MAP`,
the Story-Mode gating, and chapter membership are untouched. Each chapter keeps 3 regex + 1
variety twist.

## 3. Tests

- Counts are unchanged (same number of transmissions/solutions/briefings — only renamed +
  re-categorized), so the existing `content.test.ts` counts stay green.
- Add one assertion to `content.test.ts`: Arc 2 (`listMissions('II')` sorted by id) has a
  **non-decreasing** `difficulty` sequence — a regression guard for the smoothed curve.
- Gate green: `npm run typecheck && npm test && npm run build:web` (181 → 182).

## Out of scope (YAGNI)

- No renumbering; no change to the other 21 regex missions beyond `difficulty`.
- marks / folding / ex-range / jumps drills — a later cycle.
- No cheatsheet changes (the 3 skills are already documented).
- No new mechanics — the verb stays text-diff; par rewards the technique, doesn't enforce it.
