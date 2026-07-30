import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// Standalone web app. react→preact via preset; @neurovim/* from the monorepo source.
export default defineConfig({
  base: './', // relative paths → deployable under sub-paths (Forgejo/GitHub Pages).
  plugins: [preact()],
  resolve: {
    alias: {
      '@neurovim/core': new URL('../core/src/index.ts', import.meta.url).pathname,
      '@neurovim/content': new URL('../content/src/index.ts', import.meta.url).pathname,
    },
    // CM6 breaks with "multiple instances of @codemirror/state" once state/view
    // get resolved twice (monorepo: @codemirror/commands pulls a nested copy).
    // Force a single instance — otherwise EditorState.create throws (instanceof).
    dedupe: ['@codemirror/state', '@codemirror/view'],
  },
  build: {
    outDir: 'dist',
    target: 'es2018',
    sourcemap: false,
  },
});
