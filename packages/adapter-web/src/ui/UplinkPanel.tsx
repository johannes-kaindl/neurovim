/**
 * UplinkPanel — the switch that has to be flipped before anything reaches the network.
 *
 * The shape follows from one measured fact (2026-08-21, AGENTS.md § Gotchas): a Local Network
 * Access refusal is stored **per origin and permanently**. So the panel does two things that
 * look like restraint and are really the whole design:
 *
 *  - it never connects on its own, so the browser prompt only ever appears right after the
 *    player pressed something and knows what is being asked;
 *  - it offers no "try again", because after a refusal the next attempt fails instantly and
 *    silently. What it shows instead is `WebLlm`'s browser-specific hint, which names the way
 *    back through the browser's own site settings — or says plainly that Safari has none.
 */
import { useState } from 'preact/hooks';
import type { LlmResult } from '@neurovim/core';
import {
  createUplink,
  loadUplinkSettings,
  saveUplinkSettings,
  uplinkStatus,
  type UplinkSettings,
} from '../uplink';

/** A bounded wait: `WebLlm` waits indefinitely unless told otherwise, and an unbounded spinner
 *  at a switch is indistinguishable from a hang. Generous enough for a cold local model. */
const PROBE_TIMEOUT_MS = 20_000;

export function UplinkPanel() {
  const [settings, setSettings] = useState<UplinkSettings>(loadUplinkSettings);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<LlmResult | null>(null);

  const status = uplinkStatus(result);
  const configured = settings.endpoint.trim() !== '' && settings.model.trim() !== '';

  function update(patch: Partial<UplinkSettings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    saveUplinkSettings(next);
    // Any edit invalidates what the last attempt said about a different address.
    setResult(null);
  }

  /** The only place a request is made — always from a click, never from a render. */
  async function connect() {
    const llm = createUplink({ ...settings, enabled: true }, { timeoutMs: PROBE_TIMEOUT_MS });
    if (llm === null) return;
    setBusy(true);
    const r = await llm.complete([{ role: 'user', content: 'ping' }]);
    setBusy(false);
    setResult(r);
    if (r.ok) update({ enabled: true });
  }

  function disable() {
    update({ enabled: false });
    setResult(null);
  }

  return (
    <section class="nv-tier">
      <div class="nv-tier-label nv-label">Uplink</div>

      <button class="nv-row" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span class="nv-row-id">CIPHER</span>
        <span class="nv-row-t">
          {settings.enabled ? 'Handler uplink — connected' : 'Handler uplink — local model required'}
        </span>
        <span class="nv-row-meta">{settings.enabled ? 'ON' : 'OFF'}</span>
      </button>

      {open && (
        <div class="nv-uplink">
          <p class="nv-uplink-note">
            CIPHER can answer over a language model running on your own machine. Nothing is sent
            anywhere else, and nothing is contacted until you connect below — your browser will
            ask for permission to reach the local network the first time.
          </p>

          <label class="nv-uplink-field">
            <span class="nv-label">Server</span>
            <input
              type="url"
              inputMode="url"
              placeholder="http://localhost:1234"
              value={settings.endpoint}
              onInput={(e) => update({ endpoint: (e.target as HTMLInputElement).value })}
            />
          </label>

          <label class="nv-uplink-field">
            <span class="nv-label">Model</span>
            <input
              type="text"
              placeholder="qwen2.5-coder-7b-instruct"
              value={settings.model}
              onInput={(e) => update({ model: (e.target as HTMLInputElement).value })}
            />
          </label>

          <div class="nv-uplink-actions">
            {settings.enabled ? (
              <button onClick={disable}>Disconnect</button>
            ) : (
              <button onClick={() => void connect()} disabled={!configured || busy}>
                {busy ? 'Connecting…' : 'Connect'}
              </button>
            )}
          </div>

          {status.tone !== 'idle' && (
            <p class={`nv-uplink-status nv-uplink-status--${status.tone}`} role="status">
              {status.text}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
