import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "aniwatch-api",
    environment: "node",
    testTimeout: 6000,
  },
});
