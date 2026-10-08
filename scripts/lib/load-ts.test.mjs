import test from 'node:test';
import assert from 'node:assert/strict';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTs } from './load-ts.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

test('loadTs imports a TS module with its relative imports bundled', async () => {
  const mod = await loadTs(join(ROOT, 'packages', 'core', 'src', 'engine', 'ProgressionEngine.ts'));
  assert.equal(mod.ProgressionEngine.getLevelForXp(66), 2);
});

test('loadTs rejects a path that does not exist', async () => {
  await assert.rejects(loadTs(join(ROOT, 'does-not-exist.ts')));
});
