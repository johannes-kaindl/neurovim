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
 *    silently. What it shows instead is the browser-specific hint, which names the way back
 *    through the browser's own site settings — or says plainly that Safari has none.
 *
 * The single probe is `/models`, not a completion: it is cheaper, and it cannot fail for the
 * second reason a completion can (a model name the player has not chosen yet). One round-trip
 * therefore answers both questions at once — is the server there, and what does it serve.
 */
import { useState } from 'preact/hooks';
import {
  fetchModels,
  loadUplinkSettings,
  saveUplinkSettings,
  type ModelListResult,
  type UplinkSettings,
} from '../uplink';
import { resolveModelChoice } from '../vendor/code-kit/pure/model-choice';

/** code-kit returns hint *keys* and deliberately does not phrase them — each consumer writes
 *  its own copy. `unreachable` is not among them: there the server's own refusal text is more
 *  specific than anything a generic sentence could say. */
const NO_LIST_HINT =
  'This server serves a model but publishes no list — type the name it expects.';

export function UplinkPanel() {
  const [settings, setSettings] = useState<UplinkSettings>(loadUplinkSettings);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [probe, setProbe] = useState<ModelListResult | null>(null);

  function update(patch: Partial<UplinkSettings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    saveUplinkSettings(next);
  }

  /** The only place a request is made — always from a press, never from a render. */
  async function connect() {
    setBusy(true);
    const r = await fetchModels(settings);
    setBusy(false);
    setProbe(r);
    // Reachable with exactly one model: choosing it for the player is not a liberty, it is
    // the only choice there was. Anything else waits for them to pick.
    if (r.reachable && r.models.length === 1) update({ enabled: true, model: r.models[0] });
    else if (r.reachable && r.models.includes(settings.model)) update({ enabled: true });
  }

  function disconnect() {
    update({ enabled: false });
    setProbe(null);
  }

  const choice =
    probe === null
      ? null
      : resolveModelChoice({ reachable: probe.reachable, models: probe.models, current: settings.model });

  return (
    <section class="nv-tier">
      <div class="nv-tier-label nv-label">Uplink</div>

      <button class="nv-row" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span class="nv-row-id">CIPHER</span>
        <span class="nv-row-t">
          {settings.enabled
            ? `Handler uplink — ${settings.model}`
            : 'Handler uplink — local model required'}
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
              onInput={(e) => {
                update({ endpoint: (e.target as HTMLInputElement).value, enabled: false });
                setProbe(null); // a different address knows nothing about the last answer
              }}
            />
          </label>

          {choice?.mode === 'dropdown' && (
            <label class="nv-uplink-field">
              <span class="nv-label">Model</span>
              <select
                value={choice.value}
                onChange={(e) => {
                  const model = (e.target as HTMLSelectElement).value;
                  update({ model, enabled: model !== '' });
                }}
              >
                {choice.options.map((o) => (
                  <option value={o.value} key={o.value}>
                    {o.suffix === 'saved' ? `${o.label} (saved)` : o.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          {choice?.mode === 'freetext' && (
            <label class="nv-uplink-field">
              <span class="nv-label">Model</span>
              <input
                type="text"
                placeholder="qwen2.5-coder-7b-instruct"
                value={settings.model}
                onInput={(e) => {
                  const model = (e.target as HTMLInputElement).value;
                  update({ model, enabled: model.trim() !== '' });
                }}
              />
            </label>
          )}

          <div class="nv-uplink-actions">
            {settings.enabled ? (
              <button onClick={disconnect}>Disconnect</button>
            ) : (
              <button
                onClick={() => void connect()}
                disabled={settings.endpoint.trim() === '' || busy}
              >
                {busy ? 'Connecting…' : 'Connect'}
              </button>
            )}
          </div>

          {choice?.hintKey === 'unreachable' && (
            <p class="nv-uplink-status nv-uplink-status--error" role="status">
              {probe?.detail}
            </p>
          )}
          {choice?.hintKey === 'no-list' && (
            <p class="nv-uplink-status nv-uplink-status--error" role="status">
              {NO_LIST_HINT}
            </p>
          )}
          {settings.enabled && (
            <p class="nv-uplink-status nv-uplink-status--ok" role="status">
              Uplink online.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
