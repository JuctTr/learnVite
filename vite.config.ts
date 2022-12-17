import { fileURLToPath, URL } from "node:url";
import { defineConfig, normalizePath } from "vite";
import path from "path";
import autoprefixer from "autoprefixer";
import react from "@vitejs/plugin-react-swc";
import viteEslint from "vite-plugin-eslint";
// 这个插件好像没维护了，后续再看
// import viteStylelint from "@amatlash/vite-plugin-stylelint";
import svgr from "vite-plugin-svgr";

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
        viteEslint(),
        // 开发阶段提前暴露出样式代码的规范问题，这个插件好像没维护了，后续再看
        // viteStylelint.default({
        //     // 对某些文件排除检查
        //     exclude: /windicss|node_modules|dist/
        // })
        svgr()
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
    },
    build: {
        /**
         * 静态资源都有两种构建方式，一种是打包成一个单文件，另一种是通过 base64 编码的格式内嵌到代码中
         * 1、如果静态资源体积 >= 4KB，则提取成单独的文件
         * 2、如果静态资源体积 < 4KB，则作为 base64 格式的字符串内联
         * 我们可以修改这个临界值
         * 【注意】：svg 格式的文件不受这个临时值的影响，始终会打包成单独的文件，因为它和普通格式的图片不一样，需要动态设置一些属性
         */
        assetsInlineLimit: 8 * 1024
    }
});
