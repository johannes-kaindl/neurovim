---
paths:
  - "packages/core/src/utils/diff.ts"
  - "packages/core/src/utils/time.ts"
  - "packages/core/src/engine/**"
  - "packages/core/src/data/levels.ts"
  - "packages/core/src/types.ts"
  - "packages/core/conformance/**"
  - "packages/content/par/**"
  - "packages/content/export/**"
  - "packages/content/src/content/**"
  - "packages/content/src/solutions/**"
  - "scripts/par/**"
  - "scripts/gen-conformance.mjs"
  - "scripts/gen-export.mjs"
  - "scripts/lib/conformance.mjs"
  - "scripts/lib/export.mjs"
  - "scripts/lib/local-day.test.mjs"
  - "docs/dev/how-to/measure-par.md"
---

# Scoring rules, conformance vectors, par and the local day

Moved verbatim from AGENTS.md (CORE-AGENT-15); this file loads when a session reads a matching file.

- **Rule changes regenerate the conformance vectors:** after changing anything in `utils/diff.ts`, `ProgressionEngine`, `ParTier`, `MissionCompletion`, `MetricsTracker` (`metricsResult`), `data/levels.ts` or `types.ts` (`DEFAULT_PLUGIN_DATA`), run `npm run build:conformance` (and `npm run build:content` for the export) and commit the changed JSON — `npm test` fails on stale vectors, and a data consumer (the Lua port) sees the change only through them. Never hand-edit an `expected` value; cases are inputs, the TS core computes the outputs.
- **A changed mission needs its par run re-measured:** par is the count of the mission's reference run in `packages/content/par/reference-runs.json` (measured with `npm run par`) rounded up to a multiple of 5, and the content gate ties `par_keystrokes` to that run but does not replay it — `npm test` has no Neovim. After changing a mission's transmission or solution, replay its run with `npm run par` and, if the count changes, update the run and `par_keystrokes` together. Procedure: `docs/dev/how-to/measure-par.md`.

- **"Today" from the clock is `localDay()`, and zone probes run under `node --test`:** never `new Date().toISOString().slice(0, 10)` for the player's day — that is the UTC day, a day off after local midnight. A test that switches `process.env.TZ` does nothing in jest (each test file gets a copy of `process.env`), so zone cases live in `scripts/lib/local-day.test.mjs`, behind a guard case that proves the switch took effect.
