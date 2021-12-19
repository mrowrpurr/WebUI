/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "roots": ["./__tests__/"],
  "testMatch": ["**/*.test.ts"]
};