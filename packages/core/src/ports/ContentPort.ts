/**
 * ContentPort — Zugriff auf Missions-/Lore-Content (ADR-001 §P4 / Decisions D3).
 *
 * - adapter-obsidian: Vault-File-API + Pfad-Mapping aus `data/chapters.ts`.
 * - adapter-web:      gebündeltes `@neurovim/content` (Markdown→JSON-Build, D3).
 *
 * Liefert sowohl Mission-Bodies (Briefing/Transmission) als auch Lore-Artefakte
 * (Fragments, Loot, Characters), die heute als Vault-Notes vorliegen.
 */
import type { MissionFrontmatter } from '../types';

/** Leichte Mission-Übersicht (für Listen/NEXUS-Dashboard, ohne Body). */
export interface MissionSummary extends MissionFrontmatter {
  arc: 'I' | 'II';
  chapter: string;
}

/** Vollständige Mission inkl. Briefing-/Transmission-Body + Lösung. */
export interface MissionDoc extends MissionSummary {
  briefingBody: string;
  transmissionBody: string;
  /** Soll-Lösung (Dev-SOLUTIONS) — für Diff-Validierung. */
  solution?: string;
  /** Korrupte Ausgangsfassung (falls Mission-Typ Korrektur). */
  corrupted?: string;
}

export interface LoreDoc {
  id: string;
  kind: 'fragment' | 'loot' | 'character' | 'organization' | 'ref';
  title: string;
  body: string;
}

export interface ContentPort {
  /** Alle Missionen, optional auf einen Arc gefiltert. */
  listMissions(arc?: 'I' | 'II'): Promise<MissionSummary[]>;

  /** Volle Mission (Briefing + Transmission + ggf. Lösung). */
  getMission(id: string): Promise<MissionDoc>;

  /** Lore-Artefakt (Fragment/Loot/Character/Organization/Ref). */
  getLore(id: string): Promise<LoreDoc>;

  /** Optional: rohe Datei lesen (Sandbox THE_RAVEN, REF-Blätter). */
  getRaw?(path: string): Promise<string>;
}
