import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// Standalone-Web-App. react→preact via preset; @neurovim/* aus dem Monorepo-Source.
export default defineConfig({
  base: './', // relative Pfade → deploy-bar unter Unterpfaden (Codeberg/GitHub Pages).
  plugins: [preact()],
  resolve: {
    alias: {
      '@neurovim/core': new URL('../core/src/index.ts', import.meta.url).pathname,
      '@neurovim/content': new URL('../content/src/index.ts', import.meta.url).pathname,
    },
    // CM6 bricht mit "multiple instances of @codemirror/state" sobald state/view
    // doppelt aufgelöst werden (Monorepo: @codemirror/commands zieht eine nested
    // Kopie). Single-Instanz erzwingen — sonst wirft EditorState.create (instanceof).
    dedupe: ['@codemirror/state', '@codemirror/view'],
  },
  build: {
    outDir: 'dist',
    target: 'es2018',
    sourcemap: false,
  },
});
