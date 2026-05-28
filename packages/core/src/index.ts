/**
 * @neurovim/core — plattform-neutraler Kern (Phase 3 Schritt 2a).
 *
 * Re-exportiert: State-Schema (types), Ports, Game-Logic (engine), Daten (data),
 * Utils, Web-Audio (audio) und Preact-UI (views). Hängt NIEMALS an `obsidian` —
 * Plattform-Spezifik kommt über die Ports, die adapter-obsidian / adapter-web
 * implementieren. ADR-001 §Decisions.
 *
 * Hinweis: Die Ports (StoragePort/ContentPort/VimModeSource/UiHost) werden von den
 * Adaptern implementiert, nicht von der Game-Logic konsumiert (Engines sind reine
 * Funktionen — D17). AudioPort wurde entfernt (D19e): AudioEngine ist bereits
 * plattform-neutral + injizierbar, der Port-Wrapper war redundant.
 */

// ── State-Schema + Ports ─────────────────────────────────────
export * from './types';
export * from './ports/StoragePort';
export * from './ports/ContentPort';
export * from './ports/VimModeSource';
export * from './ports/UiHost';

// ── Engine (Game-Logic) ──────────────────────────────────────
export * from './engine/MetricsTracker';
export * from './engine/MissionEngine';
export * from './engine/ProgressionEngine';
export * from './engine/GlitchEngine';

// ── Daten ────────────────────────────────────────────────────
export * from './data/chapters';
export * from './data/levels';
export * from './data/cheatsheet';
export * from './data/cipher-quotes';

// ── Utils ────────────────────────────────────────────────────
export * from './utils/diff';
export * from './utils/time';
export * from './utils/hints';
export * from './utils/chapterNav';

// ── Web-Audio (plattform-neutral) ────────────────────────────
export * from './audio/AudioEngine';
export * from './audio/SoundCues';
export * from './audio/AmbientLayer';
export * from './audio/CommandListener';

// ── Preact-UI ────────────────────────────────────────────────
export * from './views/FloatHUD';
export * from './views/SandboxHUD';
export * from './views/components/AsciiArt';
export * from './views/modules/MissionHudModule';
export * from './views/modules/NavHubModule';
export * from './views/modules/CheatSheetModule';
export * from './views/modules/ProgressModule';
