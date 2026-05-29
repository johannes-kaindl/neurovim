/**
 * @neurovim/adapter-web — standalone web-app target (NEW, no legacy code).
 *
 * Implements (Phase 3) the four @neurovim/core ports for the browser:
 *  - VimModeSource  → CodeMirror 6 + @replit/codemirror-vim ('vim-mode-change')
 *  - StateStore     → IndexedDB (+ one-time data.json import for legacy users)
 *  - ContentSource  → bundled @neurovim/content (Markdown→JSON)
 *  - UiHost         → DOM <div> overlays / routes
 *
 * Plus: Vite SPA bootstrap (replaces main.ts orchestration) + web NEXUS dashboard mount.
 *
 * Acceptance Phase-3 step 4: ARC I M-01 playable in the browser.
 * Open questions (ADR Open Questions): CM6 vim parity, NEXUS redesign,
 * audio default, distribution channel.
 */
export {};
// TODO Phase 3: Vite bootstrap + 4 web adapter impls + NexusDashboard mount + migration helper.
