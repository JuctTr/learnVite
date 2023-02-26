import type { Plugin, ResolvedConfig } from "vite";

/**
 * @document https://cn.vitejs.dev/guide/api-plugin.html
 * @returns {Plugin}
 */
export default function vitePluginTest(): Plugin {
    let finalConfig: ResolvedConfig;
    return {
        name: "vite-plugin-demo",
        // enforce: "pre", // 'pre' | 'post'
        apply: "serve", // "build" | "serve"
        /**
         * 服务器启动阶段被调用
         */
        /**
         * Vite 独有钩子
         * 对配置文件导出的对象进行自定义的操作
         * 推荐返回一个配置对象，该对象会与vite已有的配置进行深度合并
         * @param config
         */
        config(config, ctx) {
            console.log("【config】hook => ", ctx);
            return {};
        },
        /**
         * Vite 独有钩子
         * 用来记录最终的配置信息，在解析完配置之后会调用该 hook
         * 包含 vite 默认的 配置
         * @param resolvedCofnig
         */
        configResolved(resolvedCofnig) {
            finalConfig = resolvedCofnig;
            console.log("【configResolved】hook => ", finalConfig.env);
        },
        // 通用钩子
        options(opts) {
            console.log("【options】hook => ", opts);
            return opts;
        },
        /**
         * Vite 独有钩子
         * 仅在开发阶段会被调用，用于扩展 Vite 的 Dev Server
         * 一般用于增加自定义 server 中间件
         * @param server
         */
        configureServer(server) {
            console.log("【configureServer】hook => ");
            // setTimeout(() => {
            //     // 手动退出进程
            //     process.kill(process.pid, "SIGTERM");
            // }, 3000);
        },
        // 通用钩子
        buildStart() {
            console.log("【buildStart】hook => ");
        },
        /**
         * Vite 独有钩子
         * 用来灵活控制 HTML 的内容
         * @param html
         * @returns
         */
        transformIndexHtml(html, ctx) {
            console.log("【transformIndexHtml】hook => ");
            // 替换标签 操作 html
            return {
                html,
                // 注入标签
                tags: [
                    // {
                    //     // 放到 body 末尾，可取值还有`head`|`head-prepend`|`body-prepend`，顾名思义
                    //     injectTo: "body",
                    //     // 标签属性定义
                    //     attrs: { type: "module", src: "./index.ts" },
                    //     // 标签名
                    //     tag: "script"
                    // },
                    {
                        attrs: { class: "inject" },
                        tag: "div",
                        children: "我是在 transformIndexHtml 钩子 注入的"
                    }
                ]
            };
        },
        /**
         * 请求响应阶段，在每个传入模块请求时被调用
         */
        /**
         * 通用钩子
         * @param id 当前模块路径
         * @param importer 引用当前模块的模块路径
         * @param resolveOptions 其余参数
         */
        resolveId(id, importer, resolveOptions) {
            // console.log("【resolveId】hook => ");
            // console.log("文件路径", id);
            // console.log("引用当前模块的模块路径", importer);
            // 解析文件路径
        },
        /**
         * 通过 resolveId 解析后的路径来加载模块内容
         * @param id
         */
        load(id) {
            // console.log("【load】hook => ", id);
        },
        /**
         * 对加载后的模块内容进行自定义的转换
         * @param code
         * @param id
         * @param transformOptions
         */
        transform(code, id, transformOptions) {
            // console.log("【transform】hook => ", id);
        },
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
         * 在服务器关闭时被调用
         */
        // 通用钩子
        buildEnd() {
            console.log("【buildEnd】hook => ");
        },
        // 通用钩子
        closeBundle() {
            console.log("【closeBundle】hook => ");
        }
    };
}
