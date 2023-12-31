/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  testPathIgnorePatterns: [".js"],
  globals: {
    // when we are testing we want to use a slightly different config
    // to allow for jest types
    "ts-jest": {
      tsconfig: "<rootDir>/src/__tests__/tsconfig.json",
      useESM: true,
    },
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  moduleNameMapper: {
    "data.json": "<rootDir>/src/__tests__/mocks/data.json",
  },
  coverageProvider: "v8",
  collectCoverage: true,
};
