import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import App from "./App";
import "./index.css";

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
        <BrowserRouter>
            <App />
            <DynamicComponent />
        </BrowserRouter>
    </React.StrictMode>
);
