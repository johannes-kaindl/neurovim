/**
 * MissionEditor — CodeMirror-6 editor with Vim-Mode. Now hosts the CIPHER Comms-Rail
 * (guidance) beside the buffer and a reveal-corruption affordance (highlights lines still
 * differing from the solution). The submit/metrics contract is unchanged.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { vim } from '@replit/codemirror-vim';
import { MetricsTracker, getDivergentLines, type MetricsResult, type MissionDoc, type GuidanceModel } from '@neurovim/core';
import { neurovimTheme, vimModeIndicator, type VimMode } from './cm6-theme';
import { revealField, setRevealLines } from './reveal';
import { CommsRail } from './CommsRail';

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
          EditorView.domEventHandlers({
            keydown() { tracker.addKeystroke(); setKeys((k) => k + 1); return false; },
          }),
          neurovimTheme,
          vimModeIndicator(setMode),
          revealField,
        ],
      }),
    });
    view.current = v;
    return () => { window.clearInterval(timer); v.destroy(); };
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

      <div class="nv-editor-main">
        <div ref={host} class="nv-cm-host" />
        <CommsRail
          guidance={guidance}
          objective={mission.summary ?? 'Restore the transmission.'}
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
