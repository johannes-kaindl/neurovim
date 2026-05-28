/**
 * Port: Zugriff auf Missions-/Content-Daten.
 *
 * - adapter-obsidian: Vault-File-API (`getAbstractFileByPath` + `vault.read`),
 *   Pfad-Mapping aus `data/chapters.ts`.
 * - adapter-web: gebündeltes `@neurovim/content` (Markdown→JSON zur Build-Zeit).
 *
 * Herkunft: extrahiert aus `data/chapters.ts` + Vault-Reads in `main.ts`.
 * Siehe Coupling-Pattern P4.
 */
export interface MissionMeta {
  id: string;
  chapter: string;
  title: string;
  xpReward: number;
  // TODO Phase 3: vollständiges Meta-Schema aus data/chapters.ts + types.ts.
}

export interface MissionDoc extends MissionMeta {
  body: string;
}

export interface ContentSource {
  listMissions(): Promise<MissionMeta[]>;
  getMission(id: string): Promise<MissionDoc>;
}
