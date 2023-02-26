import { Plugin } from "vite";

/**
 * @document https://cn.vitejs.dev/guide/api-plugin.html
 * @returns {Plugin}
 */
export default function vitePluginTest(): Plugin {
    return {
        name: "vite-plugin-test",
        /**
         * 对配置文件导出的对象进行自定义的操作
         * Vite 独有钩子
         * @param config
         */
        config(config) {
            console.log("config");
        },
        // Vite 独有钩子
        configResolved(resolvedCofnig) {
            console.log("configResolved");
        },
        /**
         * Vite 独有钩子
         * 仅在开发阶段会被调用，用于扩展 Vite 的 Dev Server
         * @param server
         */
        configureServer(server) {
            console.log("configureServer");
            setTimeout(() => {
                // 手动退出进程
                // process.kill(process.pid, "SIGTERM");
            }, 3000);
        },
        /**
         * Vite 独有钩子
         * 用来灵活控制 HTML 的内容
         * @param html
         * @returns
         */
        // transformIndexHtml(html) {
        //     return {
        //         html
        //     };
        // },
        /**
         * Vite 独有钩子
         * 在 Vite 服务端处理热更新时被调用
         * 拿到热更新相关的上下文信息，进行热更模块的过滤，或者进行自定义的热更处理
         */
        // async handleHotUpdate(ctx) {
        //     // 需要热更的文件
        //     console.log(ctx.file);
        //     // 需要热更的模块，如一个 Vue 单文件会涉及多个模块
        //     console.log(ctx.modules);
        //     // 时间戳
        //     console.log(ctx.timestamp);
        //     // Vite Dev Server 实例
        //     console.log(ctx.server);
        //     // 读取最新的文件内容
        //     // console.log(await read());
        //     // 自行处理 HMR 事件
        //     ctx.server.ws.send({
        //         type: "custom",
        //         event: "special-update",
        //         data: { a: 1 }
        //     });
        //     return [];
        // },
        /**
         * 服务器启动阶段被调用
         */
        // 通用钩子
        options(opts) {
            console.log("options");
            return opts;
        },
        // 通用钩子
        buildStart() {
            console.log("buildStart");
        },
        /**
         * 在每个传入模块请求时被调用
         */
        // 通用钩子
        // resolveId() {},
        // 通用钩子
        // load() {},
        // 通用钩子
        // transform() {},
        /**
         * 在服务器关闭时被调用
         */
        // 通用钩子
        buildEnd() {
            console.log("buildEnd");
        },
        // 通用钩子
        closeBundle() {
            console.log("closeBundle");
        }
    };
}
