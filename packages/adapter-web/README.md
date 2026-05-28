# @neurovim/adapter-web

**NEU** für die Standalone-Auslieferung. Vite-SPA, die die vier `@neurovim/core`-Ports für den Browser implementiert — kein Obsidian nötig.

Schlüssel-Bausteine (Phase 3):
- CodeMirror 6 + `@replit/codemirror-vim` (Vim-Engine + Mode-Events)
- IndexedDB (State) + `data.json`-Import-Helper (Bestand-User-Migration)
- gebündeltes `@neurovim/content`
- Web-NEXUS-Dashboard (Neubau des dataviewjs-Hubs)

⚠️ Höchstes Port-Risiko: CM6-Vim-Parität zur Obsidian-Vim-Engine — früh prototypen (ADR Open Question 1).

→ ADR-001 für Details.
