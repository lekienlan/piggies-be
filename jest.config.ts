import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['dist'],
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/src/test/prismaMock.ts'],
  coverageReporters: ['text', 'lcov'],
  coverageProvider: 'v8'

}

export default jestConfig