/**
 * Port: Quelle für Vim-Mode-Wechsel-Events.
 *
 * Entkoppelt die Game-Logic von der Frage, WO der Vim-Editor läuft.
 * - adapter-obsidian: hört auf `MarkdownView.editor.cm.on('vim-mode-change')`
 * - adapter-web: CodeMirror 6 + `@replit/codemirror-vim` (emittiert dasselbe Event)
 *
 * Herkunft: extrahiert aus `_dev/plugin-src/src/audio/VimModeWatcher.ts`.
 * Siehe Coupling-Pattern P2.
 */
export type VimMode = 'normal' | 'insert' | 'visual' | 'command-line';

export interface VimModeSource {
  /** Registriert einen Listener; gibt eine Unsubscribe-Funktion zurück. */
  onModeChange(cb: (mode: VimMode) => void): () => void;
}
