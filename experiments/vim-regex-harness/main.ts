/**
 * Vim regex parity spike — Phase 3 step 0.
 *
 * Minimal CodeMirror 6 editor with @replit/codemirror-vim. Preloaded with three
 * ARC II fixtures from the NeuroVim curriculum. Play through them manually and
 * record the findings in experiments/vim-regex-findings.md.
 */
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { vim } from '@replit/codemirror-vim';

const FIXTURE = `# R-08 — very-magic alternation  →  :%s/\\v(ALPHA|BETA|GAMMA)-TIER/TIER-1/g
INTERCEPT: clearance ALPHA-TIER granted
INTERCEPT: clearance BETA-TIER granted
INTERCEPT: clearance GAMMA-TIER granted

# R-07 — lazy quantifier  →  :%s/<.\\{-}>//g   (tags removed, payload stays)
<header>CIPHER-DIRECT</header><payload>signal dark</payload><footer>eof</footer>

# R-10 — capture + backref  →  :%s/\\(\\w\\+\\): \\(\\w\\+\\)/\\2 = \\1/
CHANNEL: encrypted
TIMESTAMP: 0417
OPERATOR: raven
`;

// vim() must come BEFORE the other keymaps so Vim sees the keys first.
new EditorView({
  state: EditorState.create({
    doc: FIXTURE,
    extensions: [
      vim(),
      history(),
      keymap.of([...defaultKeymap, ...historyKeymap]),
      EditorView.lineWrapping,
      EditorView.theme({
        '&': { fontSize: '14px' },
        '.cm-content': { fontFamily: 'ui-monospace, monospace' },
      }),
    ],
  }),
  parent: document.getElementById('editor')!,
});
