---
paths:
  - "package.json"
  - "eslint.config.mjs"
  - "tsconfig.base.json"
  - "packages/*/jest.config.cjs"
  - "packages/*/tsconfig*.json"
  - "packages/adapter-web/vite.config.ts"
  - "scripts/lib/load-ts.mjs"
  - "scripts/gen-manual.mjs"
  - "scripts/generate-kata.mjs"
---

# Build and test configuration

Moved verbatim from AGENTS.md (CORE-AGENT-15); this file loads when a session reads a matching file.

- **Preact alias is load-bearing:** any *new* build/test config (jest project,
  esbuild target, vite preset) must map `react`/`react-dom` → `preact/compat`,
  or you get cryptic hook/JSX type errors far from the actual cause.

- **`esbuild` is a *root* devDependency, and must stay one:** `gen-manual.mjs` and
  `generate-kata.mjs` transpile core TS for node, and neither is part of `npm test` — losing
  the dependency breaks them silently (it happened once; see `docs/dev/explanation/decisions.md`).
  Since 2026-10-08 `scripts/lib/load-ts.mjs` carries the loader, and the export and conformance tests load it, so `npm test` now fails loudly without esbuild; `generate-kata.mjs` still has its own transpile step.

**Test distribution:** spread across `core` (by far the largest), `content`,
`adapter-web`, plus the `node --test` suite for `scripts/lib/` — exact counts drift,
read them off `npm test`.
`adapter-web` covers the WebStorage persistence layer + the submit-flow
progression contract (fake-indexeddb, no UI/CM6 rendering — those stay verified via
dev server + typecheck).
