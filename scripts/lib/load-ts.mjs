// Load a TypeScript module from the workspace into a Node script. esbuild bundles the
// module with its relative imports and strips the types; the result is imported from a
// data URL, so nothing is written to disk. Shared by every generator under scripts/.
import { build } from 'esbuild';

/** @param {string} absPath @returns {Promise<Record<string, any>>} */
export async function loadTs(absPath) {
  const result = await build({
    entryPoints: [absPath],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    logLevel: 'silent',
  });
  const code = result.outputFiles[0].text;
  return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
}
