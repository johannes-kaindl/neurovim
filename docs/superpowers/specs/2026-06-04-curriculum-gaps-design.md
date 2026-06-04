# Curriculum Gaps — Global Commands (`:g`) — Design Spec

> **Date:** 2026-06-04 · **Status:** approved (brainstorm), pending implementation plan
> **Goal:** close the highest-value teachable curriculum gap — Vim's global command
> (`:g`/`:v`/`:g//normal`) — with one new KATA. Folding, jumps, and marks are deliberately
> left out: they don't change text, so the current gameplay verb can't validate them.

## Constraint that scopes this (locked during brainstorm)

The single gameplay verb is "fix corrupted text, diff the edited buffer against a
solution." A skill is only teachable if using it produces a **text** change the diff can
see:

| Gap | Changes text? | Decision |
|---|---|---|
| ex-commands `:g`/`:v`/`:g//normal` | yes (`:g/pat/d`, `:g/pat/normal …`) | **Teach it — 1 KATA** |
| marks (`m`/`` ` ``) | no (navigation) | Out — only indirectly teachable; weak |
| folding (`zf`/`za`) | no (view-only) | Out — needs a new gameplay verb |
| jumps/changelist (`Ctrl-O`/`g;`) | no (navigation) | Out — needs a new gameplay verb |

## The KATA — KATA-14 "Dragnet"

- `category: ex-commands` (matches the existing cheatsheet category id, so the float
  works), `difficulty: 3`, `xp_reward: 10`, hand-tuned `par_keystrokes` (~14, the cost of
  one `:g/TRACE/d`).
- **Drill:** a log of interleaved `[OK]` and `[TRACE]` lines; delete every `[TRACE]` line so
  only the `[OK]` lines remain. Enough scattered matches (5) that `:g/TRACE/d` clearly beats
  manual `dd`s — par is set to the `:g` solve so the technique earns gold.
- **Files** (KATAs have no briefing): `packages/content/src/content/KATAS/KATA-14-TRANSMISSION-Dragnet.md`
  (frontmatter + ASCII header + start log) + `packages/content/src/solutions/KATA-14-SOLUTION-Dragnet.md`
  (target, header byte-identical). The transmission's CIPHER note teaches `:g`, and
  mentions `:v` (invert) and `:g/…/normal` (run a command on matches).
- **No `par`/playtest dependency on the user** (spoiler avoidance): par from keystroke
  analysis of the optimal solve.

## Wiring

- `packages/core/src/data/chapters.ts` → append a `KATA-14` entry to the `KATAS` array
  (mirror KATA-12/13 shape; `category: 'ex-commands'`, `xp_reward: 10`, `difficulty: 3`).
- `packages/core/src/data/levels.ts` `UNLOCK_MAP` → add `KATA-14` to level **6** (a
  power skill, alongside Arc 2's start).
- Cheatsheet: **no change** (`ex-commands` category with GLOBAL + RANGES groups exists).

## Testing

- `content.test.ts` counts: entries 163 → **165**, `kata` 13 → **14**, `solution` 52 →
  **53**, `listMissions().length` 53 → **54**. (One KATA = one `kata` entry + one
  `solution` entry.)
- `build:content` regenerates + committed. Gate green: `npm run typecheck && npm test &&
  npm run build:web` (182 → 183).

## Out of scope (YAGNI)

- Folding / jumps / marks — not teachable via the text-diff verb. Documented here as a
  candidate for a future cycle that would add a new gameplay verb (e.g. "reach position X
  in ≤ N keystrokes") to make navigation skills measurable.
- The v0.2.3 release (separate step after this content ships).
