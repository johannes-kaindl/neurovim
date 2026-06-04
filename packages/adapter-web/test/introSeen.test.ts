/**
 * introSeen is the first-run gate for the cinematic intro. It must default false,
 * survive a save/load round-trip, and default false when an OLD record (saved before
 * the field existed) is spread over DEFAULT_PLUGIN_DATA on load (the App's load pattern).
 */
import 'fake-indexeddb/auto';
import { DEFAULT_PLUGIN_DATA, type PluginData } from '@neurovim/core';
import { WebStorage } from '../src/ports/WebStorage';

describe('introSeen flag', () => {
  let storage: WebStorage;
  beforeEach(() => { storage = new WebStorage(); });

  it('defaults to false', () => {
    expect(DEFAULT_PLUGIN_DATA.introSeen).toBe(false);
  });

  it('defaults false when an old record (no introSeen) is merged over defaults', () => {
    const oldRecord = { total_xp: 99 } as Partial<PluginData>;
    const merged = { ...DEFAULT_PLUGIN_DATA, ...oldRecord };
    expect(merged.introSeen).toBe(false);
  });

  it('round-trips introSeen=true through storage', async () => {
    const next: PluginData = { ...DEFAULT_PLUGIN_DATA, introSeen: true };
    await storage.saveData(next, 'introseen-rt');
    const loaded = await storage.loadData<PluginData>('introseen-rt');
    expect(loaded?.introSeen).toBe(true);
  });
});
