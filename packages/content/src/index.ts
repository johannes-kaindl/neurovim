/**
 * @neurovim/content — versionierte Content-Quelle (Phase 3 Schritt 3).
 *
 * SSOT = src/content/*.md. Build (build.mjs) generiert src/generated/content.ts.
 * Dieses Modul liefert ContentPort-konforme Helper über das generierte Manifest —
 * bundler-tauglich, kein Runtime-fs (web-fähig). Konsumiert via adapter-web (Phase 4)
 * oder direkt; der Obsidian-Adapter nutzt weiter Vault-Reads (ObsidianContent).
 */
import type { MissionSummary, MissionDoc, LoreDoc } from '@neurovim/core';
import { ENTRIES, type RawContentEntry } from './generated/content';

export { ENTRIES };
export type { RawContentEntry };

function toSummary(e: RawContentEntry): MissionSummary {
  const fm = e.frontmatter;
  return {
    mission_id: String(fm.mission_id ?? e.id),
    mission_type: (fm.mission_type as MissionSummary['mission_type']) ?? 'practice',
    title: String(fm.title ?? e.id),
    category: String(fm.category ?? ''),
    xp_reward: Number(fm.xp_reward ?? 0),
    locked: Boolean(fm.locked ?? false),
    tier: String(fm.tier ?? ''),
    arc: e.arc,
    chapter: e.chapter,
  };
}

/** Alle spielbaren Missionen (Transmission + Kata), optional auf Arc gefiltert. */
export function listMissions(arc?: 'I' | 'II'): MissionSummary[] {
  return ENTRIES
    .filter((e) => e.role === 'transmission' || e.role === 'kata')
    .filter((e) => (arc ? e.arc === arc : true))
    .map(toSummary);
}

/** Volle Mission: Transmission/Kata-Body + ggf. zugehöriger Briefing-Body. */
export function getMission(id: string): MissionDoc {
  const main = ENTRIES.find(
    (e) => (e.role === 'transmission' || e.role === 'kata') && e.id === id,
  );
  if (!main) throw new Error(`Mission nicht gefunden: ${id}`);
  const briefing = ENTRIES.find((e) => e.role === 'briefing' && e.id === id);
  const solution = ENTRIES.find((e) => e.role === 'solution' && e.id === id);
  return {
    ...toSummary(main),
    transmissionBody: main.body,
    briefingBody: briefing?.body ?? '',
    solution: solution?.body,
  };
}

/** Lore-Artefakt (Loot/Fragment/Ref). */
export function getLore(id: string): LoreDoc {
  const e = ENTRIES.find(
    (x) => x.kind === 'lore' && x.id === id,
  );
  if (!e) throw new Error(`Lore nicht gefunden: ${id}`);
  return {
    id: e.id,
    kind: e.role === 'loot' ? 'loot' : e.role === 'fragment' ? 'fragment' : 'ref',
    title: String(e.frontmatter.title ?? e.id),
    body: e.body,
  };
}
