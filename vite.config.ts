import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  // publicDir: "../public",
  // // 手动指定项目根目录位置
  // root: path.join(__dirname, "src"),
  plugins: [react()], // 配置了官方的 react 插件，来提供 React 项目编译和热更新的功能。
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
