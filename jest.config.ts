/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testTimeout: 100000,
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
};
