# @neurovim/core

Platform-neutral core of the NeuroVim trainer. Game logic, Web Audio, Preact UI and the four port interfaces. Knows neither Obsidian nor browser specifics directly — everything goes through `ports/`.

## Contents (target after Phase 3)
- `engine/` · `data/` · `audio/` · `utils/` · `ui/` — from `32_NeuroVim/_dev/plugin-src/src/` (~23 portable files)
- `ports/` — `VimModeSource`, `StateStore`, `ContentSource`, `UiHost` ✅ (stubs created)
- **NEW:** `ui/NexusDashboard` — replaces the dataviewjs NEXUS (which wasn't code in the plugin at all, but lived in `00-NEXUS.md`)

## Architecture
→ ADR-001: `ADR-001-Adapter-Architektur.md` in the maintainer's separate design-prep workspace (`neurovim-standalone-prep`) — not part of this repo.
