/**
 * LoreView — THE ARCHIVE. Browse the unlockable story layer (6 loot, 10 fragments,
 * 2 reference docs) and read each artifact. Web-native, read-only: never touches game state.
 * Internal phases: 'index' (grouped cards) → 'read' (markdown reader). Mirrors SandboxView's
 * self-managed sub-phase pattern, so no extra top-level view value is needed.
 */
import { useState } from 'preact/hooks';
import { listLore, getLore, type LoreSummary } from '@neurovim/content';
import { renderMarkdown } from './markdown';

interface Props {
  onExit: () => void;
}

const GROUPS: { kind: LoreSummary['kind']; label: string }[] = [
  { kind: 'loot', label: 'Loot — Recovered Files' },
  { kind: 'fragment', label: 'Fragments — Intercepts' },
  { kind: 'ref', label: 'Reference' },
];

export function LoreView({ onExit }: Props) {
  const [current, setCurrent] = useState<LoreSummary | null>(null);
  const items = listLore();

  if (current) {
    const html = renderMarkdown(getLore(current.id).body?.trim() || '_No data on file._');
    return (
      <div class="nv-doc nv-crt nv-hud-frame">
        <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />
        <div class="nv-doc-bar">
          <button onClick={() => setCurrent(null)}>← ARCHIVE</button>
          <span class="nv-doc-title">{current.id} · {current.title}</span>
        </div>
        <article class="nv-md" dangerouslySetInnerHTML={{ __html: html }} />
        <div class="nv-doc-foot">
          <button onClick={() => setCurrent(null)}>← Back to Archive</button>
          <button onClick={onExit}>← NEXUS</button>
        </div>
      </div>
    );
  }

  return (
    <div class="nv-app nv-archive nv-crt nv-hud-frame">
      <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />
      <div class="nv-statusstrip">
        <span class="nv-label">Kuro Signal Protocol // Archive</span>
        <span class="nv-label nv-link">◢ {items.length} Artifacts</span>
      </div>
      <h1 class="nv-wordmark nv-text-glow">&gt;_ ARCHIVE<span class="nv-caret">_</span></h1>
      <p class="nv-archive-intro">Recovered intel from the resistance and CORP. Read the story behind the missions.</p>

      {GROUPS.map((g) => {
        const inGroup = items.filter((it) => it.kind === g.kind);
        if (inGroup.length === 0) return null;
        return (
          <section class="nv-archive-group" key={g.kind}>
            <div class="nv-label">{g.label}</div>
            <div class="nv-cards">
              {inGroup.map((it) => (
                <button class="nv-card" key={it.id} onClick={() => setCurrent(it)}>
                  <span class="nv-card-t">{it.title}</span>
                  {it.unlockLevel != null
                    ? <span class="nv-card-badge nv-amber">LVL {it.unlockLevel}</span>
                    : <span class="nv-card-badge">{it.kind === 'ref' ? 'REF' : 'INTEL'}</span>}
                  {it.summary && <span class="nv-card-s">{it.summary}</span>}
                </button>
              ))}
            </div>
          </section>
        );
      })}

      <button class="nv-sandbox-back" onClick={onExit}>← NEXUS</button>
    </div>
  );
}
