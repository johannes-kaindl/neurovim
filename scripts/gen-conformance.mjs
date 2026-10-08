// Writes packages/core/conformance/<function>.json from the real TS core. Run after any
// change to a rule the vectors cover: `npm run build:conformance`.
import { mkdirSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCore, buildVectors, serializeVector } from './lib/conformance.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'packages', 'core', 'conformance');
mkdirSync(DIR, { recursive: true });
const vectors = buildVectors(await loadCore(ROOT));
for (const f of readdirSync(DIR)) if (f.endsWith('.json') && !(f.slice(0, -5) in vectors)) rmSync(join(DIR, f));
let cases = 0;
for (const [fn, v] of Object.entries(vectors)) {
  writeFileSync(join(DIR, `${fn}.json`), serializeVector(v));
  cases += v.cases.length;
}
console.log(`[conformance] ${Object.keys(vectors).length} functions, ${cases} cases → ${DIR}`);
