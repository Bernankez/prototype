import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      "@bernankez/prototype": path.resolve(__dirname, "../src"),
    },
  },
});
