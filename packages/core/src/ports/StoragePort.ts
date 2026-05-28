/**
 * StoragePort — Persistenz-Abstraktion (ADR-001 §P3 / Decisions D5).
 *
 * Kapselt das Laden/Speichern des persistenten Spieler-States (`PluginData`).
 * - adapter-obsidian: `plugin.loadData()` / `plugin.saveData()` (→ data.json)
 * - adapter-web:      IndexedDB (+ einmaliger data.json-Import für Bestand-User)
 *
 * Generisch gehalten (`<T>`), damit auch Teil-States (z.B. Audio-Settings)
 * unter eigenen Keys ablegbar sind. Der Haupt-State ist `PluginData` (types.ts).
 */
export interface StoragePort {
  /** Lädt den unter `key` abgelegten State; `null`/Default-Handling beim Aufrufer. */
  loadData<T>(key?: string): Promise<T | null>;

  /** Persistiert `data` unter `key` (Default-Key = Haupt-State). */
  saveData<T>(data: T, key?: string): Promise<void>;

  /** Alle vorhandenen Keys (für Migration / Debug). */
  keys(): Promise<string[]>;

  /** Entfernt einen Key (für Reset / Migration). */
  delete(key: string): Promise<void>;
}
