/**
 * VimPrimer — first-run "What is Vim & why" panel, in the CIPHER voice. Shown once
 * (data.vimPrimerSeen), skippable, re-readable later via the Manual. Static (no typing
 * animation) so it is reduced-motion-safe by construction. role=dialog + Escape = skip.
 */
import { useEffect, useRef } from 'preact/hooks';

interface Props { onDone: () => void; }

const LINES = [
  'Vim is the tool. A keyboard-only text editor — no mouse, no menus.',
  'Operatives use it because it is fast: you edit at the speed of thought.',
  'It has modes. NORMAL moves and commands; INSERT types; ESC returns.',
  'Here you will restore corrupted documents — every mission burns one skill into reflex.',
  'You do not need to know any of it yet. CIPHER will guide you. Begin.',
];

export function VimPrimer({ onDone }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    panel.current?.querySelector<HTMLElement>('button')?.focus();
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') { e.preventDefault(); onDone(); } }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onDone]);

  return (
    <div class="nv-modal-backdrop" onClick={onDone}>
      <div ref={panel} class="nv-modal nv-primer" role="dialog" aria-modal="true" aria-label="What is Vim"
           onClick={(e) => e.stopPropagation()}>
        <h2 class="nv-modal-title nv-ok">◢ CIPHER // ORIENTATION</h2>
        <div class="nv-modal-body nv-primer-body">
          {LINES.map((l, i) => <p key={i}>{l}</p>)}
        </div>
        <div class="nv-modal-actions">
          <button class="nv-modal-primary" onClick={onDone}>Begin →</button>
          <button onClick={onDone}>Skip</button>
        </div>
      </div>
    </div>
  );
}
