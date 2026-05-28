/**
 * Vim-Regex-Parität-Spike — Phase-3-Schritt-0.
 *
 * Minimaler CodeMirror-6-Editor mit @replit/codemirror-vim. Vorgeladen mit drei
 * ARC-II-Fixtures aus dem NeuroVim-Curriculum. Manuell durchspielen, Befund in
 * experiments/vim-regex-findings.md eintragen.
 */
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { vim } from '@replit/codemirror-vim';

const FIXTURE = `# R-08 — very-magic alternation  →  :%s/\\v(ALPHA|BETA|GAMMA)-TIER/TIER-1/g
INTERCEPT: clearance ALPHA-TIER granted
INTERCEPT: clearance BETA-TIER granted
INTERCEPT: clearance GAMMA-TIER granted

# R-07 — lazy quantifier  →  :%s/<.\\{-}>//g   (tags weg, payload bleibt)
<header>CIPHER-DIRECT</header><payload>signal dark</payload><footer>eof</footer>

# R-10 — capture + backref  →  :%s/\\(\\w\\+\\): \\(\\w\\+\\)/\\2 = \\1/
CHANNEL: encrypted
TIMESTAMP: 0417
OPERATOR: raven
`;

// vim() muss VOR den anderen Keymaps stehen, damit Vim die Tasten zuerst sieht.
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
