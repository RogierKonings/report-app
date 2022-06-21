require('jest-preset-angular/global-setup');

const testMatch = '**/*(*.)@(spec|test).[tj]s?(x)';

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: [`<rootDir>/test-setup.ts`],
  globalSetup: 'jest-preset-angular/global-setup',
  testMatch: [testMatch],
  testPathIgnorePatterns: [
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/e2e/',
    '<rootDir>/node_modules/',
    'tsconfig.spec.ts',
  ],
  moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
  collectCoverage: true,
  coverageReporters: ['html'],
  transformIgnorePatterns: ['/node_modules/?!@angular'],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  },
  forceExit: true,
};
