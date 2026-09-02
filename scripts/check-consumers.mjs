#!/usr/bin/env node
// check-consumers.mjs — upstream-contract gate.
//
// For every consumer in consumers.json, measures two things:
//   1. how far its vendor pin lags behind the vendor surface, and
//   2. whether its vendored copy is still verbatim at that pin.
//
// Exit 1 ONLY on a verbatim violation. A stale pin is a note, not a failure:
// consumers have their own release cadence, and making staleness red would
// force a consumer release for every core commit — the exact coupling that
// vendoring exists to avoid. A consumer that is not on disk is skipped, so
// the gate stays green on CI and in foreign clones.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdtempSync, rmSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { parseVendorPin, classifyConsumer, diffTrees, overallExit, renderConsumersMd, splitProvenanceHeader } from './lib/consumers.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(join(repoRoot, 'consumers.json'), 'utf8'));

// Hashing a file, in the two shapes the contract allows.
//
// Without a declared provenance header the file is hashed as raw bytes — no
// encoding is assumed and the comparison is byte-exact, exactly as before.
// With one, both sides are read as UTF-8 text so the declared preamble can be
// verified and cut off; that assumption is bought by the declaration itself
// (whoever writes a comment line on top has a text file), and it never reaches
// a consumer that did not ask for it.
function hashFile(path, header) {
  if (!existsSync(path)) return { hash: null };
  if (header === undefined) {
    return { hash: createHash('sha256').update(readFileSync(path)).digest('hex') };
  }
  const split = splitProvenanceHeader(readFileSync(path, 'utf8'), header);
  if (!split.ok) return { hash: null, reason: split.reason };
  return { hash: createHash('sha256').update(Buffer.from(split.body, 'utf8')).digest('hex') };
}

/** Recursively maps every file under `root` to a hash, plus the files whose
 *  declared preamble is not what it claims to be. */
function hashTree(root, header) {
  const hashes = new Map();
  const broken = new Map();
  if (!existsSync(root)) return { hashes, broken };
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else {
        const rel = relative(root, full);
        const { hash, reason } = hashFile(full, header);
        if (reason !== undefined) broken.set(rel, reason);
        else hashes.set(rel, hash);
      }
    }
  };
  walk(root);
  return { hashes, broken };
}

/**
 * Extracts the vendor surface as it stood at `pin` into a scratch directory.
 * Limited to the surface paths — archiving the whole repo on every gate run
 * would be wasted work.
 */
function extractPin(pin) {
  const dir = mkdtempSync(join(tmpdir(), 'nv-pin-'));
  execFileSync('git', ['archive', '--format=tar', pin, '-o', join(dir, 'pin.tar'), '--', ...config.surface], { cwd: repoRoot });
  execFileSync('tar', ['-xf', join(dir, 'pin.tar'), '-C', dir]);
  return dir;
}

const results = [];

for (const consumer of config.consumers) {
  const root = resolve(repoRoot, consumer.path);
  const vendorJson = join(root, consumer.vendorJson);

  if (!existsSync(vendorJson)) {
    results.push({ ...classifyConsumer({ name: consumer.name, found: false }), what: consumer.what });
    continue;
  }

  const { pin, tag, version } = parseVendorPin(readFileSync(vendorJson, 'utf8'));

  // No initialisers: the try below assigns both, and its catch bails out with
  // `continue`, so any initial value would be dead.
  let commitsSincePin;
  let pinDir;
  try {
    const log = execFileSync('git', ['log', '--oneline', `${pin}..HEAD`, '--', ...config.surface], {
      cwd: repoRoot,
      encoding: 'utf8',
    });
    commitsSincePin = log.trim() === '' ? 0 : log.trim().split('\n').length;
    pinDir = extractPin(pin);
  } catch {
    results.push({
      ...classifyConsumer({ name: consumer.name, found: false }),
      what: consumer.what,
      message: `pin ${pin} is not reachable in this clone — skipped`,
    });
    continue;
  }

  // The source side is never read through the header lens: the preamble exists
  // only in the copy. Comparing the copy's body against the source's whole file
  // is the point — that is what "verbatim below the stamp" means.
  const header = consumer.provenanceHeader;
  const differences = [];
  const headerViolations = [];
  try {
    for (const [source, copy] of consumer.dirs ?? []) {
      const expected = hashTree(join(pinDir, source), undefined);
      const actual = hashTree(join(root, copy), header);
      for (const [rel, reason] of actual.broken) headerViolations.push(`${copy}/${rel}: ${reason}`);
      differences.push(...diffTrees(expected.hashes, actual.hashes).map((p) => `${copy}/${p}`));
    }
    for (const [source, copy] of consumer.files ?? []) {
      const expected = hashFile(join(pinDir, source), undefined);
      const actual = hashFile(join(root, copy), header);
      if (actual.reason !== undefined) headerViolations.push(`${copy}: ${actual.reason}`);
      else if (expected.hash !== actual.hash) differences.push(copy);
    }
  } finally {
    rmSync(pinDir, { recursive: true, force: true });
  }

  results.push({
    ...classifyConsumer({ name: consumer.name, found: true, pin, commitsSincePin, differences, headerViolations }),
    what: consumer.what,
    pin,
    tag,
    version,
  });
}

// Only an explicit `--write` regenerates the tracked report. Writing it from
// `npm test` would leave a dirty working tree after every single test run.
if (process.argv.includes('--write')) {
  writeFileSync(join(repoRoot, 'CONSUMERS.md'), renderConsumersMd(results));
}

for (const r of results) {
  const stream = r.status === 'violated' ? console.error : console.log;
  stream(`check-consumers: ${r.name} — ${r.status}: ${r.message}`);
}

const code = overallExit(results);
if (code === 1) {
  console.error('→ A vendored copy no longer matches its pin. Change it here and re-vendor there;');
  console.error('  never edit the copy. A consumer that stamps its copies declares that stamp as');
  console.error('  `provenanceHeader` in consumers.json — an undeclared one reads as an edit.');
}
process.exit(code);
