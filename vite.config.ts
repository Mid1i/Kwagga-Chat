import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";


const SCSS_FILES = [
  "colors",
  "layers",
  "sizes",
  "default",
  "durations",
  "typography",
  "mixins",
];

export default defineConfig({
  plugins: [vue()],
  build: {
    assetsInlineLimit: 0
  },
  assetsInclude: ["**/*.svg"],
  resolve: {
    alias: {
      "@/": "/src/"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: SCSS_FILES.map(el => `@use "@/design/${el}" as *;`).join("\n")
      }
    }
  }
});
