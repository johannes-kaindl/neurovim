/**
 * @neurovim/core — plattform-neutraler Kern.
 *
 * Enthält (nach Phase-3-Migration):
 *  - engine/   Game-Logic (MissionEngine, MetricsTracker, ProgressionEngine, GlitchEngine)
 *  - data/     statische Daten (chapters, levels, cheatsheet, cipher-quotes)
 *  - audio/    Web-Audio-Engine (AudioEngine, SoundCues, AmbientLayer, CommandListener)
 *  - ui/       Preact-Components (FloatHUD, SandboxHUD, AsciiArt, *Module, NexusDashboard)
 *  - types.ts  kanonisches State-Schema ✅
 *  - ports/    die Plattform-Interfaces ✅
 *
 * Hängt NIEMALS direkt an `obsidian`. Plattform-Spezifik kommt ausschließlich
 * über die Ports, die adapter-obsidian / adapter-web implementieren.
 *
 * Phase-3-Schritt-1 (Interfaces) abgeschlossen: types.ts + 4 finalisierte Ports
 * (StoragePort, ContentPort, AudioPort, VimModeSource) + UiHost (P5). ADR-001 §Decisions.
 */
export * from './types';

export * from './ports/StoragePort';
export * from './ports/ContentPort';
export * from './ports/AudioPort';
export * from './ports/VimModeSource';
export * from './ports/UiHost';

// TODO Phase 3 Schritt 2 (Core-Move): engine/data/audio/utils/ui aus
// 32_NeuroVim/_dev/plugin-src/src/ hierher bewegen + Re-Exports ergänzen.
