# @neurovim/core

Plattform-neutraler Kern des NeuroVim-Trainers. Game-Logic, Web-Audio, Preact-UI und die vier Port-Interfaces. Kennt weder Obsidian noch Browser-Spezifika direkt — alles läuft über `ports/`.

## Inhalt (Ziel nach Phase 3)
- `engine/` · `data/` · `audio/` · `utils/` · `ui/` — aus `32_NeuroVim/_dev/plugin-src/src/` (~23 portable Files)
- `ports/` — `VimModeSource`, `StateStore`, `ContentSource`, `UiHost` ✅ (Stubs angelegt)
- **NEU:** `ui/NexusDashboard` — ersetzt das dataviewjs-NEXUS (das im Plugin gar kein Code war, sondern in `00-NEXUS.md` lebte)

## Architektur
→ ADR-001: `/Users/Shared/20_Claude/neurovim-standalone-prep/40_deliverables/ADR-001-Adapter-Architektur.md`
