//webpack.config.js
const path = require('path');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: {
        main: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "WebUI.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    externals: {
        "skyrimPlatform": "skyrimPlatform"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    }
};