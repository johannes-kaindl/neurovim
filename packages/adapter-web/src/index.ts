/**
 * @neurovim/adapter-web — Standalone-Web-App-Target (NEU, kein Bestand-Code).
 *
 * Implementiert (Phase 3) die vier @neurovim/core Ports für den Browser:
 *  - VimModeSource  → CodeMirror 6 + @replit/codemirror-vim ('vim-mode-change')
 *  - StateStore     → IndexedDB (+ einmaliger data.json-Import für Bestand-User)
 *  - ContentSource  → gebündeltes @neurovim/content (Markdown→JSON)
 *  - UiHost         → DOM-<div>-Overlays / Routen
 *
 * Plus: Vite-SPA-Bootstrap (ersetzt main.ts-Orchestrierung) + Web-NEXUS-Dashboard-Mount.
 *
 * Acceptance Phase-3-Schritt 4: ARC I M-01 im Browser spielbar.
 * Offene Geschmacks-Fragen (ADR Open Questions): CM6-Vim-Parität, NEXUS-Redesign,
 * Audio-Default, Distribution-Channel.
 */
export {};
// TODO Phase 3: Vite-Bootstrap + 4 Web-Adapter-Impls + NexusDashboard-Mount + Migration-Helper.
