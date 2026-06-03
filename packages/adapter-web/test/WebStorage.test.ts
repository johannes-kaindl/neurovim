/**
 * WebStorage round-trip tests. The IndexedDB persistence layer is the one place on the
 * web target where silent data corruption would live (adapter-web has no UI tests), so
 * it gets a focused safety net. fake-indexeddb provides a real IndexedDB in node; every
 * test writes under a unique key so the shared in-memory DB never cross-contaminates.
 */
import 'fake-indexeddb/auto';
import { WebStorage } from '../src/ports/WebStorage';

describe('WebStorage', () => {
  const storage = new WebStorage();

  it('returns null for a key that was never written', async () => {
    expect(await storage.loadData('never-written-key')).toBeNull();
  });

  it('round-trips a saved value under the default key', async () => {
    const payload = { total_xp: 42, nested: { a: [1, 2, 3] } };
    await storage.saveData(payload);
    expect(await storage.loadData()).toEqual(payload);
  });

  it('round-trips and isolates values under explicit keys', async () => {
    await storage.saveData({ v: 'one' }, 'k-one');
    await storage.saveData({ v: 'two' }, 'k-two');
    expect(await storage.loadData('k-one')).toEqual({ v: 'one' });
    expect(await storage.loadData('k-two')).toEqual({ v: 'two' });
  });

  it('overwrites an existing value at the same key', async () => {
    await storage.saveData({ n: 1 }, 'k-over');
    await storage.saveData({ n: 2 }, 'k-over');
    expect(await storage.loadData('k-over')).toEqual({ n: 2 });
  });

  it('lists keys and deletes them', async () => {
    await storage.saveData({ x: 1 }, 'k-del');
    expect(await storage.keys()).toContain('k-del');
    await storage.delete('k-del');
    expect(await storage.loadData('k-del')).toBeNull();
  });
});
