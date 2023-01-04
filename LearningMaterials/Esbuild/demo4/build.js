/* eslint-disable @typescript-eslint/no-var-requires */
const envPlugin = require("./plugin");

require("esbuild")
    .build({
        entryPoints: ["./index.jsx"],
        bundle: true,
        outfile: "./dist/out.js",
        // 应用插件
        plugins: [envPlugin]
    })
    .catch(() => process.exit(1));
