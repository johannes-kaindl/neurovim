/**
 * VimModeSource — Vim-Mode- und Action-Event-Quelle (ADR-001 §P2 / Decisions D1).
 *
 * Entkoppelt Game-Logic + Audio-Feedback von der Frage, WO der Vim-Editor läuft.
 * - adapter-obsidian: `MarkdownView.editor.cm.on('vim-mode-change')` (aus VimModeWatcher.ts)
 *   + Keystroke-Klassifikation (aus CommandListener.ts).
 * - adapter-web:      CodeMirror 6 + `@replit/codemirror-vim` (emittiert dasselbe
 *   'vim-mode-change'-Event). Regex-Flavor-Parität: siehe experiments/vim-regex-findings.md (D1).
 *
 * Generalisiert zwei Bestand-Quellen:
 *  - VimModeWatcher  → Mode-Wechsel (normal/insert/visual/command-line)
 *  - CommandListener → klassifizierte Vim-Actions (delete/yank/change/motion/paste/undo/…)
 */
export type VimMode = 'normal' | 'insert' | 'visual' | 'command-line';

export type VimAction =
  | 'delete' | 'yank' | 'change' | 'paste'
  | 'motion-forward' | 'motion-back' | 'goto-start' | 'goto-end'
  | 'undo' | 'redo';

export interface VimModeSource {
  /** Aktueller Vim-Mode (Pull). */
  getCurrentMode(): VimMode;

  /** Mode-Wechsel (Push); gibt Unsubscribe zurück. */
  onModeChange(cb: (mode: VimMode) => void): () => void;

  /**
   * Klassifizierte Vim-Actions (Push) — Basis für Command-Sound-Cues.
   * Generalisierung von CommandListener; gibt Unsubscribe zurück.
   */
  onAction(cb: (action: VimAction) => void): () => void;
}
