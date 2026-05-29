---
name: neurovim-standalone — Architektur-Kurzform
description: Adapter-Pattern (ADR-001) — Core + 4 Ports, Core plattform-neutral
type: project
---

**Adapter-Pattern (ADR-001):** plattform-neutraler `@neurovim/core` + zwei Adapter,
entkoppelt über **4 Port-Interfaces** (`packages/core/src/ports/`):

- `VimModeSource` — Vim-Mode + klassifizierte Actions (obsidian: `vim-mode-change`; web: CM6 + `@replit/codemirror-vim`)
- `StoragePort` — Persistenz `PluginData` (obsidian: `data.json`; web: IndexedDB)
- `ContentPort` — Missionen/Lore (obsidian: Vault-Files; web: gebündeltes `@neurovim/content`)
- `UiHost` — Mount-Container für Preact-Trees

**Harte Regel:** Core hängt **nie** an `obsidian` oder Browser-DOM. Engines sind
**reine Funktionen** und konsumieren Ports nicht direkt — die Adapter verdrahten
Ports ↔ Engines (D17). `AudioPort` wurde entfernt (D19e), AudioEngine ist bereits
plattform-neutral + injizierbar.

**React→Preact-Alias** überall (esbuild/vite/jest/tsconfig) — beim Anlegen neuer
Build/Test-Configs mitziehen.

**Quellen (außerhalb des Repos):** ADR-001 +
Decisions-Log D1–D26 im prep-Habitat
`/Users/Shared/20_Claude/neurovim-standalone-prep/` (`40_deliverables/`,
`90_workflow-log/decisions.md`). Vollständige Konventionen: `AGENTS.md` im Repo-Root.
