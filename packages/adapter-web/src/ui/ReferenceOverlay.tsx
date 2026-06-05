/**
 * ReferenceOverlay — one reference surface, two tabs: Cheat-Sheet (categorized keymap,
 * active mission category floated to top) and Manual (the comprehensive REF doc). Replaces
 * the old CheatsheetOverlay as the single reference entry, reachable from NEXUS, Briefing and
 * Mission. role=dialog + Escape + Tab focus-trap (mirrors the former overlay).
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import { CHEATSHEET, getOrderedCategories } from '@neurovim/core';
import { getManual } from '@neurovim/content';
import { renderMarkdown } from './markdown';

interface Props {
  onClose: () => void;
  /** Active mission category (from the editor/briefing) — floated to the top. null from NEXUS. */
  activeCategory?: string | null;
}

export function ReferenceOverlay({ onClose, activeCategory = null }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<'keys' | 'manual'>('keys');
  const cats = getOrderedCategories(CHEATSHEET.map((c) => c.id), activeCategory);
  const manualHtml = renderMarkdown(getManual());

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>('button')?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
      if (e.key === 'Tab' && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'));
        if (f.length === 0) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); prev?.focus?.(); };
  }, [onClose]);

  return (
    <div class="nv-sheet-backdrop" onClick={onClose}>
      <div ref={panel} class="nv-sheet" role="dialog" aria-modal="true" aria-label="Vim reference"
           onClick={(e) => e.stopPropagation()}>
        <div class="nv-sheet-bar">
          <div class="nv-ref-tabs" role="tablist">
            <button class={`nv-ref-tab${tab === 'keys' ? ' nv-ref-tab-on' : ''}`} role="tab"
                    aria-selected={tab === 'keys'} onClick={() => setTab('keys')}>&gt;_ CHEAT-SHEET</button>
            <button class={`nv-ref-tab${tab === 'manual' ? ' nv-ref-tab-on' : ''}`} role="tab"
                    aria-selected={tab === 'manual'} onClick={() => setTab('manual')}>&gt;_ MANUAL</button>
          </div>
          <button class="nv-sheet-x" onClick={onClose} aria-label="Close reference">✕ Esc</button>
        </div>
        {tab === 'keys' ? (
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
        ) : (
          <article class="nv-sheet-body nv-md" dangerouslySetInnerHTML={{ __html: manualHtml }} />
        )}
      </div>
    </div>
  );
}
