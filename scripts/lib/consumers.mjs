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
