/**
 * Port: Persistenz für Spieler-State (XP, Highscores, Unlocks, Audio-Settings).
 *
 * - adapter-obsidian: `plugin.loadData()` / `plugin.saveData()` (→ data.json)
 * - adapter-web: IndexedDB (+ einmaliger data.json-Import für Bestand-User)
 *
 * Herkunft: extrahiert aus `main.ts` (loadData_/saveData) + `VimModeWatcher` (localStorage).
 * Siehe Coupling-Pattern P3. Das konkrete `NeuroVimState`-Schema kommt aus `types.ts`
 * (wandert in Phase 3 hierher).
 */
export interface NeuroVimState {
  // TODO Phase 3: aus _dev/plugin-src/src/types.ts übernehmen (XP, Highscores, Unlocks, audioSettings).
  [key: string]: unknown;
}

export interface StateStore {
  load(): Promise<NeuroVimState>;
  save(state: NeuroVimState): Promise<void>;
}
