/**
 * @neurovim/adapter-obsidian — Obsidian-Plugin-Target.
 *
 * Implementiert (nach Phase 3) die vier @neurovim/core Ports gegen die Obsidian-API:
 *  - VimModeSource  → MarkdownView.editor.cm.on('vim-mode-change')   (aus VimModeWatcher.ts)
 *  - StateStore     → plugin.loadData()/saveData()                    (aus main.ts)
 *  - ContentSource  → Vault-File-API + data/chapters Pfad-Mapping     (aus main.ts + chapters.ts)
 *  - UiHost         → ItemView / Modal / MarkdownPostProcessor        (aus SidebarView/Modals/AsciiCodeBlockProcessor)
 *
 * Die Plugin-Klasse (Lifecycle, registerView, registerEditorExtension, Commands, Ribbon)
 * ist die Adapter-Entry-Point — Nachfolger von `main.ts`.
 *
 * Herkunft: 6 gekoppelte Files aus 32_NeuroVim/_dev/plugin-src/src/.
 * Acceptance Phase-3-Schritt 2: Plugin läuft unverändert in Obsidian.
 */
export {};
// TODO Phase 3: NeuroVimPlugin-Klasse + 4 Adapter-Impls.
