# @neurovim/adapter-web

**NEW** for the standalone distribution. A Vite SPA that implements the four `@neurovim/core` ports for the browser — no Obsidian needed.

Key building blocks (Phase 3):
- CodeMirror 6 + `@replit/codemirror-vim` (Vim engine + mode events)
- IndexedDB (state) + `data.json` import helper (existing-user migration)
- bundled `@neurovim/content`
- web NEXUS dashboard (rebuild of the dataviewjs hub)

⚠️ Highest port risk: CM6 Vim parity with the Obsidian Vim engine — prototype early (ADR Open Question 1).

→ ADR-001 for details.
