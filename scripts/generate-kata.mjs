/**
 * generate-kata.mjs — author-side driver for the core's MissionGenerator.
 *
 * This is the consumer half of the arrangement: everything the core refuses to
 * know lives here — the endpoint, the model, the retry policy, and the fact
 * that HTTP is involved at all. The core gets an LlmPort and hands back a
 * validated drill or a typed refusal.
 *
 * Drafts land in packages/content/src/_drafts/, which build.mjs does not scan.
 * Nothing reaches the SSOT until a human moves it into src/content/ — at which
 * point the three existing content gates apply unchanged.
 *
 *   node scripts/generate-kata.mjs --category text-objects --difficulty 2
 *
 * No new dependency: esbuild is already hoisted, and is used the same way
 * gen-manual.mjs uses it — to strip types so the core module can be imported.
 * Note the consequence: this file itself is never type-checked, so it stays
 * thin on purpose.
 */
import { build } from 'esbuild';
import { readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const KATAS = join(ROOT, 'packages', 'content', 'src', 'content', 'KATAS');
const DRAFTS = join(ROOT, 'packages', 'content', 'src', '_drafts');

// ── args ────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const arg = (name, fallback = null) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};

const category = arg('category', 'text-objects');
const difficulty = Number(arg('difficulty', '2'));
const glitchCount = Number(arg('glitches', '6'));
const theme = arg('theme') ?? undefined;
const tries = Number(arg('tries', '3'));
const timeoutMs = Number(arg('timeout', '300')) * 1000;
const endpoint = (arg('endpoint') ?? process.env.NEUROVIM_LLM_ENDPOINT ?? 'http://127.0.0.1:1234/v1')
  .replace(/\/$/, '');
let model = arg('model') ?? process.env.NEUROVIM_LLM_MODEL ?? null;

// ── the port, fulfilled with fetch ──────────────────────────────────
/** Ask the endpoint what it serves, so no model id is hard-wired here. */
async function firstServedModel() {
  const res = await fetch(`${endpoint}/models`);
  const body = await res.json();
  const id = body?.data?.[0]?.id;
  if (!id) throw new Error(`${endpoint}/models served no model`);
  return id;
}

/** LlmPort: one completion, transport-neutral failures. Non-streaming — the
 *  core's onToken is optional, and an author has nobody to stream to. */
const llmPort = {
  async complete(messages) {
    try {
      const res = await fetch(`${endpoint}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages, temperature: 0.8, stream: false }),
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!res.ok) {
        return { ok: false, kind: 'failed', detail: `HTTP ${res.status}`, partial: '' };
      }
      const body = await res.json();
      const raw = body?.choices?.[0]?.message?.content ?? '';
      // Reasoning suppression is consumer business — Slice A deliberately left
      // it below the port. A qwen3-class model narrates in <think> blocks that
      // are prose, not answer.
      const content = raw.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
      if (!content) return { ok: false, kind: 'failed', detail: 'empty completion', partial: '' };
      return { ok: true, content };
    } catch (e) {
      // The port's own vocabulary: a deadline we set is 'timeout', an endpoint
      // that never answered is 'unavailable'.
      const kind = e?.name === 'TimeoutError' ? 'timeout' : 'unavailable';
      return { ok: false, kind, detail: String(e?.message ?? e), partial: '' };
    }
  },
};

// ── core module, types stripped ─────────────────────────────────────
async function loadCore() {
  const out = join(tmpdir(), `neurovim-generator-${process.pid}.mjs`);
  await build({
    entryPoints: [join(ROOT, 'packages', 'core', 'src', 'llm', 'MissionGenerator.ts')],
    outfile: out, bundle: true, format: 'esm', platform: 'node', logLevel: 'silent',
  });
  return import(`file://${out}`);
}

// ── naming ──────────────────────────────────────────────────────────
const nextKataId = () => {
  const seen = [KATAS, DRAFTS]
    .filter(existsSync)
    .flatMap(d => readdirSync(d))
    .map(f => /^KATA-(\d+)/.exec(f))
    .filter(Boolean)
    .map(m => Number(m[1]));
  return `KATA-${String(Math.max(0, ...seen) + 1).padStart(2, '0')}`;
};

const slug = (title) => title.trim().replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '');

// ── run ─────────────────────────────────────────────────────────────
const { MissionGenerator, renderKataMarkdown } = await loadCore();

if (!model) {
  try {
    model = await firstServedModel();
  } catch (e) {
    console.error(`✗ no model: ${e.message}\n  set --model, or --endpoint / NEUROVIM_LLM_ENDPOINT`);
    process.exit(1);
  }
}

const generator = new MissionGenerator(llmPort);
const spec = { category, difficulty, glitchCount, theme };
const missionId = nextKataId();

console.log(`→ ${missionId}  ${category} · difficulty ${difficulty} · ${glitchCount} glitches`);
console.log(`  ${model} @ ${endpoint}`);

let result = null;
for (let attempt = 1; attempt <= tries; attempt++) {
  result = await generator.generate(spec, missionId);
  if (result.ok) break;
  console.log(`  attempt ${attempt}/${tries} refused — ${result.reason}: ${result.detail}`);
  // Refusals that cannot improve by asking again: stop spending calls.
  if (result.reason === 'unsupported-category') break;
}

if (!result.ok) {
  console.error(`✗ ${result.reason}: ${result.detail}`);
  process.exit(1);
}

mkdirSync(DRAFTS, { recursive: true });
const name = `${missionId}-%s-${slug(result.kata.frontmatter.title)}.md`;
const tPath = join(DRAFTS, name.replace('%s', 'TRANSMISSION'));
const sPath = join(DRAFTS, name.replace('%s', 'SOLUTION'));
writeFileSync(tPath, renderKataMarkdown(result.kata));
writeFileSync(sPath, result.kata.solution + '\n');

console.log(`✓ ${result.kata.frontmatter.title} — ${result.kata.glitches.length} glitches`);
for (const g of result.kata.glitches) console.log(`    ${g.id}  ${g.type.padEnd(19)} ${g.hint}`);
console.log(`  ${tPath.slice(ROOT.length + 1)}`);
console.log(`  ${sPath.slice(ROOT.length + 1)}`);
console.log('  review, then move both into packages/content/src/{content/KATAS,solutions}/');
