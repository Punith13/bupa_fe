// In jest.config.js
module.exports = {
  verbose: true,
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  modulePathIgnorePatterns: ["<rootDir>/server/"],
};
