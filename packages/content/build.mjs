/**
 * Content-Build (Phase 3 Schritt 3, D15).
 * Liest alle Markdown unter src/content/, parsed Frontmatter (gray-matter),
 * klassifiziert (mission/lore) und generiert ein typisiertes TS-Manifest
 * src/generated/content.ts. Bundler-tauglich (kein Runtime-fs) → web-fähig.
 */
import { readdirSync, readFileSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const ROOT = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(ROOT, 'src', 'content');
const OUT_DIR = join(ROOT, 'src', 'generated');
const OUT_FILE = join(OUT_DIR, 'content.ts');

/** Rekursiver Walk über alle .md-Files. */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

/** Rolle + Kind aus Pfad/Frontmatter ableiten. */
function classify(relPath, fm) {
  const file = basename(relPath);
  if (file.includes('-BRIEFING-')) return { kind: 'mission', role: 'briefing' };
  if (relPath.includes('/KATAS/')) return { kind: 'mission', role: 'kata' };
  if (file.includes('-TRANSMISSION-')) return { kind: 'mission', role: 'transmission' };
  if (relPath.includes('/LOOT/') || fm.loot_id) return { kind: 'lore', role: 'loot' };
  if (relPath.includes('/FRAGMENTS/')) return { kind: 'lore', role: 'fragment' };
  if (relPath.includes('/REF/')) return { kind: 'lore', role: 'ref' };
  return { kind: 'lore', role: 'ref' };
}

/** ID ermitteln: mission_id | loot_id | Filename-Präfix (M|R|KATA)-NN | Dateiname.
 *  Briefings haben KEIN mission_id im Frontmatter — ihre Mission-ID steckt im
 *  Dateinamen (M-01-BRIEFING-...) und muss zur Transmission (mission_id M-01) passen. */
function deriveId(file, fm) {
  if (fm.mission_id) return String(fm.mission_id);
  if (fm.loot_id) return String(fm.loot_id);
  const m = basename(file, '.md').match(/^((?:M|R|KATA)-\d+)/);
  if (m) return m[1];
  return basename(file, '.md');
}

const files = walk(CONTENT_DIR).sort();
const entries = [];
for (const abs of files) {
  const rel = abs.slice(CONTENT_DIR.length); // führender / bleibt für classify-Checks
  const raw = readFileSync(abs, 'utf8');
  const { data: fm, content: body } = matter(raw);
  const { kind, role } = classify(rel, fm);
  entries.push({
    id: deriveId(abs, fm),
    role,
    kind,
    arc: /^R-/.test(String(fm.mission_id ?? '')) ? 'II' : 'I',
    chapter: dirname(rel).replace(/^\//, '') || '.',
    frontmatter: fm,
    body: body.trim(),
    path: rel.replace(/^\//, ''),
  });
}

// Solutions (clean target text für MissionEngine.verify) — D18.
const SOLUTIONS_DIR = join(ROOT, 'src', 'solutions');
try {
  for (const abs of walk(SOLUTIONS_DIR).sort()) {
    const raw = readFileSync(abs, 'utf8');
    const { data: fm, content: body } = matter(raw);
    const m = basename(abs, '.md').match(/^((?:M|R|KATA)-\d+)/);
    entries.push({
      id: m ? m[1] : basename(abs, '.md'),
      role: 'solution',
      kind: 'mission',
      arc: m && m[1].startsWith('R-') ? 'II' : 'I',
      chapter: 'solutions',
      frontmatter: fm,
      body: body.trim(),
      path: 'solutions/' + basename(abs),
    });
  }
} catch { /* solutions/ optional */ }

mkdirSync(OUT_DIR, { recursive: true });

// Sandbox (THE RAVEN, M-08) — Original-Text + Glitch-Pool als typisierte Exports.
const SANDBOX_DIR = join(ROOT, 'src', 'sandbox');
try {
  const ravenOriginal = readFileSync(join(SANDBOX_DIR, 'raven-original.md'), 'utf8').replace(/\s+$/, '');
  const glitchPool = JSON.parse(readFileSync(join(SANDBOX_DIR, 'raven-glitches.json'), 'utf8'));
  const sandboxOut =
    `// AUTO-GENERATED von build.mjs — NICHT manuell editieren.\n` +
    `// Quelle: src/sandbox/ (THE RAVEN). Regenerieren: npm run build --workspace @neurovim/content\n\n` +
    `import type { GlitchDefinition } from '@neurovim/core';\n\n` +
    `export const RAVEN_ORIGINAL = ${JSON.stringify(ravenOriginal)};\n\n` +
    `export const RAVEN_GLITCH_POOL: GlitchDefinition[] = ${JSON.stringify(glitchPool, null, 2)};\n`;
  writeFileSync(join(OUT_DIR, 'sandbox.ts'), sandboxOut);
  console.log(`[content build] sandbox → ${glitchPool.length} glitches, ${ravenOriginal.length} chars original`);
} catch (e) {
  console.warn('[content build] sandbox skip:', e.message);
}

// Welcome (Startseite) — player-facing Intro-Markdown.
try {
  const welcome = readFileSync(join(ROOT, 'src', 'welcome.md'), 'utf8').replace(/\s+$/, '');
  writeFileSync(join(OUT_DIR, 'welcome.ts'),
    `// AUTO-GENERATED von build.mjs — NICHT manuell editieren.\n` +
    `// Quelle: src/welcome.md. Regenerieren: npm run build --workspace @neurovim/content\n\n` +
    `export const WELCOME_BODY = ${JSON.stringify(welcome)};\n`);
  console.log(`[content build] welcome → ${welcome.length} chars`);
} catch (e) {
  console.warn('[content build] welcome skip:', e.message);
}

const header = `// AUTO-GENERATED von build.mjs — NICHT manuell editieren.\n` +
  `// Quelle: src/content/*.md (SSOT). Regenerieren: npm run build --workspace @neurovim/content\n` +
  `// Generiert: ${entries.length} Einträge.\n\n` +
  `export interface RawContentEntry {\n` +
  `  id: string;\n` +
  `  role: 'briefing' | 'transmission' | 'kata' | 'loot' | 'fragment' | 'ref' | 'solution';\n` +
  `  kind: 'mission' | 'lore';\n` +
  `  arc: 'I' | 'II';\n` +
  `  chapter: string;\n` +
  `  frontmatter: Record<string, unknown>;\n` +
  `  body: string;\n` +
  `  path: string;\n` +
  `}\n\n`;
writeFileSync(OUT_FILE, header + `export const ENTRIES: RawContentEntry[] = ${JSON.stringify(entries, null, 2)};\n`);

const byRole = entries.reduce((a, e) => ((a[e.role] = (a[e.role] ?? 0) + 1), a), {});
console.log(`[content build] ${entries.length} Einträge →`, byRole);
console.log(`[content build] → ${OUT_FILE}`);
