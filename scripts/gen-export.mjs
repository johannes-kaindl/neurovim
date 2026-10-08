// Writes packages/content/export/neurovim-data.json. Part of `npm run build:content`.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildExport, serializeExport } from './lib/export.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'packages', 'content', 'export');
mkdirSync(DIR, { recursive: true });
const e = await buildExport(ROOT);
writeFileSync(join(DIR, 'neurovim-data.json'), serializeExport(e));
console.log(`[export] schema ${e.schema}: ${e.missions.length} missions, ${e.chapters.length} chapters → ${DIR}`);
