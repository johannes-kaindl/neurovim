# Explanation — The upstream contract

> **Diátaxis: Explanation.** Why this repo is an upstream, what the rules between it
> and its consumers protect, and why the contract gate is built the way it is. The
> procedure lives in [How-to → Vendor the core](../how-to/vendor-the-core.md).

## An upstream, not an app with a library inside

This repository is the source for every NeuroVim target. The **vendor surface** is
`packages/core/src` plus `packages/content/src`; everything else here — the web
adapter, the Tauri project, the scripts — consumes that surface like any other
consumer would. `adapter-web` is not a privileged insider.

That framing matters when a change is convenient in the wrong place. Game logic
written straight into `adapter-web` works for the web app today and is missing from
every other target tomorrow. "The web app is the faster route" is not a reason for
game logic to live there.

## Why consumers vendor instead of installing a package

Consumers such as `neurovim-obsidian` (the Obsidian plugin) copy the surface into their own
tree and pin its origin in a `VENDOR.json`. There is no npm publish in the way. The
pin is the point: a consumer sees an upstream change only when it re-vendors on
purpose, so there is never a window in which an upstream commit breaks a consumer
that did not ask for it.

The one thing that makes vendoring unsafe is editing the copy. An in-place edit is
silently discarded by the next re-vendor — the fix disappears without anyone deciding
it should. Hence the rule: never edit the copy; fix it here and re-vendor.

## The back-flow rule

A capability that starts life in a consumer stays there while it is
**platform-bound**. If it concerns the **game** — rules, content, CIPHER's voice,
progression, scoring — it belongs in the core, and it moves *before* a second consumer
needs it, not after. Moving it after means two implementations have already diverged.

The test is applied in a fixed order, because the order encodes cost:

1. **Does the plugin roof (`obsidian-kit`) already solve it?** Then take it from there.
   Rebuilding kit material into this core is the most expensive mistake available —
   it creates a second truth for something that already has an owner.
2. **Does it work without the Obsidian API?** If not, it stays in the consumer.
3. **Would an nvim or web consumer want the same thing?** If yes, it goes to the
   core, even with only one consumer today.

Two capabilities have made the trip so far: keystroke tracing (`MetricsTracker`
records as well as counts, alongside `RunTrace` and `TraceStore`) and the game-facing
half of the LLM uplink (`LlmPort` plus `CipherUplink`, carrying CIPHER's chat and
debrief). What stayed below is genuinely platform material — transport, SSE, endpoint
resolution, model choice — which the consumer wires into `LlmPort`.

Passing the test is necessary, not sufficient. `RunTimer` passes all three questions
and still stays in the consumer — see [Decisions](decisions.md#runtimer-stays-in-the-consumer).

## Why the gate measures both halves

`scripts/check-consumers.mjs` runs inside `npm test` and checks each registered
consumer for **pin lag** (how far behind upstream its pin is) and **verbatim status**
(whether its copy still matches the source byte for byte). One without the other
misleads: a current pin with an edited copy is broken, and a pristine copy of an
ancient pin is stale.

## The provenance header: the one permitted deviation

Some consumers' sync scripts stamp every copied file with an origin line. That is the
opposite of hand-editing — but a gate that hashes whole files cannot tell the
difference, and reports every stamped copy as violated, blaming the consumer for doing
the right thing. This is not hypothetical: it happened in `code-kit`, which vendored
this very gate, on 2026-09-02, and it sent that session hunting for an edit in the
wrong repository. The Obsidian plugin — then `vim-dojo`, now `neurovim-obsidian` — already stamped its `obsidian-kit` tree.

So a consumer may declare its stamp in `consumers.json`. The declared lines are
**verified against the pattern and then cut off**; the body underneath must still
match byte for byte. They are never skipped unchecked. A blind "ignore line 1" would
let any edit hide in line 1 — a line reading `export const BACKDOOR = 1; // as if it
were a header` is exactly what the gate exists to catch, and it is rejected.

Three properties were measured on 2026-09-02 against a stamped copy of vim-dojo's (now `neurovim-obsidian`)
tree:

- **All or none per consumer.** The declaration says *every* copied file carries the
  stamp. One unstamped file among stamped ones is a violation — a partially stamped
  tree means the sync script did not write it.
- **A broken preamble is its own breach,** reported as such rather than as an edit.
  Conflating the two is what misdirected the `code-kit` session.
- **Without a declaration nothing changes,** byte for byte, error message included.

## The mirror image: this repo vendors `code-kit`

The contract also runs the other way. `adapter-web` consumes `code-kit`, the
domain-free workspace kit, and holds verbatim copies of `web/llm-stream.ts`,
`pure/sse.ts` and `pure/error_body.ts` under `src/vendor/code-kit/`, pinned in
`VENDOR.json`. The same rules apply in reverse — and `code-kit`'s own gate names this
repo and fails on an edited copy, which is what keeps the copies trustworthy.

The `web/` + `pure/` directory split is mirrored on purpose. `llm-stream` imports
`../pure/sse`; keeping the layout means that import resolves unchanged and the copy
stays byte-identical. Flattening the directories would force a rewrite, and a
rewritten copy can no longer be verified.

## Data consumers

A consumer that cannot run TypeScript — the Neovim plugin `neurovim.nvim`, written in Lua so players need no Node — vendors data instead of code: the export (`packages/content/export/neurovim-data.json`, missions and tables from the same sources the web app reads) and the conformance vectors (`packages/core/conformance/`). It re-implements the rules, and its tests must pass every vector.

Two implementations of one rule drift; the only question is how quietly (CORE-META-16). The vectors make it loud: a rule change here changes the vectors, the consumer's next re-vendor brings them in, and its suite turns red until the port follows. Until it re-vendors, the gate shows a stale pin — the same, accepted lag a source consumer has.

The vectors are only worth something if they can tell a right implementation from a wrong one. `scripts/lib/conformance.test.mjs` therefore checks, besides freshness, that every vector file has at least two distinct results and that a constant or plausibly wrong implementation fails (CORE-TEST-13).

The gate measures each consumer over what it copies: the pin lag counts only commits that touch those sources, and only those sources are extracted at the pin. Extracting the whole surface failed at every pin older than a newly added surface path, and the gate reported that as an unreachable pin — it skipped the consumer and stayed green (2026-10-08, caught while adding the two data paths). Only an unreachable pin is a skip now; `scripts/lib/check-consumers.integration.test.mjs` fails when a consumer that is on disk gets skipped.
