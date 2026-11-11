---
paths:
  - "packages/adapter-web/src/**"
  - "packages/adapter-web/vite.config.ts"
  - "scripts/capture-screenshots.mjs"
  - "docs/screenshots/**"
  - "docs/dev/reference/design-tokens.md"
  - "docs/dev/explanation/cipher-uplink.md"
---

# Web app: styling, bundle budget, screenshots, local LLM reach

Moved verbatim from AGENTS.md (CORE-AGENT-15); this file loads when a session reads a matching file.

- **CSS via tokens:** all web styles in `adapter-web/src/styles.css`, driven by the
  `--nv-*` variables (six canonical + additive tokens). New colors as a `:root`
  variable, never inline hex (see `docs/dev/reference/design-tokens.md`). The bundled monospace is
  self-hosted JetBrains Mono (`src/fonts/`, exposed as `--nv-mono`).
- **Bundle budget (web):** code-split (initial **411 KB / 123 KB gzip**, measured 2026-10-14 from the Vite build report, whose kB count characters, not bytes — the file is 456 kB on disk; CM6 ~411 KB lazy;
  `marked` ~43 KB lazy). No heavy visual deps; prefer CSS motion over JS libs. Any new
  dependency must justify its weight and ideally be lazy-loaded. **Read the number off a
  build, do not trust this line** — it has drifted before (`docs/dev/explanation/decisions.md`).

- **Screenshot capture needs system Chrome:** `npm run capture:screenshots` drives the
  installed Google Chrome via `playwright-core` `channel:'chrome'` (no bundled browser).
  It overwrites `docs/screenshots/*` with a **seeded, populated** Story-Mode state (level
  6), not a fresh save — change the seed in `scripts/capture-screenshots.mjs` to alter
  what renders. Use `--no-build` to reuse the current `dist/` while iterating.

- **A deployed HTTPS page *can* reach `http://localhost` — but only past the browser's Local
  Network Access prompt** (Chrome, Firefox). Mixed content is not the blocker; Safari has no
  path at all. The `Access-Control-Allow-Private-Network` header is dead here, and CDP
  `Browser.grantPermissions` does **not** satisfy the network check — a test trusting it
  measures a false negative. Every refusal surfaces as `TypeError: Failed to fetch`, which
  `WebLlm` answers with `refusalHint` instead of a retry. Measure against the app path, not
  the deploy root (the root sends a CSP the app does not). Full measurements (2026-08-21):
  `docs/dev/explanation/cipher-uplink.md`.
