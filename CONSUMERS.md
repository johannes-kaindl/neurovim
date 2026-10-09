# CONSUMERS — who vendors this core

> **GENERATED — do not edit by hand.** Regenerate with `npm run check:consumers`.
>
> A stale pin is normal: consumers have their own release cadence and re-vendor
> when it suits them. A contract breach is not — it means a vendored copy was
> edited in place, which the next re-vendor would silently discard.
>
> Kind `source`: the consumer runs the vendored code. Kind `data`: it vendors the export and the conformance vectors and re-implements the rules, proven by those vectors.

| Consumer | Kind | What | Pin | Status | Detail |
|---|---|---|---|---|---|
| neurovim-obsidian | source | Obsidian plugin (community store) | v0.2.7 (2db98c2) | 🟡 stale pin | pin 2db98c29699709ddcb7db3310d3c4bb17a6278ca is 3 commits behind the vendor surface |
| neurovim.nvim | data | Neovim plugin (Lua port; data + conformance vectors) | fd5cabe | 🟡 stale pin | pin fd5cabeba955f63e3d4c15242b76c12b79da73f6 is 1 commit behind the vendor surface; logic is proven by the consumer's conformance suite |

The vendor surface is `packages/core/src` + `packages/content/src` + `packages/core/conformance` + `packages/content/export`.
See `README.md` § Consumers for the contract and `AGENTS.md` § Upstream contract
for the back-flow rule.
