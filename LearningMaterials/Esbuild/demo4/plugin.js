module.exports = {
    name: "env",
    setup(build) {
        build.onResolve({ filter: /^env$/ }, (args) => {
            console.log("onResolve args => ", args);
            return {
                path: args.path,
                namespace: "env-ns"
            };
        });

        build.onLoad({ filter: /.*/, namespace: "env-ns" }, (args) => {
            console.log("onLoad args => ", args);
            return {
                contents: JSON.stringify(process.env),
                loader: "json"
            };
        });
    }
};
