// CJS (.cjs) weil package.json "type": "module" — jest-Config muss CommonJS sein.
// Aus Bestand-Plugin übernommen; obsidian-Mapping entfällt (core hat keinen obsidian-Import).
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^react$': 'preact/compat',
    '^react-dom/client$': 'preact/compat/client',
    '^react-dom$': 'preact/compat',
    '^react/jsx-runtime$': 'preact/jsx-runtime',
  },
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        jsxImportSource: 'preact',
        module: 'commonjs',
        esModuleInterop: true,
        strictNullChecks: true,
        strict: false,
        // tsconfig.base setzt types:[] (deaktiviert Auto-Include) — jest/node hier explizit.
        types: ['jest', 'node'],
      },
    }],
  },
};
