import esbuild from 'esbuild';
import process from 'process';
import builtins from 'builtin-modules';

const prod = process.argv[2] === 'production';

const ctx = await esbuild.context({
  entryPoints: ['src/main.ts'],
  bundle: true,
  external: [
    'obsidian', 'electron',
    '@codemirror/autocomplete', '@codemirror/collab', '@codemirror/commands',
    '@codemirror/language', '@codemirror/lint', '@codemirror/search',
    '@codemirror/state', '@codemirror/view',
    '@lezer/common', '@lezer/highlight', '@lezer/lr',
    ...builtins,
  ],
  format: 'cjs',
  target: 'es2018',
  logLevel: 'info',
  sourcemap: prod ? false : 'inline',
  treeShaking: true,
  // Output into the local dist/ — NOT into the vault. Jay does the plugin swap manually.
  outfile: 'dist/main.js',
  jsx: 'automatic',
  jsxImportSource: 'preact',
  alias: {
    'react': 'preact/compat',
    'react-dom/client': 'preact/compat/client',
    'react-dom': 'preact/compat',
    'react/jsx-runtime': 'preact/jsx-runtime',
  },
});

if (prod) { await ctx.rebuild(); process.exit(0); }
else { await ctx.watch(); }
