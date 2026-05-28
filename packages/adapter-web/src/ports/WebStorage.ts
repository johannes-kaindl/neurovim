/**
 * WebStorage — StoragePort gegen IndexedDB (D18, native API, keine Extra-Dep).
 * Ersetzt Obsidians loadData/saveData. Cross-Reload-persistent.
 */
import type { StoragePort } from '@neurovim/core';

const DB_NAME = 'neurovim';
const STORE = 'kv';
const MAIN_KEY = 'pluginData';

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function tx<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest): Promise<T> {
  return openDb().then(db => new Promise<T>((resolve, reject) => {
    const store = db.transaction(STORE, mode).objectStore(STORE);
    const req = fn(store);
    req.onsuccess = () => resolve(req.result as T);
    req.onerror = () => reject(req.error);
  }));
}

export class WebStorage implements StoragePort {
  async loadData<T>(key: string = MAIN_KEY): Promise<T | null> {
    const v = await tx<T | undefined>('readonly', s => s.get(key));
    return v ?? null;
  }
  async saveData<T>(data: T, key: string = MAIN_KEY): Promise<void> {
    await tx<IDBValidKey>('readwrite', s => s.put(data, key));
  }
  async keys(): Promise<string[]> {
    const ks = await tx<IDBValidKey[]>('readonly', s => s.getAllKeys());
    return ks.map(String);
  }
  async delete(key: string): Promise<void> {
    await tx<undefined>('readwrite', s => s.delete(key));
  }
}
