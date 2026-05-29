// CJS (.cjs) because package.json "type": "module" — jest config must be CommonJS.
// Taken from the legacy plugin; obsidian mapping is omitted (core has no obsidian import).
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
        // tsconfig.base sets types:[] (disables auto-include) — jest/node specified explicitly here.
        types: ['jest', 'node'],
      },
    }],
  },
};
