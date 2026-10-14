# Explanation — Decisions and observations

> **Diátaxis: Explanation.** Settled questions that look open from the outside, and
> field observations that shaped a rule. Each entry says what was decided, why, and
> what it costs. The rules themselves live in [`AGENTS.md`](../../../AGENTS.md); the
> earlier decision log (D1–D26) lives outside this repo.

## `RunTimer` stays in the consumer

*Decided 2026-09-02.*

`RunTimer` — the pausable mission clock in the Obsidian plugin — passes the three-part
[back-flow test](upstream-contract.md#the-back-flow-rule) on its face: it needs no
Obsidian API, and a second consumer might want it. It stays in the consumer anyway.

**Pausing answers a platform property, not a game rule.** In Obsidian the player
necessarily navigates away from the mission note, which is why v0.7.0 of the plugin
built the pause lifecycle. In the web app the mission fills the page and that trigger
does not exist. Hoisting the timer would install a mechanic in the web target that
nothing there asks for.

The price is explicit rather than silent: **best times are not comparable across
targets.** Whoever builds score export (slice C) or tournaments (slice E) must
normalise times or keep the leaderboards separate. With this settled, the back-flow
queue is empty.

## `MissionGenerator` stage 2 is deferred

*Decided 2026-09-02.*

`MissionGenerator` generates KATA drills with a language model. Stage 1 is the
authoring tool: it asks the model for a clean document plus reversible corruptions and
lets `GlitchEngine` derive the exercise, so solvability is *constructed* rather than
checked; drafts land in `packages/content/src/_drafts/` and reach the content only by
hand. Stage 2 would generate missions at runtime, for players.

The question came one step too early; it is not merely missing a retry policy. At
roughly 50 % success per attempt and a cap of three attempts, about one player in
eight would meet a refusal — for a feature that solves a problem nobody has, since 54
authored missions exist. Stage 1 already carries the value.

**Precondition for revisiting: new glitch types.** Only five of the ten glitch
categories can be generated today, and `regex` — 26 of the 54 missions — is not among
them. Raise that ceiling first, then ask again what a player sees when generation
fails.

## Level thresholds follow one pass

*Decided 2026-10-14.*

The level table was written once, for the first six levels, and never revisited. Levels 2 to 6 sit close to the story XP that opens below them (65, 185, 405, 585 and 745 XP against thresholds of 66, 186, 371, 601 and 800), so a player who plays the story plus some KATAs levels up on time. From level 7 on, the table that arrived with `9dbd127` (1150, 1550, 2000, 2500) has no recorded reasoning and did not follow that pattern: story plus KATAs, each mission once, ended at level 6 with 955 XP, and R-09 to R-24 needed about 600 XP of replays before the last levels opened. A player who has done everything once was told to repeat missions to reach the rest.

The rule is now that **one pass through everything reaches level 10**; replaying earns XP as a bonus and is never a wall. Levels 7 to 10 need 900, 1150, 1300 and 1500 XP, and the 54 missions together are worth 1555. The story missions available before level 7 add up to 845 XP, which is below the 900 for level 7, so the KATAs (110 XP below level 7) are part of the way and not an optional side road. That is intended: the drills are where the keys get practised.

A content gate plays the curriculum once, always taking every mission that is open, and fails unless every mission unlocks and the top level is reached. A second gate keeps the level tables in both quick references equal to `LEVELS` — the player-facing copy of a table drifts the moment nobody compares it (CORE-META-16). The price: the conformance vectors for the progression functions changed, so a data consumer sees the new table only after it re-vendors them.

## Lines align along an LCS

*Decided 2026-10-14.*

`getDiff` used to compare line *i* with line *i*. An inserted or deleted line therefore made every following line count as corrupted: `check` reported the rest of the document, and `reveal` marked it. 13 of the 54 missions change their line count while being solved, so in a quarter of the game the check was loudest exactly when the player was almost done.

Lines are now aligned along a **longest common subsequence**, and `lines_off = max(n, m) − LCS`. The alignment is deterministic, because every port has to produce the same marks: match the common prefix, then the common suffix over what the prefix left, then build a suffix-LCS table over the middle; on a tie the current line is dropped before a solution line is added. The full rule is in the [conformance README](../../../packages/core/conformance/README.md).

**Prefix and suffix are stripped before the table, prefix first, because the table alone is ambiguous in ways a player sees.** Take the current lines `a`, `b` against the solution lines `b`, `b`. A plain table ties and drops `a`, matches the current `b` with the *first* solution `b`, and the second solution `b` becomes an added line at the end: two lines are marked, although only one is wrong. Stripping the common suffix first keeps the last `b` where it is and marks only the first line. The order of the two strips is part of the rule as well: the current lines `a`, `b`, `a` against the solution `a` mark lines 1 and 2 (counting from 0) when the prefix goes first, and lines 0 and 1 when the suffix does — same count, different lines. A port that matched the suffix first passed every vector until one pinned the order (`prefix before suffix on repeated lines`), so the vectors now carry that case and a counter-check for each way to get it wrong (suffix first, no limit, the limit applied at `>=`).

**The table is capped at 250 000 cells** (`LCS_CELL_LIMIT`, 500 × 500 lines of the middle). The table costs O(n·m) time and memory, and the text under check is whatever the player has in the editor: a huge pasted text would freeze `check` and `reveal`. An automated security review found the gap. Past the cap the middle is not aligned: every current line is dropped, then every solution line is added. A mission stays far below it (solutions are under about 100 lines), and a player who has pasted a wall of text is not in a state where the fine alignment matters.

## Par comes from blind reference runs

*Decided 2026-10-14.*

Par used to be authored — a number someone judged right, with no one ever playing the route. For this release every mission got a reference run instead: an agent solved it **blind**, from the transmission, the briefing and the objective only, with the keys taught up to that mission, in real Neovim through `npm run par` ([how-to](../how-to/measure-par.md)). The key count is the plugin's own (`:help neurovim-keys`), so it equals what a player sees in the winbar. **Par is that count rounded up to a multiple of 5**, so the reference run itself reaches gold.

Every run gets its own Neovim process. In one shared process a macro recorded by an earlier run stayed in its register, and a later run replaying it ended one line off after 7 keys where a fresh player ends 11 off — par measured cheaper than anyone pays. The self-test replays that case.

The runs live in `packages/content/par/reference-runs.json`, and a content gate ties every par to its run (the mission's par equals the run's count rounded up, and the run's recorded par equals the mission's). The gate does not replay the runs, though — `npm test` has no Neovim — so it cannot see a changed transmission or solution: after such a change, re-run `npm run par` on the mission's reference run and update the run and the par if the count moved. A content-hash guard (a hash of the mission text stored with each run, compared by the gate) would make a stale run visible; it is a possible follow-up, not built. The blind runs doubled as the derivability replay for this release's content changes: they found M-04 teaching no cut or put, KATA-14 recommending a pattern that also deletes its own heading, and R-14 declaring the wrong unlock level.

Two rules decide the awkward cases. **Where the briefing's route is longer than a shortcut taught so far, par prices the briefing's route** — generous, never unreachable: a mission that asks for a route must not set a par only a cleverer route reaches. **M-11 prices retyping (295 keys)**, because the split-pane route its briefing names does not exist in the web app; the objective names the values, so retyping them is the one route that exists in every target. Two measured pars deviated by more than 25 % from their authored value and went to the maintainer instead of being overwritten; both were decided for the run on 2026-10-14. **R-06 takes 10** (measured 9, authored 14): the run is the briefing's own block delete, and nothing recorded why 14 was chosen. **R-14 takes 45** (measured 45, authored 30): 45 is the honest price of the register route the briefing teaches. `:%s/____/K7741/` solves R-14 in 16 keys without touching a register, so under 30 gold was in practice reachable only by skipping the lesson; that bypass is a content issue for the mission, not a reason to lower par. `PAR_APPROVED` in the gate stays as the place for a future exception and is empty.

## Navigation skills need a new gameplay verb

The single verb of the game is "fix the text, diff against the solution". Skills that
do not change text — folding, jumps, marks as navigation — cannot be expressed in it,
which is why they are not first-class missions. Teaching them is a design problem
(a new verb), not a content problem (more missions).

## The GitHub mirror and release tags

*Observed 2026-08-19 to 2026-09-02.*

Desktop installers are built only by GitHub Actions, so a release tag has to reach the
`github` remote; pushing it to `git.jkaindl.de` alone builds nothing. The assumption
used to be that no automatic mirror existed. Observations disagreed:

- Three times (2026-08-19 twice, 2026-08-21 `a5d2e90`), `github/main` already carried a
  commit at the first query after `git push origin main` — a Forgejo→GitHub push mirror
  appears to be active.
- It is **not instant**: a fourth push the same day (`a9c34c8`) still showed
  `github/main` behind when checked immediately, while an explicit `git push github
  main` then reported *Everything up-to-date*. A same-second check can mistake lag for
  a dead mirror.
- On 2026-09-02 (`7b14d1f`) `git ls-remote github main` still showed the old sha, and
  the `git push github main` issued right after was *rejected*: `cannot lock ref
  'refs/heads/main': is at 7b14d1f but expected dd1cf2d`. The mirror had landed the
  commit in between. That message names your own sha as already present — it reports
  success, not a conflict.

All of these concern **branches**. Whether the mirror carries **tags** — which is what
the CI needs — is untested. Hence the rule in the
[release how-to](../how-to/release.md): push tags explicitly, check whether they were
already there, and verify with `git ls-remote` instead of re-pushing or forcing.

## The bundle-budget line drifted

The conventions state the web bundle size, and the number is meant to be read off a
build, not trusted. It said `~310 KB` until 2026-09-03, when a measurement against the
parent commit put the untouched bundle at 372 KB; the uplink wiring then added 8.8 KB
(2.9 KB gzip), the smaller half of the gap. A number in prose drifts the moment nobody
re-measures it.

## `esbuild` must stay a root devDependency

`scripts/gen-manual.mjs` and `scripts/generate-kata.mjs` transpile core TypeScript so
Node can import it. `esbuild` used to arrive hoisted from the `adapter-obsidian`
workspace; when that workspace was removed, `npm run build:manual` broke silently,
because neither script is part of `npm test`. A workspace inherits its neighbours'
dependencies only until the neighbour leaves — so the dependency is now declared where
it is used.
