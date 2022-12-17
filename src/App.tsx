import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "./index.scss";
import style from "./index.module.scss";
// 1. 导入图片
import logoSrc from "@assets/vite.svg";

function App() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const img = document.getElementById("logo") as HTMLImageElement;
        img.src = logoSrc;
    }, []);
    return (
        <div className="App">
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
            <img alt="" id="logo" />
            <div className="logo" style={{ width: 20, height: 20 }}></div>
        </div>
    );
}

export default App;
