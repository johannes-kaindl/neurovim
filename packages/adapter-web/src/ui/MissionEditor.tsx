/**
 * MissionEditor — CodeMirror-6-Editor mit Vim-Mode (@replit/codemirror-vim).
 * Lädt den Transmission-Body (Practice-Buffer). Submit reicht den aktuellen
 * Editor-Inhalt an den Caller (App orchestriert verify/XP/save — D17 web-flow).
 */
import { useEffect, useRef } from 'preact/hooks';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { vim } from '@replit/codemirror-vim';
import { MetricsTracker, type MetricsResult, type MissionDoc } from '@neurovim/core';

interface Props {
  mission: MissionDoc;
  onSubmit: (content: string, metrics: MetricsResult) => void;
  onBack: () => void;
}

export function MissionEditor({ mission, onSubmit, onBack }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);
  const metrics = useRef(new MetricsTracker());

  useEffect(() => {
    if (!host.current) return;
    const tracker = metrics.current;
    tracker.reset();
    tracker.start();
    const v = new EditorView({
      parent: host.current,
      state: EditorState.create({
        doc: mission.transmissionBody,
        // vim() MUSS vor den anderen Keymaps stehen.
        extensions: [
          vim(),
          lineNumbers(),
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          EditorView.lineWrapping,
          // Jeder Tastendruck zählt (Vim-Effizienz-Metrik: weniger Keystrokes = besser).
          EditorView.domEventHandlers({ keydown() { tracker.addKeystroke(); return false; } }),
          EditorView.theme({
            '&': { fontSize: '14px', height: '60vh', border: '1px solid #1f2a1c' },
            '.cm-content': { fontFamily: 'ui-monospace, monospace' },
          }),
        ],
      }),
    });
    view.current = v;
    return () => v.destroy();
  }, [mission.mission_id]);

  return (
    <div class="nv-editor">
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
    </div>
  );
}
