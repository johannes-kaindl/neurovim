// ESLint flat config — covers all four workspaces from the repo root (PROF-TS-01).
// Type-aware linting is deliberately off: typecheck is a separate gate (tsc --noEmit),
// lint stays fast and dependency-light.
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '.remember/**',
      '.claude/**',
      'claude/**',
      'packages/content/src/generated/**', // build artifacts (build.mjs output)
      'packages/adapter-web/src-tauri/target/**',
      'docs/design-source/**', // design delivery snapshot, not maintained code
      'experiments/**', // throwaway harnesses
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // tsc already errors on unused locals; keep lint aligned but allow _-prefixed
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // plain-JS build/config scripts run under Node (jest.config.cjs, build.mjs, esbuild.config.mjs)
    files: ['**/*.cjs', '**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' },
  },
  {
    // tests assert against known fixtures — loose typing of mock plumbing is fine there
    files: ['**/test/**', '**/*.test.ts', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
    },
  },
);
