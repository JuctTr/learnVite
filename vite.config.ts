import { fileURLToPath, URL } from "node:url";
import { defineConfig, normalizePath } from "vite";
import path from "path";
import autoprefixer from "autoprefixer";
import react from "@vitejs/plugin-react-swc";
import viteEslint from "vite-plugin-eslint";
// 这个插件好像没维护了，后续再看
// import viteStylelint from "@amatlash/vite-plugin-stylelint";
import svgr from "vite-plugin-svgr";
// 图片压缩，评论区也有人推荐使用tinypng来压缩
import viteImagemin from "vite-plugin-imagemin";
import vitePluginTest from "./plugins/vite-plugin-test";
// 虚拟模块插件
import virtual from "./plugins/vite-plugin-virtual-module";
// 调试插件
import inspect from "vite-plugin-inspect";
// 语法降级与Polyfill：消灭低版本浏览器兼容问题
import legacy from "@vitejs/plugin-legacy";

import visualizer from "rollup-plugin-visualizer";

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
        svgr(),
        viteImagemin({
            // 无损压缩配置，无损压缩下图片质量不会变差
            optipng: {
                optimizationLevel: 7
            },
            // 有损压缩配置，有损压缩下图片质量可能会变差
            pngquant: {
                quality: [0.8, 0.9]
            },
            // svg 优化
            svgo: {
                plugins: [
                    {
                        name: "removeViewBox"
                    },
                    {
                        name: "removeEmptyAttrs",
                        active: false
                    }
                ]
            }
        }),
        vitePluginTest(),
        virtual(),
        legacy({
            // 设置目标浏览器，browserslist 配置语法
            targets: ["ie >= 11"]
        }),
        inspect(),
        visualizer({
            // 打包完成后自动打开浏览器，显示产物体积报告
            open: true
        })
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
        assetsInlineLimit: 8 * 1024,
        rollupOptions: {
            output: {
                // manualChunks 配置
                manualChunks: {
                    // 将 React 相关库打包成单独的 chunk 中
                    "react-vendor": ["react", "react-dom", "react-router-dom"]
                }
            }
        }
    },
    // 你的项目中还存在其它格式的静态资源，你可以通过assetsInclude配置让 Vite 来支持加载
    // assetsInclude: [".ttf", ".woff", ".txt"]
    optimizeDeps: {
        // 按需加载的依赖都可以声明到这个数组里，强制预构建
        include: [
            "object-assign",
            /**
             * 【背景】：手动 exclude 的包@loadable/component本身具有 ESM 格式的产物，
             *  但它的某个依赖hoist-non-react-statics，和 react-is的产物并没有提供 ESM 格式，会导致运行时加载失败。
             */
            // 间接依赖的声明语法，通过`>`分开, 如`a > b`表示 a 中依赖的 b
            "@loadable/component > hoist-non-react-statics",
            "@loadable/component > react-is"
        ],
        // 将某些依赖从预构建的过程中排除
        exclude: ["@loadable/component"]
    }
});
