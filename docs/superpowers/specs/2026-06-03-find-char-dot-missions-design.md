# find-char + dot KATAs — Design Spec

> **Date:** 2026-06-03 · **Status:** approved (brainstorm), pending implementation plan
> **Goal:** close a systemic learning gap — the `f`/`F`/`t`/`T`/`;`/`,` find-char motions
> and the `.` (dot) repeat command are currently taught in **zero** missions, and
> find-char is absent from the cheatsheet. Add two appended KATAs that drill them, wired
> to surface early. From the 2026-06-03 next-steps audit.

## Decisions (locked during brainstorm)

| Question | Decision |
|---|---|
| Mechanism | **Two new KATAs** (free drills, no story arc), appended — no renumbering |
| Which skills | KATA-12 = find-char (`f/F/t/T/;/,`); KATA-13 = dot (`.`, reinforcing find-char) |
| Placement | Appended as KATA-12 / KATA-13; unlocked early via `UNLOCK_MAP` (L2 / L3) |
| Cheatsheet | Add a **FIND CHAR** group to `NAVIGATION`. Dot is already present (FUNDAMENTALS → EDIT → `.`) |
| Par | Hand-set `par_keystrokes` overrides, calibrated so the f/t- resp. dot-solve earns gold |
| Scope | find-char/dot only; **Story-Mode** (progressive web unlock) and **Arc-2 rebalance** are separate later cycles |

## Why KATAs (not story missions)

Find-char belongs pedagogically *early* (intra-line navigation, around M-03/M-04) and dot
*after* operators (M-05). Inserting story missions mid-sequence would force renumbering
M-04…M-16 + all R-* + KATAs + `UNLOCK_MAP` + `chapters.ts` + every solution file — exactly
what the audit warned against. KATAs are self-contained free drills with no chapter
sequence, so they append cleanly (KATA-12/13) yet can be **unlocked early** via
`UNLOCK_MAP`, surfacing when the skill is relevant. This is also forward-compatible with a
future **Story-Mode** (progressive web unlock): once web gating is on, these KATAs appear
at L2/L3 instead of immediately.

## Content (authoring format mirrors KATA-01…11)

Each KATA = a transmission (start text) + a solution (target). No briefing. Diff validates
the edited transmission body against the solution body.

- `packages/content/src/content/KATAS/KATA-12-TRANSMISSION-Target_Lock.md`
- `packages/content/src/solutions/KATA-12-SOLUTION-Target_Lock.md`
- `packages/content/src/content/KATAS/KATA-13-TRANSMISSION-Echo.md`
- `packages/content/src/solutions/KATA-13-SOLUTION-Echo.md`

**KATA-12 — "Target Lock"** (`category: navigation`, `difficulty: 1`, `xp_reward: 10`):
intra-line precision. ~6 lines, each with one stray target character at a non-trivial
column whose efficient fix is `f<char>` / `t<char>` (+ `;`/`,` to re-hit) rather than
`h`/`l` spam. Example pattern (final text in the plan):
```
relay node alpha#7 online   →   relay node alpha7 online
```
(land on `#` with `f#`, delete with `x`; `j` to next line). `summary` in the light
"no story, just precision" KATA tone.

**KATA-13 — "Echo"** (`category: editing`, `difficulty: 2`, `xp_reward: 10`): the dot
command. ~6 identical repeated glitches whose optimal solve is *make the change once, then
repeat with `.`* — ideally combined with find-char (`f<char>` → operator → `;` `.`).
Example pattern:
```
purge CORP_ from each tag: CORP_alpha CORP_beta …  →  alpha beta …
```
(first deletion via an operator, then `.` repeats; `;` re-finds). Reinforces KATA-12.

Frontmatter follows the existing KATA shape (`mission_id`, `title`, `tier: "⬛ KATA"`,
`xp_reward`, `difficulty`, `category`, `tags`, `sticker`, `color`, `summary`,
`mission_type: practice`, `locked: true`) **plus** `par_keystrokes` (see below).

## par_keystrokes (showcases the v0.2.2 tier mechanic)

Both KATAs get a hand-tuned `par_keystrokes` override so the intended technique earns
**gold** and brute force only bronze (tiers from `ParTier`: gold ≤ par, silver ≤ par×1.5,
bronze ≤ par×2.5). Starting values (finalized by playtest in the plan): KATA-12 ≈ **22**,
KATA-13 ≈ **16**. These are deliberately reachable with the f/t- resp. dot-solve.

## Wiring

- `packages/core/src/data/chapters.ts` → two entries appended to the `KATAS` array
  (id/title/path/solution_path/corrupted_path/category/xp_reward/difficulty), mirroring
  KATA-01…11. (`corrupted_path` follows the existing pattern even though those files are
  not present — Obsidian-reset detail, web-first.)
- `packages/core/src/data/levels.ts` `UNLOCK_MAP` → add `KATA-12` to level **2**, `KATA-13`
  to level **3**. (Web is currently all-unlocked, so both show immediately; gating only
  affects Obsidian today and the future Story-Mode.)
- `packages/core/src/data/cheatsheet.ts` → add a **FIND CHAR** group to the `NAVIGATION`
  category: `f` (find char forward), `F` (find back), `t` (till before char), `T` (till
  back), `;` (repeat last find), `,` (repeat reversed). Dot stays where it is.

## Testing

- `packages/content/test/content.test.ts` — update the hard-coded counts: total entries
  159 → **163**, `kata` 11 → **13**, `solution` 50 → **52**, `listMissions().length`
  51 → **53**. (Each KATA adds one `kata` entry + one `solution` entry.)
- `npm run build:content` regenerates the manifest (must be committed; the CI content-gate
  enforces it).
- Gate green: `npm run typecheck && npm test && npm run build:web`.

## Out of scope (YAGNI)

- **Story-Mode** (progressive web unlock, locked rows, unlock-on-levelup feedback) — its
  own cycle; this spec only places the KATAs so they slot into it.
- **Arc-2 rebalance** — separate cycle.
- New Obsidian `CORRUPTED` reset files for KATAs (existing KATAs reference them in
  `chapters.ts` but the files don't exist; we mirror the existing pattern, web-first).
- No enforcement of *how* the player solves (the verb stays "fix text, diff against
  solution"); the par-tier rewards the intended technique rather than requiring it.
