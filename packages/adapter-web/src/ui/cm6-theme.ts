/**
 * NeuroVim — CodeMirror 6 phosphor theme  (port/cm6-theme.ts)
 * -----------------------------------------------------------------------------
 * Replaces the ad-hoc inline `EditorView.theme({...})` in MissionEditor.tsx /
 * SandboxView.tsx with a full, token-driven dark theme so CM6 stops shipping its
 * default light gutter / cursor / selection that clash with the Kuro palette.
 *
 * All colours read the six --nv-* CSS variables (see styles.css), so retheming
 * is still "edit the tokens, nothing else". No new dependency, no bundle cost.
 *
 * Also exports `vimModeIndicator()` — a tiny extension that surfaces the current
 * Vim mode (NORMAL / INSERT / VISUAL) to a callback, so the UI can render the
 * mode chip the spec asks for (§4 / §9.4). Uses @replit/codemirror-vim's
 * `getCM()` + its 'vim-mode-change' event; no extra deps.
 */
import { EditorView } from '@codemirror/view';
import type { Extension } from '@codemirror/state';
import { getCM } from '@replit/codemirror-vim';

/* ---- The phosphor theme ---------------------------------------------------- */
export const neurovimTheme: Extension = EditorView.theme(
  {
    '&': {
      fontSize: '14px',
      height: '60vh',
      color: 'var(--nv-text)',
      backgroundColor: '#060807',
      border: '1px solid var(--nv-border)',
      borderRadius: '4px 4px 0 0',
    },
    '.cm-content': {
      fontFamily: 'var(--nv-mono)',
      caretColor: 'var(--nv-accent-hot, var(--nv-accent))',
      padding: '12px 0',
    },
    // No ligatures: JetBrains Mono would draw `===` or `->` as one glyph, and the player
    // must see exactly the characters the objective names and the check compares.
    '.cm-scroller': { fontFamily: 'var(--nv-mono)', lineHeight: '1.7', fontVariantLigatures: 'none' },

    /* gutter: dark, muted line numbers, accented active line */
    '.cm-gutters': {
      backgroundColor: '#0a0d0b',
      color: 'color-mix(in oklab, var(--nv-muted) 60%, transparent)',
      border: 'none',
      borderRight: '1px solid var(--nv-border)',
    },
    '.cm-lineNumbers .cm-gutterElement': { padding: '0 12px 0 16px', minWidth: '20px' },
    '.cm-activeLineGutter': {
      backgroundColor: 'color-mix(in oklab, var(--nv-accent) 6%, transparent)',
      color: 'var(--nv-accent)',
    },

    /* current line */
    '.cm-activeLine': { backgroundColor: 'color-mix(in oklab, var(--nv-accent) 5%, transparent)' },

    /* caret — insert mode (thin bar) */
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: 'var(--nv-accent-hot, var(--nv-accent))',
      borderLeftWidth: '2px',
    },
    /* caret — vim NORMAL/VISUAL block cursor (@replit/codemirror-vim) */
    '.cm-fat-cursor': {
      background: 'color-mix(in oklab, var(--nv-accent) 55%, transparent)',
      outline: 'none',
      color: 'var(--nv-bg) !important',
    },
    '&:not(.cm-focused) .cm-fat-cursor': {
      background: 'none',
      outline: '1px solid color-mix(in oklab, var(--nv-accent) 55%, transparent)',
    },

    /* selection */
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: 'color-mix(in oklab, var(--nv-accent) 26%, transparent)',
    },
    '.cm-selectionMatch': { backgroundColor: 'color-mix(in oklab, var(--nv-accent) 16%, transparent)' },

    /* search panel + matches */
    '.cm-searchMatch': { backgroundColor: 'color-mix(in oklab, var(--nv-warn) 30%, transparent)', outline: '1px solid var(--nv-warn)' },
    '.cm-searchMatch-selected': { backgroundColor: 'color-mix(in oklab, var(--nv-accent) 35%, transparent)' },
    '.cm-panels': { backgroundColor: 'var(--nv-panel)', color: 'var(--nv-text)', borderTop: '1px solid var(--nv-border)' },

    /* vim command line (":", "/") rendered by the vim plugin */
    '.cm-vim-panel': { backgroundColor: '#0a0d0b', color: 'var(--nv-accent)', padding: '4px 8px', fontFamily: 'var(--nv-mono)' },
    '.cm-vim-panel input': { color: 'var(--nv-accent)', fontFamily: 'var(--nv-mono)' },

    /* matching brackets */
    '.cm-matchingBracket': { backgroundColor: 'color-mix(in oklab, var(--nv-accent) 22%, transparent)', color: 'var(--nv-accent-hot)' },
    '.cm-nonmatchingBracket': { color: 'var(--nv-fail)' },

    /* scrollbars */
    '.cm-scroller::-webkit-scrollbar': { width: '10px', height: '10px' },
    '.cm-scroller::-webkit-scrollbar-thumb': { background: 'var(--nv-line-hot)', borderRadius: '8px', border: '3px solid #060807' },
  },
  { dark: true },
);

/* ---- Vim mode indicator ---------------------------------------------------- */
export type VimMode = 'NORMAL' | 'INSERT' | 'VISUAL' | 'REPLACE';

/**
 * Reports the live Vim mode to `onChange`. Wire the callback to set the
 * data-mode attribute on a .nv-mode-chip (see styles.css + MissionEditor.tsx).
 *
 *   vimModeIndicator((mode) => setMode(mode))
 */
export function vimModeIndicator(onChange: (mode: VimMode) => void): Extension {
  return EditorView.updateListener.of((update) => {
    // attach once, after the view + its CM5-compat shim exist
    const view = update.view as EditorView & { _nvVimHooked?: boolean };
    if (view._nvVimHooked) return;
    const cm = getCM(view);
    if (!cm) return;
    view._nvVimHooked = true;
    onChange('NORMAL');
    cm.on('vim-mode-change', (e: { mode: string; subMode?: string }) => {
      const m = (e.subMode || e.mode || 'normal').toUpperCase();
      const norm: VimMode =
        m.startsWith('INSERT') ? 'INSERT'
        : m.startsWith('VISUAL') ? 'VISUAL'
        : m.startsWith('REPLACE') ? 'REPLACE'
        : 'NORMAL';
      onChange(norm);
    });
  });
}
