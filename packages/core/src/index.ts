/**
 * @neurovim/core — plattform-neutraler Kern.
 *
 * Enthält (nach Phase-3-Migration):
 *  - engine/   Game-Logic (MissionEngine, MetricsTracker, ProgressionEngine, GlitchEngine)
 *  - data/     statische Daten (chapters, levels, cheatsheet, cipher-quotes)
 *  - audio/    Web-Audio-Engine (AudioEngine, SoundCues, AmbientLayer, CommandListener)
 *  - ui/       Preact-Components (FloatHUD, SandboxHUD, AsciiArt, *Module, NexusDashboard)
 *  - ports/    die vier Plattform-Interfaces (siehe unten)
 *
 * Hängt NIEMALS direkt an `obsidian`. Plattform-Spezifik kommt ausschließlich
 * über die vier Ports, die adapter-obsidian / adapter-web implementieren.
 */
export * from './ports/VimModeSource';
export * from './ports/StateStore';
export * from './ports/ContentSource';
export * from './ports/UiHost';

// TODO Phase 3 (Migrations-Schritt 2): engine/data/audio/utils/types/ui aus
// 32_NeuroVim/_dev/plugin-src/src/ hierher bewegen + Re-Exports ergänzen.
