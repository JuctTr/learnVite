import { fileURLToPath, URL } from "node:url";
import { defineConfig, normalizePath } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

// 全局 scss 文件的路径
const variablePath = normalizePath(path.resolve("./src/variable.scss"));

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
  css: {
    modules: {
      // name 表示文件名 local表示类名，我们可以自定义元素的类名
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
    preprocessorOptions: {
      scss: {
        // 会在每一个scss文件中的开头注入
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
});
