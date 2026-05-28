# @neurovim/adapter-obsidian

Obsidian-Plugin-Target. Implementiert die vier `@neurovim/core`-Ports gegen die Obsidian-API und enthält die Plugin-Lifecycle-Klasse (Nachfolger von `main.ts`).

Build-Ziel (Phase 3): esbuild-Bundle → `32_NeuroVim/.obsidian/plugins/neurovim-trainer/main.js` (wie heute, nur aus dem Monorepo statt aus `_dev/plugin-src/`).

→ ADR-001 für die Adapter-Boundary.
