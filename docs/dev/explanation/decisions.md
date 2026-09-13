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
