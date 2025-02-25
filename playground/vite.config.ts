import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "~": __dirname,
      "@bernankez/prototype": resolve(__dirname, "../src"),
    },
  },
});
