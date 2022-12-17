import { fileURLToPath, URL } from "node:url";
import { defineConfig, normalizePath } from "vite";
import path from "path";
import autoprefixer from "autoprefixer";
import react from "@vitejs/plugin-react-swc";
import viteEslint from "vite-plugin-eslint";
// 这个插件好像没维护了，后续再看
// import viteStylelint from "@amatlash/vite-plugin-stylelint";

// 全局 scss 文件的路径
const variablePath = normalizePath(path.resolve("./src/variable.scss"));

// https://vitejs.dev/config/
export default defineConfig({
    // publicDir: "../public",
    // // 手动指定项目根目录位置
    // root: path.join(__dirname, "src"),
    plugins: [
        // 配置了官方的 react 插件，来提供 React 项目编译和热更新的功能。
        react(),
        // 这个插件采用另一个进程来运行 ESLint 的扫描工作，因此不会影响 Vite 项目的启动速度
        viteEslint()
        // 开发阶段提前暴露出样式代码的规范问题，这个插件好像没维护了，后续再看
        // viteStylelint.default({
        //     // 对某些文件排除检查
        //     exclude: /windicss|node_modules|dist/
        // })
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@assets": path.join(__dirname, "src/assets")
        }
    },
    css: {
        modules: {
            // name 表示文件名 local表示类名，我们可以自定义元素的类名
            generateScopedName: "[name]__[local]__[hash:base64:5]"
        },
        preprocessorOptions: {
            scss: {
                // 会在每一个scss文件中的开头注入
                additionalData: `@import "${variablePath}";`
            }
        },
        postcss: {
            plugins: [
                autoprefixer({
                    overrideBrowserslist: ["Chrome > 20", "ff > 10", "ie 11"]
                })
            ]
        }
    }
});
