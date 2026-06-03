// CJS because package.json has "type": "module". Mirrors core/adapter-obsidian.
// @neurovim/* mapped to monorepo source — jest does not transform node_modules,
// so the workspace symlinks (which point at raw .ts) must be redirected here.
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@neurovim/core$': '<rootDir>/../core/src/index.ts',
    '^@neurovim/content$': '<rootDir>/../content/src/index.ts',
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
