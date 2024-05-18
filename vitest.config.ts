import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    css: true,
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src"],
      exclude: ["src/App.tsx", "src/**/*.d.ts"],
    },
  },
});
