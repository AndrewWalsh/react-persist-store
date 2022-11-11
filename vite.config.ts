/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [
    peerDepsExternal(),
    react(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "react-persist-store",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {},
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
