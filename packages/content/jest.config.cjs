module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@neurovim/core$': '<rootDir>/../core/src/index.ts',
    '^react$': 'preact/compat',
    '^react-dom$': 'preact/compat',
    '^react/jsx-runtime$': 'preact/jsx-runtime',
  },
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        module: 'commonjs',
        esModuleInterop: true,
        strictNullChecks: true,
        strict: false,
        resolveJsonModule: true,
        types: ['jest', 'node'],
      },
    }],
  },
};
