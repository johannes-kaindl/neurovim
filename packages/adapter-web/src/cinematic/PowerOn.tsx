interface Props { onPowerOn: () => void; }

/** Dark CORP terminal; the click is the audio-unlock gesture that starts the cinematic. */
export function PowerOn({ onPowerOn }: Props) {
  return (
    <div class="nv-poweron" role="dialog" aria-label="Power on terminal">
      <button class="nv-poweron-btn" onClick={onPowerOn}>BOOT TERMINAL ▶</button>
      <div class="nv-poweron-sub">CORP // secure terminal · press to power on</div>
    </div>
  );
}
