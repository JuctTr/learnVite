import * as React from "react";
import * as Server from "react-dom/server";
import ReactDOM from "react-dom/client";

let Greet = () => <h1>Hello, world!</h1>;
console.log(Server.renderToString(<Greet />));

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Greet />
    </React.StrictMode>
);
