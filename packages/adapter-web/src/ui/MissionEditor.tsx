/**
 * MissionEditor — CodeMirror-6 editor with Vim-Mode (@replit/codemirror-vim).
 * POLISH PASS (port): full phosphor CM6 theme + live Vim-mode chip + run HUD.
 *
 * Behaviour / props / onSubmit contract are unchanged — only the theme and the
 * surrounding status line are added, so the flow + 150 tests stay green.
 *
 * Drop-in replacement for src/ui/MissionEditor.tsx. Requires port/cm6-theme.ts
 * and the .nv-editor-status / .nv-mode-chip rules from styles.css.
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { vim } from '@replit/codemirror-vim';
import { MetricsTracker, type MetricsResult, type MissionDoc } from '@neurovim/core';
import { neurovimTheme, vimModeIndicator, type VimMode } from './cm6-theme';

interface Props {
  mission: MissionDoc;
  onSubmit: (content: string, metrics: MetricsResult) => void;
  onBack: () => void;
}

export function MissionEditor({ mission, onSubmit, onBack }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);
  const metrics = useRef(new MetricsTracker());
  const [mode, setMode] = useState<VimMode>('NORMAL');
  const [keys, setKeys] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!host.current) return;
    const tracker = metrics.current;
    tracker.reset();
    tracker.start();
    setKeys(0);
    const t0 = performance.now();
    const timer = window.setInterval(() => setElapsed((performance.now() - t0) / 1000), 100);

    const v = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: mission.transmissionBody,
        // vim() MUST come before the other keymaps.
        extensions: [
          vim(),
          lineNumbers(),
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          EditorView.lineWrapping,
          // Every keystroke counts (Vim-efficiency metric: fewer keystrokes = better).
          EditorView.domEventHandlers({
            keydown() {
              tracker.addKeystroke();
              setKeys((k) => k + 1);
              return false;
            },
          }),
          neurovimTheme,
          vimModeIndicator(setMode),
        ],
      }),
    });
    view.current = v;
    return () => {
      window.clearInterval(timer);
      v.destroy();
    };
  }, [mission.mission_id]);

  return (
    <div class="nv-editor nv-hud-frame">
      <span class="nv-br-bl" /><span class="nv-br-br" />
      <div class="nv-editor-bar">
        <button onClick={onBack}>← NEXUS</button>
        <span class="nv-editor-title">{mission.mission_id} · {mission.title}</span>
        <button
          class="nv-submit"
          onClick={() => onSubmit(view.current?.state.doc.toString() ?? '', metrics.current.getResult())}
        >
          Submit (verify)
        </button>
      </div>

      <div ref={host} class="nv-cm-host" />

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
