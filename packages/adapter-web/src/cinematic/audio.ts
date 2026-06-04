import { AudioEngine, SoundCues } from '@neurovim/core';
import type { SfxCue } from './cutscene';

/**
 * Map a cinematic beat cue to the closest existing SoundCue. Caller gates on ui.audioOn
 * and must have unlocked audio (PowerOn gesture). Synchronous; safe if audio isn't ready
 * (SoundCues guard against an uninitialised engine).
 */
export function playCue(cue: SfxCue, audio: AudioEngine): void {
  switch (cue) {
    case 'boot': SoundCues.drillToggle(audio); break;       // mechanical key-thud
    case 'glitch': SoundCues.glitchFeedback(audio); break;  // clinical CORP intrusion sine
    case 'klaxon': SoundCues.lockMessage(audio); break;     // pure 150Hz denial tone
    case 'signal': SoundCues.vimModeVisual(audio); break;   // ascending acquisition sweep
    case 'unlock': SoundCues.missionComplete(audio); break; // warm resistance bell
  }
}
