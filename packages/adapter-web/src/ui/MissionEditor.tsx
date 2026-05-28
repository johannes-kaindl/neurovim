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
import type { MissionDoc } from '@neurovim/core';

interface Props {
  mission: MissionDoc;
  onSubmit: (content: string) => void;
  onBack: () => void;
  feedback: string | null;
}

export function MissionEditor({ mission, onSubmit, onBack, feedback }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!host.current) return;
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
          onClick={() => onSubmit(view.current?.state.doc.toString() ?? '')}
        >
          Submit (verify)
        </button>
      </div>
      {feedback && <div class="nv-feedback">{feedback}</div>}
      <div ref={host} class="nv-cm-host" />
    </div>
  );
}
