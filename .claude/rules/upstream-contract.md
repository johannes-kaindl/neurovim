---
paths:
  - "consumers.json"
  - "CONSUMERS.md"
  - "scripts/check-consumers.mjs"
  - "scripts/lib/consumers.mjs"
  - "scripts/lib/consumers.test.mjs"
  - "packages/adapter-web/src/vendor/**"
  - "packages/core/src/index.ts"
  - "packages/core/src/ports/**"
  - "docs/dev/how-to/vendor-the-core.md"
  - "docs/dev/explanation/upstream-contract.md"
---

# Upstream contract and vendored code-kit

Moved verbatim from AGENTS.md (CORE-AGENT-15); this file loads when a session reads a matching file.

**Back-flow rule.** A capability that originates in a consumer stays there while it is
**platform-bound**. If it concerns the **game** — rules, content, CIPHER's voice,
progression, scoring — it belongs in the core, and it moves *before* a second consumer
needs it. Apply this test in order:

1. **Does the plugin roof already solve it?** (`obsidian-kit`, its `REGISTRY.md`) → take it
   from there, do not rebuild it.
2. **Does it work without the Obsidian API?** → yes: core. No: it stays in the consumer.
3. **Would an nvim or web consumer want the same thing?** → yes: core, even with only one
   consumer today.

Passing the test is necessary, not sufficient — `RunTimer` passes and stays below
(`docs/dev/explanation/decisions.md`).

**Moving a capability up** takes five steps, two of them in the consumer's repo — see
`docs/dev/how-to/vendor-the-core.md`. `npm test` runs `scripts/check-consumers.mjs` (pin
lag + verbatim status per consumer); `npm run check:consumers` regenerates `CONSUMERS.md`.

**The one permitted deviation — a declared provenance header** in `consumers.json`
(`"provenanceHeader": { "lines": 1, "mustMatch": "^// vendored from neurovim-standalone@" }`).
The declared lines are **verified against the pattern, then cut off**; the body must still
match byte for byte. Never skip header lines unchecked. All-or-none per consumer; a broken
preamble is its own breach; without a declaration nothing changes. Reasoning and the
2026-09-02 measurements: `docs/dev/explanation/upstream-contract.md`.

**Two kinds of consumer** (`"kind"` in `consumers.json`): `source` consumers run the vendored core and content as is; `data` consumers vendor `packages/content/export/` and `packages/core/conformance/` and re-implement the rules in their own language, proven by the vectors. Both are checked verbatim against their pin; the pin lag counts only commits that touch what a consumer copies. Reasoning: `docs/dev/explanation/upstream-contract.md`.


## Vendored code-kit

The contract above also runs in the other direction: `adapter-web` is a **consumer of
`code-kit`**, the domain-free workspace kit. `packages/adapter-web/src/vendor/code-kit/`
holds verbatim copies of `web/llm-stream.ts`, `pure/sse.ts` and `pure/error_body.ts`,
pinned in `VENDOR.json`. Two rules, both the mirror image of the ones above:

- **Never hand-edit anything under `vendor/`.** A fix belongs upstream in code-kit,
  followed by a re-vendor from the new pin. code-kit's own `check-consumers` names this
  repo and fails on an edited copy.
- **The `web/` + `pure/` split is mirrored on purpose,** so imports resolve unchanged and
  the copies stay byte-identical. Don't flatten it.

Why vendored rather than depended on, and why the split matters:
`docs/dev/explanation/upstream-contract.md`.


- **The Obsidian target lives elsewhere:** it is `obsidian-plugins/neurovim-obsidian`, a
  separate repo in the community store that vendors this core. Its version lives in the
  status block above and is deliberately **not** repeated here — this line carried a stale
  `v0.7.5` while that block already said 0.8.0 (CORE-META-16, again). This repo
  builds no plugin bundle and never writes into a vault. How capabilities travel
  between the two: § Upstream contract.
- **Obsidian posture — web-first, logic-parity only:** `neurovim-obsidian` is kept at *functional*
  parity through the shared pure core — it is **not** a visual-parity target. New UI/UX work
  lands web-first and is **not** back-ported unless explicitly decided; don't "fix" the
  Obsidian UI to match the web app. Capabilities that concern the game still move *up* from
  the consumer (back-flow rule below). Why: `docs/dev/explanation/architecture.md`.
