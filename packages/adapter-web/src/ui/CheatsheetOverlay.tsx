/**
 * CheatsheetOverlay — Vim keymap drawer. One component, two triggers (NEXUS control +
 * editor-bar button). Read-only; role=dialog with Escape + a Tab focus-trap so it can
 * cover the editor without disturbing the calm canvas underneath (spec §3 Editor, §5 a11y).
 */
import { useEffect, useRef } from 'preact/hooks';
import { CHEATSHEET, getOrderedCategories } from '@neurovim/core';

interface Props {
  onClose: () => void;
  /** Active mission category (from the editor) — floated to the top. null from NEXUS. */
  activeCategory?: string | null;
}

export function CheatsheetOverlay({ onClose, activeCategory = null }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const allIds = CHEATSHEET.map((c) => c.id);
  const cats = getOrderedCategories(allIds, activeCategory);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>('button')?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key === 'Tab' && panel.current) {
        const f = Array.from(
          panel.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'),
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [onClose]);

  return (
    <div class="nv-sheet-backdrop" onClick={onClose}>
      <div ref={panel} class="nv-sheet" role="dialog" aria-modal="true" aria-label="Vim cheatsheet"
           onClick={(e) => e.stopPropagation()}>
        <div class="nv-sheet-bar">
          <h2 class="nv-sheet-title">&gt;_ CHEATSHEET</h2>
          <button class="nv-sheet-x" onClick={onClose} aria-label="Close cheatsheet">✕ Esc</button>
        </div>
        <div class="nv-sheet-body">
          {cats.map((c) => (
            <section class="nv-sheet-cat" key={c.id}>
              <div class="nv-sheet-cat-label nv-label">{c.label}</div>
              {c.groups.map((g) => (
                <div class="nv-sheet-group" key={g.label}>
                  <div class="nv-sheet-group-label">{g.label}</div>
                  {g.keys.map((k) => (
                    <div class="nv-kv" key={k.key}>
                      <code class="nv-kv-k">{k.key}</code>
                      <span class="nv-kv-d">{k.description}</span>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
