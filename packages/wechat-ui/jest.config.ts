// eslint-disable-next-line ts/no-var-requires, ts/no-require-imports
const defineJestConfig = require('@tarojs/test-utils-react/dist/jest.js').default

// eslint-disable-next-line antfu/no-cjs-exports
module.exports = defineJestConfig({
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/__tests__/?(*.)+(spec|test).[jt]s?(x)'],
})
