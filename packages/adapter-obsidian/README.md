# @neurovim/adapter-obsidian

Obsidian plugin target. Implements the four `@neurovim/core` ports against the Obsidian API and contains the plugin lifecycle class (successor to `main.ts`).

Build target (Phase 3): esbuild bundle → `32_NeuroVim/.obsidian/plugins/neurovim-trainer/main.js` (as today, just from the monorepo instead of from `_dev/plugin-src/`).

→ ADR-001 for the adapter boundary.
