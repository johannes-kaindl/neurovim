/**
 * BriefingView — story briefing shown before the mission editor.
 * Renders the briefingBody (already contained in the MissionDoc) as Markdown.
 * Buttons: Begin Mission → editor, ← NEXUS → picker.
 */
import { renderMarkdown } from './markdown';

interface Props {
  missionId: string;
  title: string;
  briefingBody: string;
  skillTag?: string;
  why?: string;
  leadsTo?: string | null;
  onBegin: () => void;
  onBack: () => void;
  onReference?: () => void;
}

export function BriefingView({ missionId, title, briefingBody, skillTag, why, leadsTo, onBegin, onBack, onReference }: Props) {
  const html = renderMarkdown(briefingBody?.trim() || '_No briefing on file for this mission._');
  return (
    <div class="nv-doc nv-crt nv-hud-frame">
      <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />
      <div class="nv-doc-bar">
        <button onClick={onBack}>← NEXUS</button>
        <span class="nv-doc-title">{missionId} · {title}</span>
        {onReference && (
          <button class="nv-editor-keys" onClick={onReference} aria-label="Vim reference" title="Vim reference">⌨ Reference</button>
        )}
        <button class="nv-submit" onClick={onBegin}>Begin Mission →</button>
      </div>
      {(skillTag || why || leadsTo) && (
        <div class="nv-brief-guide">
          {skillTag && (<><span class="nv-brief-k">What you'll learn</span><span class="nv-brief-v">{skillTag}</span></>)}
          {why && (<><span class="nv-brief-k">Why</span><span class="nv-brief-v">{why}</span></>)}
          {leadsTo && (<><span class="nv-brief-k">Leads to</span><span class="nv-brief-v">{leadsTo}</span></>)}
        </div>
      )}
      <article class="nv-md" dangerouslySetInnerHTML={{ __html: html }} />
      <div class="nv-doc-foot">
        <button class="nv-modal-primary" onClick={onBegin}>Begin Mission →</button>
        <button onClick={onBack}>← Back to NEXUS</button>
      </div>
    </div>
  );
}
