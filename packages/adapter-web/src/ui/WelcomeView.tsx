/**
 * WelcomeView — landing page at app start (before the NEXUS picker).
 * Renders the welcome intro (from @neurovim/content) as Markdown.
 * Button: Enter NEXUS → picker.
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
