/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./__tests__/'],
  testMatch: ['**/*.test.ts'],
  moduleDirectories: [
    'node_modules',
    'C:/Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules'
  ],
  moduleNameMapper: {
    '@SkyrimPlatform/(.*)': 'C:/Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/$1',
    '@Helpers/(.*)': './__tests__/helpers/$1'
  }
}
