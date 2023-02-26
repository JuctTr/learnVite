import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import App from "./App";
import PullToRefresh from "./components/PullToRefresh";
import Demo1 from "./components/Demo1";
import Demo3 from "./components/Demo3";
import "./index.scss";

import fib from "virtual:fib";
import env from "virtual:env";

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

function Index() {
    return (
        <div className="container">
            <PullToRefresh>
                <App />
                <Demo1 />
                <Demo3 />
                <DynamicComponent />
            </PullToRefresh>
            {/* <BrowserRouter></BrowserRouter> */}
        </div>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>
);
