/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "roots": ["./__tests__/"],
  "testMatch": ["**/*.test.ts"],
  "moduleDirectories": ['node_modules', 'C:/Steam/steamapps/common/Skyrim Special Edition/Data/Platform/Modules'],
  "moduleNameMapper": {
    "@Modules/(.*)": "C:/Steam/steamapps/common/Skyrim Special Edition/Data/Platform/Modules/$1",
  }
};