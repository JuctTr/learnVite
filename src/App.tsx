import { useState, useEffect } from "react";
import reactLogo from "@assets/images/react.svg";
import "./App.css";
import "./index.scss";
import style from "./index.module.scss";
// 1. 导入图片
import logoSrc from "@assets/images/vite.svg";
// SVG 组件方式加载
import { ReactComponent as SvgComponentLogo } from "@assets/images/vite.svg";
// Vite 中已经内置了对于 JSON 文件的解析，底层使用@rollup/pluginutils 的 dataToEsm 方法将 JSON 对象转换为一个包含各种具名导出的 ES 模块
import { version } from "../package.json";

function App() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const img = document.getElementById("vite-logo") as HTMLImageElement;
        img.src = logoSrc;
    }, []);
    return (
        <div className="App">
            <h1>版本号：{version}</h1>
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1 className="header">Vite + React</h1>
            <h1 className={style.cssmodule}>CSS Module</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <h1>测试图片资源路径</h1>
            <img src={logoSrc} alt="" />
            <img alt="" id="vite-logo" />
            <div className="vite-logo" style={{ width: 20, height: 20 }}></div>
            <h1>SVG 组件方式加载</h1>
            <SvgComponentLogo />
            <h1>图片放在CDN上</h1>
            <img
                src={
                    new URL(
                        "app_download_QR.cbe9f32.png",
                        import.meta.env.VITE_IMG_BASE_URL
                    ).href
                }
                alt="稀土掘金"
            />
        </div>
    );
}

export default App;
