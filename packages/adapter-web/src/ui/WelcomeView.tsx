/**
 * WelcomeView — Startseite beim App-Start (vor dem NEXUS-Picker).
 * Rendert das Welcome-Intro (aus @neurovim/content) als Markdown.
 * Button: Enter NEXUS → Picker.
 */
import { getWelcome } from '@neurovim/content';
import { renderMarkdown } from './markdown';

interface Props {
  onEnter: () => void;
}

export function WelcomeView({ onEnter }: Props) {
  const html = renderMarkdown(getWelcome());
  return (
    <div class="nv-doc nv-welcome">
      <article class="nv-md" dangerouslySetInnerHTML={{ __html: html }} />
      <div class="nv-doc-foot">
        <button class="nv-modal-primary nv-welcome-enter" onClick={onEnter}>Enter NEXUS →</button>
      </div>
    </div>
  );
}
