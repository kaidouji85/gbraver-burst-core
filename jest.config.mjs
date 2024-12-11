import { createDefaultPreset } from "ts-jest";

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["<rootDir>/lib/"],
  ...createDefaultPreset({
    tsconfig: "<rootDir>/tsconfig.test.json",
  }),
};