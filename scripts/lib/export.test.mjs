import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildExport, serializeExport, missionRecord } from './export.mjs';
import { loadTs } from './load-ts.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const FILE = join(ROOT, 'packages', 'content', 'export', 'neurovim-data.json');
const exp = await buildExport(ROOT);
const content = await loadTs(join(ROOT, 'packages', 'content', 'src', 'index.ts'));

test('committed export is current — run `npm run build:content` after a content change', () => {
  assert.equal(readFileSync(FILE, 'utf8'), serializeExport(exp));
});

test('building twice is byte-identical', async () => {
  assert.equal(serializeExport(await buildExport(ROOT)), serializeExport(exp));
});

test('every playable mission is exported with its solution and objective', () => {
  const ids = content.listMissions().map((m) => m.mission_id);
  assert.deepEqual(exp.missions.map((m) => m.id), ids);
  for (const m of exp.missions) {
    assert.equal(typeof m.solution, 'string', m.id);
    assert.ok(m.solution.length > 0, m.id);
    assert.ok(Array.isArray(m.objective) && m.objective.length > 0, m.id);
  }
});

test('mission text survives unchanged, unicode included', () => {
  for (const m of exp.missions) {
    const src = content.getMission(m.id);
    assert.equal(m.transmission, src.transmissionBody, m.id);
    assert.equal(m.briefing, src.briefingBody, m.id);
    assert.equal(m.solution, src.solution, m.id);
  }
  assert.ok(exp.missions.some((m) => m.transmission.includes('╔')), 'no box-drawing mission found — check is vacuous');
});

test('a mission without a solution is refused, not exported without one', () => {
  const summary = { mission_id: 'X-01', title: 't', category: 'c', tier: '', xp_reward: 1, arc: 'I', chapter: '.' };
  assert.throws(() => missionRecord(summary, { ...summary, transmissionBody: 'a', briefingBody: '', solution: undefined }), /X-01/);
});

test('tables come from the core', () => {
  assert.equal(exp.schema, 1);
  assert.equal(exp.levels[0].xp_required, 0);
  assert.deepEqual(exp.default_unlocked, ['M-01', 'M-02', 'M-03', 'M-04', 'KATA-01']);
  assert.deepEqual(exp.unlock_map['2'].missions.slice(0, 2), ['M-05', 'M-06']);
  assert.ok(exp.chapters.every((c) => c.missions.every((id) => typeof id === 'string')));
});
