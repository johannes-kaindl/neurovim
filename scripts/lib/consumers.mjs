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

/**
 * Turns one consumer's raw measurements into a verdict.
 * A modified copy is a contract breach and outranks everything else;
 * a stale pin is the normal state of a consumer with its own release cadence.
 * @param {{ name: string, found: boolean, pin?: string, commitsSincePin?: number, differences?: string[] }} input
 * @returns {{ name: string, status: 'skipped' | 'ok' | 'stale' | 'violated', message: string }}
 */
export function classifyConsumer(input) {
  const { name, found, pin, commitsSincePin = 0, differences = [] } = input;

  if (!found) {
    return { name, status: 'skipped', message: 'not found on disk — skipped' };
  }
  if (differences.length > 0) {
    return {
      name,
      status: 'violated',
      message: `vendored copy differs from pin ${pin}: ${differences.join(', ')}`,
    };
  }
  if (commitsSincePin > 0) {
    const plural = commitsSincePin === 1 ? 'commit' : 'commits';
    return {
      name,
      status: 'stale',
      message: `pin ${pin} is ${commitsSincePin} ${plural} behind the vendor surface`,
    };
  }
  return { name, status: 'ok', message: `pin ${pin} is current and verbatim` };
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
 * @param {Array<{ name: string, what: string, status: string, message: string, pin?: string, tag?: string | null }>} results
 * @returns {string}
 */
export function renderConsumersMd(results) {
  const rows = results.map((r) => {
    const pin = r.tag ? `${r.tag} (${(r.pin ?? '').slice(0, 7)})` : (r.pin ?? '').slice(0, 7) || '—';
    return `| ${r.name} | ${r.what} | ${pin} | ${STATUS_LABEL[r.status] ?? r.status} | ${r.message} |`;
  });

  return [
    '# CONSUMERS — who vendors this core',
    '',
    '> **GENERATED — do not edit by hand.** Regenerate with `npm run check:consumers`.',
    '>',
    '> A stale pin is normal: consumers have their own release cadence and re-vendor',
    '> when it suits them. A contract breach is not — it means a vendored copy was',
    '> edited in place, which the next re-vendor would silently discard.',
    '',
    '| Consumer | What | Pin | Status | Detail |',
    '|---|---|---|---|---|',
    ...rows,
    '',
    'The vendor surface is `packages/core/src` + `packages/content/src`.',
    'See `README.md` § Consumers for the contract and `AGENTS.md` § Upstream contract',
    'for the back-flow rule.',
    '',
  ].join('\n');
}
