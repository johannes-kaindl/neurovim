/**
 * SandboxView — THE RAVEN (M-08 sandbox), web-native.
 * Picker (easy/normal/hard) → GlitchEngine injects N glitches into the
 * RAVEN original text → CM6/vim editor → SUBMIT checks via diffCount → with 0
 * remaining glitches: time against personal best, otherwise "N remaining".
 * Reuses the pure core logic (GlitchEngine) + MetricsTracker.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { vim } from '@replit/codemirror-vim';
import { GlitchEngine, type SandboxDifficulty, type SandboxBests } from '@neurovim/core';
import { getSandboxSource } from '@neurovim/content';
import { fmtTime } from './format';
import { neurovimTheme } from './cm6-theme';

const { original, pool } = getSandboxSource();
const DIFFS: SandboxDifficulty[] = ['easy', 'normal', 'hard'];

interface Props {
  bests: SandboxBests;
  onNewBest: (difficulty: SandboxDifficulty, ms: number) => void;
  onExit: () => void;
}

export function SandboxView({ bests, onNewBest, onExit }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);
  const startedAt = useRef(0);
  const [phase, setPhase] = useState<'pick' | 'active' | 'result'>('pick');
  const [difficulty, setDifficulty] = useState<SandboxDifficulty | null>(null);
  const [round, setRound] = useState(0);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [missKey, setMissKey] = useState(0);
  const [resultMsg, setResultMsg] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [injected, setInjected] = useState(0);

  // (Re)mount the editor on every round start (start/again/harder).
  useEffect(() => {
    if (round === 0 || !host.current || !difficulty) return;
    const count = GlitchEngine.countForDifficulty(difficulty);
    const selected = GlitchEngine.selectGlitches(pool, count);
    const { text } = GlitchEngine.applyGlitches(original, selected);
    startedAt.current = Date.now();
    setInjected(count);
    setElapsed(0);
    const timer = window.setInterval(() => setElapsed((Date.now() - startedAt.current) / 1000), 100);
    const v = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: text,
        extensions: [
          vim(), lineNumbers(), history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          EditorView.lineWrapping,
          neurovimTheme,
        ],
      }),
    });
    view.current = v;
    return () => { window.clearInterval(timer); v.destroy(); };
  }, [round]);

  function begin(d: SandboxDifficulty) {
    setDifficulty(d);
    setRemaining(null);
    setMissKey(0);
    setResultMsg(null);
    setPhase('active');
    setRound((r) => r + 1);
  }

  function submit() {
    if (!view.current || !difficulty) return;
    const body = view.current.state.doc.toString();
    const left = GlitchEngine.diffCount(body, original);
    if (left > 0) {
      setRemaining(left);
      setMissKey((k) => k + 1);
      return;
    }
    const elapsed = Date.now() - startedAt.current;
    const prev = bests[difficulty];
    const isBest = prev === null || elapsed < prev;
    if (isBest) onNewBest(difficulty, elapsed);
    setResultMsg(isBest ? `${fmtTime(elapsed)} — NEW BEST` : `${fmtTime(elapsed)} · PB ${fmtTime(prev!)}`);
    setPhase('result');
  }

  function harder() {
    const next = DIFFS[Math.min(DIFFS.indexOf(difficulty ?? 'easy') + 1, DIFFS.length - 1)];
    begin(next);
  }

  if (phase === 'pick') {
    return (
      <div class="nv-app">
        <header class="nv-nexus-head">
          <h1>&gt;_ RAVEN SANDBOX</h1>
          <p class="nv-sandbox-intro">CORP injected noise into the transmission. Restore it with Vim. Beat the clock.</p>
        </header>
        <div class="nv-sandbox-diffs">
          {DIFFS.map((d) => (
            <button key={d} class="nv-sandbox-diff" onClick={() => begin(d)}>
              <span class="nv-sandbox-diff-name">{d.toUpperCase()}</span>
              <span class="nv-sandbox-diff-count">{GlitchEngine.countForDifficulty(d)} glitches</span>
              {bests[d] !== null && <span class="nv-sandbox-diff-pb">PB {fmtTime(bests[d]!)}</span>}
            </button>
          ))}
        </div>
        <button class="nv-sandbox-back" onClick={onExit}>← NEXUS</button>
      </div>
    );
  }

  return (
    <div class="nv-editor">
      <div class="nv-editor-bar">
        <button onClick={onExit}>← NEXUS</button>
        <span class="nv-editor-title">
          RAVEN // {difficulty?.toUpperCase()}
          {remaining != null && <span class="nv-sandbox-remaining"> · {remaining} ✗ remaining</span>}
        </span>
        {phase === 'active' && <button class="nv-submit" onClick={submit}>SUBMIT</button>}
      </div>
      {phase === 'active' && (
        <div class="nv-sandbox-hud" aria-live="polite">
          <div class="nv-cell"><div class="nv-v">{elapsed.toFixed(1)}s</div><div class="nv-k">Elapsed</div></div>
          <div class={`nv-cell nv-rem${missKey ? ' nv-flash' : ''}`} key={missKey}>
            <div class="nv-v">{remaining ?? injected}</div><div class="nv-k">Glitches left</div>
          </div>
        </div>
      )}
      <div ref={host} class="nv-cm-host" />
      {phase === 'result' && (
        <div class="nv-sandbox-result">
          <span class="nv-sandbox-result-msg">✓ TRANSMISSION RESTORED · {resultMsg}</span>
          <div class="nv-sandbox-result-actions">
            <button onClick={() => begin(difficulty!)}>AGAIN</button>
            <button class="nv-modal-primary" onClick={harder}>HARDER →</button>
            <button onClick={onExit}>← NEXUS</button>
          </div>
        </div>
      )}
    </div>
  );
}
