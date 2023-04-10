import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: ["src/utils/**/*.ts"],
  coverageReporters: ["html-spa"],
  moduleDirectories: ["node_modules", "<rootDir>"],
  modulePathIgnorePatterns: ["dist"],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/globalSetup.ts"],
  verbose: true,
};

export default config;
