import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

function resolve(dir: string) {
  return `${path.resolve(__dirname, dir)}/`;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // "@/": new URL("./src/", import.meta.url).pathname,
      "@/": resolve("src/"),
    },
  },
  server: {
    port: 8080,
    proxy: {
      "/api": {
        // 以/api开头的接口都代理到target指定的域名下
        target: "https://immortalboy.cn",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "easy-blog",
  },
});
