/**
 * MissionEditor — CodeMirror-6 editor with Vim-Mode. Shows the mission objective above the
 * buffer for the whole run, hosts the CIPHER Comms-Rail (guidance) beside it and a
 * reveal-corruption affordance (highlights lines still differing from the solution). The
 * submit/metrics contract is unchanged.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { vim } from '@replit/codemirror-vim';
import { MetricsTracker, countsAsKeystroke, getDivergentLines, type MetricsResult, type MissionDoc, type GuidanceModel } from '@neurovim/core';
import { neurovimTheme, vimModeIndicator, type VimMode } from './cm6-theme';
import { revealField, setRevealLines } from './reveal';
import { CommsRail } from './CommsRail';
import { ObjectivePanel } from './ObjectivePanel';

interface Props {
  mission: MissionDoc;
  guidance: GuidanceModel;
  pin: 'open' | 'quiet' | null;
  onPin: (p: 'open' | 'quiet' | null) => void;
  onSubmit: (content: string, metrics: MetricsResult) => void;
  onBack: () => void;
  onCheatsheet?: () => void;
}

export function MissionEditor({ mission, guidance, pin, onPin, onSubmit, onBack, onCheatsheet }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);
  const metrics = useRef(new MetricsTracker());
  const [mode, setMode] = useState<VimMode>('NORMAL');
  const [keys, setKeys] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!host.current) return;
    const tracker = metrics.current;
    tracker.reset();
    tracker.start();
    setKeys(0);
    setRevealed(false);
    const t0 = performance.now();
    const timer = window.setInterval(() => setElapsed((performance.now() - t0) / 1000), 100);

    const v = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: mission.transmissionBody,
        extensions: [
          vim(),
          lineNumbers(),
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          EditorView.lineWrapping,
          neurovimTheme,
          vimModeIndicator(setMode),
          revealField,
        ],
      }),
    });
    view.current = v;

    // Count in the capture phase on the document, not through EditorView.domEventHandlers:
    // @replit/codemirror-vim consumes normal-mode keys (h/j/k/l, motions, operators) before
    // an in-editor handler ever sees them, so the old wiring counted insert-mode typing and
    // bare modifiers — precisely inverting what the game scores. Scoped to the editor host,
    // and bare modifiers are filtered by the core rule.
    const onKeydown = (e: KeyboardEvent) => {
      if (!countsAsKeystroke(e.key)) return;
      if (!host.current?.contains(e.target as Node)) return;
      tracker.addKeystroke();
      setKeys((k) => k + 1);
    };
    document.addEventListener('keydown', onKeydown, true);

    return () => {
      document.removeEventListener('keydown', onKeydown, true);
      window.clearInterval(timer);
      v.destroy();
    };
  }, [mission.mission_id]);

  function toggleReveal() {
    const v = view.current;
    if (!v) return;
    if (revealed) {
      v.dispatch({ effects: setRevealLines.of([]) });
      setRevealed(false);
    } else {
      const lines = getDivergentLines(v.state.doc.toString(), mission.solution ?? '');
      v.dispatch({ effects: setRevealLines.of(lines) });
      setRevealed(true);
    }
  }

  return (
    <div class="nv-editor nv-hud-frame">
      <span class="nv-br-bl" /><span class="nv-br-br" />
      <div class="nv-editor-bar">
        <button onClick={onBack}>← NEXUS</button>
        <span class="nv-editor-title">{mission.mission_id} · {mission.title}</span>
        {onCheatsheet && (
          <button class="nv-editor-keys" onClick={onCheatsheet} aria-label="Vim reference" title="Vim reference (keys)">⌨ Keys</button>
        )}
        <button class="nv-submit"
                onClick={() => onSubmit(view.current?.state.doc.toString() ?? '', metrics.current.getResult())}>
          Submit (verify)
        </button>
      </div>

      <ObjectivePanel mission={mission} />

      <div class="nv-editor-main">
        <div ref={host} class="nv-cm-host" />
        <CommsRail
          guidance={guidance}
          pin={pin}
          onPin={onPin}
          onManual={() => onCheatsheet?.()}
          onReveal={toggleReveal}
          revealed={revealed}
        />
      </div>

      <div class="nv-editor-status">
        <span class="nv-mode-chip" data-mode={mode} aria-live="polite">{mode}</span>
        <span class="nv-file">{mission.mission_id}-TRANSMISSION</span>
        <span class="nv-hud">
          <span>⏱ <strong>{elapsed.toFixed(1)}s</strong></span>
          <span>⌁ <strong>{keys}</strong></span>
        </span>
      </div>
    </div>
  );
}
