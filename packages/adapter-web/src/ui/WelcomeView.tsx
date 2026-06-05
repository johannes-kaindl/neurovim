/**
 * WelcomeView — landing page at app start (before the NEXUS picker).
 * Renders the welcome intro (from @neurovim/content) as Markdown.
 * Button: Enter NEXUS → picker.
 */
import { useState } from 'preact/hooks';
import { getWelcome } from '@neurovim/content';
import { renderMarkdown } from './markdown';
import { BootIntro } from './BootIntro';

interface Props {
  onEnter: () => void;
}

function shouldBoot(): boolean {
  if (typeof window === 'undefined') return false;
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return false;
  try { if (sessionStorage.getItem('nv-booted')) return false; } catch { /* ignore */ }
  return true;
}

export function WelcomeView({ onEnter }: Props) {
  const html = renderMarkdown(getWelcome());
  const [booting, setBooting] = useState(shouldBoot());
  function finishBoot() {
    try { sessionStorage.setItem('nv-booted', '1'); } catch { /* ignore */ }
    setBooting(false);
  }
  return (
    <div class="nv-doc nv-welcome nv-crt nv-hud-frame">
      <div class="nv-scan" /><div class="nv-vig" /><span class="nv-br-bl" /><span class="nv-br-br" />
      {booting && <BootIntro onDone={finishBoot} />}
      <article class="nv-md" dangerouslySetInnerHTML={{ __html: html }} />
      <div class="nv-doc-foot">
        <button class="nv-modal-primary nv-welcome-enter" onClick={onEnter}>Enter NEXUS →</button>
      </div>
    </div>
  );
}
