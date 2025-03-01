import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";


export default defineConfig({
  plugins: [vue()],
  build: {
    assetsInlineLimit: 0
  },
  assetsInclude: ["**/*.svg"],
  resolve: {
    alias: {
      "@/": "/src/",
      "@/assets": "/src/assets",
      "@/components": "/src/components",
      "@/helpers": "/src/helpers",
      "@/hooks": "/src/hooks",
      "@/interfaces": "/src/interfaces",
      "@/router": "/src/router",
      "@/store": "/src/store",
      "@/types": "/src/types",
      "@/views": "/src/views"
    }
  }
});
