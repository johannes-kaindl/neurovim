/**
 * CommsRail — diegetic CIPHER channel beside the editor. Carries Why · Keys · ↳ Manual ·
 * ↳ reveal, in the CIPHER voice. Adaptive by guidance.tier: 0 full · 1 compact (keys only)
 * · 2 spine-only (everything on tap). A pin toggle overrides the level default.
 * Presentational — all data comes from GuidanceModel. The objective is NOT here: it lives
 * in ObjectivePanel above the editor, so it never depends on tier, pin or a tap.
 */
import { useState } from 'preact/hooks';
import type { GuidanceModel } from '@neurovim/core';

interface Props {
  guidance: GuidanceModel;
  pin: 'open' | 'quiet' | null;
  onPin: (p: 'open' | 'quiet' | null) => void;
  onManual: () => void;
  onReveal: () => void;
  revealed: boolean;
}

export function CommsRail({ guidance, pin, onPin, onManual, onReveal, revealed }: Props) {
  const spine = guidance.tier === 2;
  const [open, setOpen] = useState(false);

  if (spine && !open) {
    return (
      <aside class="nv-rail nv-rail-spine" aria-label="CIPHER guidance">
        <button class="nv-rail-glyph" title="Expand CIPHER guidance" onClick={() => setOpen(true)}>◢</button>
      </aside>
    );
  }

  return (
    <aside class="nv-rail" aria-label="CIPHER guidance">
      <div class="nv-rail-head">
        <span class="nv-rail-cipher">◢ CIPHER</span>
        <div class="nv-rail-ctl">
          <button class="nv-rail-pin" title="Pin open" aria-pressed={pin === 'open'}
                  onClick={() => onPin(pin === 'open' ? null : 'open')}>📌</button>
          <button class="nv-rail-pin" title="Quiet" aria-pressed={pin === 'quiet'}
                  onClick={() => onPin(pin === 'quiet' ? null : 'quiet')}>—</button>
          {spine && <button class="nv-rail-pin" title="Collapse" onClick={() => setOpen(false)}>×</button>}
        </div>
      </div>

      {guidance.tier === 0 && (
        <>
          <div class="nv-rail-k">Why</div>
          <div class="nv-rail-v nv-rail-why">{guidance.why}</div>
        </>
      )}

      <div class="nv-rail-k">Keys</div>
      <div class="nv-rail-keys">
        {guidance.keys.map((k) => <span key={k.key} title={k.description}>{k.key}</span>)}
      </div>

      <div class="nv-rail-actions">
        <button class="nv-rail-link" onClick={onManual}>↳ Manual</button>
        <button class={`nv-rail-link${revealed ? ' nv-rail-link-on' : ''}`} onClick={onReveal}>
          {revealed ? '↳ hide corruption' : '↳ reveal corruption'}
        </button>
      </div>
    </aside>
  );
}
