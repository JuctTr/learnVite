import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import App from "./App";
import Demo1 from "./components/Demo1";
import Demo2 from "./components/Demo2";
import "./index.scss";

import fib from "virtual:fib";
import env from "virtual:env";
import Demo3 from "./components/Demo3";

console.log(`【虚拟模块】结果: ${fib(10)}`);
console.log("【虚拟模块】", env);

const DynamicComponent = loadable(
    () => import("./components/DynamicComponent")
);

/**
 * 测试动态 import 发生的二次预构建
 * 要尽力避免运行时的二次预构建。具体怎么做呢？你可以通过include参数提前声明需要按需加载的依赖
 * @param m
 * @returns
 */
const importModule = (m: unknown) => import(`./locales/${m}.ts`);
importModule("zh_CN");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Demo1 />
        <div
            style={{
                margin: "0 auto",
                height: "500px",
                width: "300px",
                overflow: "auto"
            }}
        >
            <Demo2>
                <App />
            </Demo2>
        </div>
        <Demo3 />
        {/* <BrowserRouter></BrowserRouter> */}
        <DynamicComponent />
    </React.StrictMode>
);
