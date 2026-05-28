/**
 * AudioPort — Sound-Feedback & Ambient (ADR-001 §P? / Decisions D4).
 *
 * Zweck (D4): Dopamin-Feedback (Cues bei XP/Level/Mission) + Atmosphäre (Ambient).
 *
 * D4-CONSTRAINT — non-intrusive:
 *  - KEIN Auto-Play. Der zugrundeliegende AudioContext darf erst nach einer
 *    User-Geste (Click/Keydown) initialisiert/resumed werden — Browser-Autoplay-Policy
 *    UND bewusste Design-Entscheidung. Der Web-Adapter MUSS `requiresUserGesture`
 *    respektieren und `unlock()` an die erste Geste hängen.
 *  - Ambient default AUS (vgl. PluginData.ambient_enabled), per Settings-Toggle steuerbar.
 *  - `prefers-reduced-motion`-Analogie: bei Reduktions-Präferenz Cues dezent halten.
 *
 * Cue-Katalog gespiegelt aus Bestand `audio/SoundCues.ts` (Web-Audio, plattform-neutral).
 */
export type AudioCue =
  | 'missionComplete' | 'levelUp' | 'xpGain' | 'wrongAttempt' | 'missionReset'
  | 'glitchFeedback' | 'drillToggle' | 'lockMessage'
  | 'vimModeNormal' | 'vimModeInsert' | 'vimModeVisual' | 'vimModeCommand'
  | 'corruptionFixed' | 'transmissionRestored'
  | 'commandDelete' | 'commandYank' | 'commandChange'
  | 'commandMotionForward' | 'commandMotionBack' | 'commandPaste'
  | 'commandUndo' | 'commandRedo' | 'commandGotoStart' | 'commandGotoEnd';

export type AmbientLayerId = 'base' | 'tension' | 'reveal';

export interface CueOptions {
  /** 0..1, multipliziert mit Master-Volume. */
  gain?: number;
}

export interface AudioPort {
  /**
   * Muss der Adapter eine User-Geste abwarten, bevor Audio spielt?
   * Web: true (Autoplay-Policy). Obsidian-Desktop: typischerweise false.
   */
  readonly requiresUserGesture: boolean;

  /** An die erste User-Geste hängen — initialisiert/resumed den AudioContext. */
  unlock(): Promise<void>;

  /** Einen Cue abspielen (no-op bevor unlock() lief). */
  playCue(cue: AudioCue, opts?: CueOptions): void;

  /** Ambient-Layer starten (default AUS — nur bei ambient_enabled). */
  playAmbient(layer: AmbientLayerId): void;
  stopAmbient(): void;

  /** Master-Volume 0..1. */
  setMasterVolume(value: number): void;
}
