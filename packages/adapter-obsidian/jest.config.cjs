// CJS weil package.json "type": "module". Adapter-Tests brauchen obsidian-Mock.
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^obsidian$': '<rootDir>/test/__mocks__/obsidian.ts',
    '^@neurovim/core$': '<rootDir>/../core/src/index.ts',
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
        types: ['jest', 'node'],
      },
    }],
  },
};
