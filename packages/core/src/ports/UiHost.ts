/**
 * Port: Mount-Container für Preact-UI-Trees.
 *
 * Entkoppelt die Preact-Components von der Frage, WO sie gemountet werden.
 * - adapter-obsidian: `ItemView` (Sidebar), `Modal` (Result/LevelUp), MarkdownPostProcessor.
 * - adapter-web: DOM-`<div>`-Overlays / Routen.
 *
 * Die Preact-Components selbst (FloatHUD, SandboxHUD, *Module, Modal-Inhalte)
 * wandern unverändert nach `core/ui` und hängen nur an diesem Port.
 * Siehe Coupling-Pattern P5.
 */
import type { ComponentChild } from 'preact';

export interface UiHost {
  /** Mountet einen Preact-Tree in einen Host-Container; gibt eine Unmount-Funktion zurück. */
  mount(node: ComponentChild): () => void;
}
