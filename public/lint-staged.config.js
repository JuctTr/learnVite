const micromatch = require("micromatch");

// 原来是在 package.json 文件中添加如下代码：
// "lint-staged": {
//     "**/*.{js,jsx,tsx,ts}": [
//         "npm run lint:script",
//         "git add ."
//     ],
//     "**/*.{css,scss}": [
//         "npm run lint:style",
//         "git add ."
//     ]
// }

// 支持在提交是忽略暂存区的某些文件
module.exports = {
    "**/*.{js,jsx,tsx,ts}": (files) => {
        const match = micromatch.not(
            files,
            "**/miniVite/playground/**/*.{js,jsx,tsx,ts}"
        );
        return `eslint ${match.join(" ")} --fix --quiet`;
    },
    "**/*.{css,scss}": (files) => {
        const match = micromatch.not(
            files,
            "**/miniVite/playground/**/*.{css,scss}"
        );
        // return 'stylelint "**/*.{css,scss,sass}" "!**/miniVite/playground/**"';
        return `stylelint ${match.join(",")}`;
    }
};
