// Pure helpers for the upstream-contract gate. No I/O lives here — see
// scripts/check-consumers.mjs for the shell that feeds these functions.

/**
 * Reads a consumer's VENDOR.json text and returns the pin it declares.
 * @param {string} text
 * @returns {{ pin: string, tag: string | null, version: string | null }}
 */
export function parseVendorPin(text) {
  const data = JSON.parse(text);
  if (typeof data.sha !== 'string' || data.sha.length === 0) {
    throw new Error('VENDOR.json declares no sha — cannot verify the pin.');
  }
  return {
    pin: data.sha,
    tag: typeof data.tag === 'string' ? data.tag : null,
    version: typeof data.version === 'string' ? data.version : null,
  };
}

const KINDS = new Set(['source', 'data']);

/**
 * What a consumer vendors. `source`: core/content code, verified verbatim — the consumer
 * runs it as is. `data`: the export and the conformance vectors, verified verbatim; the
 * consumer re-implements the rules and proves them with the vectors. A missing field means
 * `source` (every consumer before 2026-10 was one); a typo is refused, never guessed.
 * @returns {'source' | 'data'}
 */
export function consumerKind(consumer) {
  const kind = consumer.kind ?? 'source';
  if (!KINDS.has(kind)) throw new Error(`unknown kind "${kind}" for consumer ${consumer.name}`);
  return kind;
}

const CONSUMER_KEYS = new Set(['name', 'kind', 'what', 'path', 'vendorJson', 'dirs', 'files', 'provenanceHeader']);

/**
 * Refuses a consumer entry with a key the gate does not read. A misspelt `file` next to
 * a valid `dirs` would otherwise leave that file unchecked while the gate reports ok.
 */
export function assertConsumerShape(consumer) {
  for (const key of Object.keys(consumer)) {
    if (!CONSUMER_KEYS.has(key)) throw new Error(`unknown key "${key}" in consumer ${consumer.name}`);
  }
}

/**
 * The upstream paths a consumer copies. The pin lag is counted over these, not over the
 * whole surface: a data consumer is not behind because a Preact view changed.
 * @param {{ name: string, dirs?: [string, string][], files?: [string, string][] }} consumer
 * @param {string[]} surface
 * @returns {string[]}
 */
export function consumerSources(consumer, surface) {
  const sources = [...(consumer.dirs ?? []), ...(consumer.files ?? [])].map(([source]) => source);
  // An empty list would make `git log --` and `git archive --` cover the whole repo and
  // the copy loops compare nothing: the gate would report ok without checking anything.
  if (sources.length === 0) throw new Error(`consumer ${consumer.name} maps no sources (dirs/files)`);
  for (const s of sources) {
    const inside = surface.some((root) => s === root || s.startsWith(root + '/'));
    if (!inside) throw new Error(`${s} (consumer ${consumer.name}) is outside the vendor surface`);
  }
  return sources;
}

/**
 * Splits a vendored copy into the provenance preamble its consumer declares and
 * the body that must still match the source byte for byte.
 *
 * Why this is not a plain `slice(lines)`: skipping the first line unchecked would
 * let any edit hide there — the gate would wave through exactly the change it
 * exists to catch. The declared lines are therefore *verified* against the
 * pattern, not ignored. A consumer without a declaration is unaffected: the
 * contract stays byte-identical for everyone who has not asked for otherwise.
 *
 * @param {string} text the vendored copy, as read from the consumer
 * @param {{ lines: number, mustMatch: string } | undefined} header the consumer's
 *   `provenanceHeader` declaration from consumers.json; undefined means none
 * @returns {{ ok: true, body: string } | { ok: false, reason: string }}
 */
export function splitProvenanceHeader(text, header) {
  if (header === undefined || header === null) return { ok: true, body: text };
  // No defaults: an incomplete declaration is a configuration error, and
  // guessing one half of it would silently weaken the check it configures.
  if (typeof header.lines !== 'number') {
    throw new Error('provenanceHeader declares no lines — refusing to guess.');
  }
  if (typeof header.mustMatch !== 'string') {
    throw new Error('provenanceHeader declares no mustMatch — refusing to guess.');
  }

  const pattern = new RegExp(header.mustMatch);
  let cut = 0;
  for (let i = 0; i < header.lines; i += 1) {
    const end = text.indexOf('\n', cut);
    if (end === -1) {
      return { ok: false, reason: `file is shorter than the declared ${header.lines}-line header` };
    }
    if (!pattern.test(text.slice(cut, end))) {
      return { ok: false, reason: `line ${i + 1} does not match the declared provenance pattern` };
    }
    cut = end + 1;
  }
  return { ok: true, body: text.slice(cut) };
}

/**
 * Turns one consumer's raw measurements into a verdict.
 * A modified copy is a contract breach and outranks everything else;
 * a stale pin is the normal state of a consumer with its own release cadence.
 *
 * `differences` and `headerViolations` are both breaches but not the same one, and
 * the message says which: a differing body means someone edited the copy, a broken
 * preamble means the copy no longer carries the provenance it declares. Reporting
 * the second as the first accuses a consumer of hand-editing when its sync script
 * has written a declared header.
 * @param {{ name: string, found: boolean, pin?: string, commitsSincePin?: number, differences?: string[], headerViolations?: string[] }} input
 * @returns {{ name: string, status: 'skipped' | 'ok' | 'stale' | 'violated', message: string }}
 */
export function classifyConsumer(input) {
  const { name, found, pin, commitsSincePin = 0, differences = [], headerViolations = [], kind = 'source' } = input;
  const suite = kind === 'data' ? "; logic is proven by the consumer's conformance suite" : '';

  if (!found) {
    return { name, status: 'skipped', message: 'not found on disk — skipped' };
  }
  if (differences.length > 0 || headerViolations.length > 0) {
    const parts = [];
    if (differences.length > 0) parts.push(`vendored copy differs from pin ${pin}: ${differences.join(', ')}`);
    if (headerViolations.length > 0) parts.push(`declared provenance header is not intact: ${headerViolations.join(', ')}`);
    return { name, status: 'violated', message: parts.join('; ') };
  }
  if (commitsSincePin > 0) {
    const plural = commitsSincePin === 1 ? 'commit' : 'commits';
    return {
      name,
      status: 'stale',
      message: `pin ${pin} is ${commitsSincePin} ${plural} behind the vendor surface${suite}`,
    };
  }
  return { name, status: 'ok', message: `pin ${pin} is current and verbatim${suite}` };
}

/**
 * Compares two path→hash maps and returns every path that is not identical
 * in both — changed, missing from the copy, or present only in the copy.
 * @param {Map<string, string>} expected
 * @param {Map<string, string>} actual
 * @returns {string[]}
 */
export function diffTrees(expected, actual) {
  const paths = new Set([...expected.keys(), ...actual.keys()]);
  const differing = [];
  for (const path of paths) {
    if (expected.get(path) !== actual.get(path)) differing.push(path);
  }
  return differing.sort();
}

/**
 * @param {Array<{ status: string }>} results
 * @returns {0 | 1}
 */
export function overallExit(results) {
  return results.some((r) => r.status === 'violated') ? 1 : 0;
}

const STATUS_LABEL = {
  ok: '✅ ok',
  stale: '🟡 stale pin',
  violated: '❌ contract breach',
  skipped: '⚪ skipped',
};

/**
 * @param {Array<{ name: string, what: string, kind?: string, status: string, message: string, pin?: string, tag?: string | null }>} results
 * @param {string[]} surface the vendor surface from consumers.json
 * @returns {string}
 */
export function renderConsumersMd(results, surface) {
  const rows = results.map((r) => {
    const pin = r.tag ? `${r.tag} (${(r.pin ?? '').slice(0, 7)})` : (r.pin ?? '').slice(0, 7) || '—';
    return `| ${r.name} | ${r.kind ?? 'source'} | ${r.what} | ${pin} | ${STATUS_LABEL[r.status] ?? r.status} | ${r.message} |`;
  });

  return [
    '# CONSUMERS — who vendors this core',
    '',
    '> **GENERATED — do not edit by hand.** Regenerate with `npm run check:consumers`.',
    '>',
    '> A stale pin is normal: consumers have their own release cadence and re-vendor',
    '> when it suits them. A contract breach is not — it means a vendored copy was',
    '> edited in place, which the next re-vendor would silently discard.',
    '>',
    '> Kind `source`: the consumer runs the vendored code. Kind `data`: it vendors the export and the conformance vectors and re-implements the rules, proven by those vectors.',
    '',
    '| Consumer | Kind | What | Pin | Status | Detail |',
    '|---|---|---|---|---|---|',
    ...rows,
    '',
    `The vendor surface is ${surface.map((s) => `\`${s}\``).join(' + ')}.`,
    'See `README.md` § Consumers for the contract and `AGENTS.md` § Upstream contract',
    'for the back-flow rule.',
    '',
  ].join('\n');
}
