//webpack.config.js
const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new WebpackShellPluginNext({
            onDoneWatch: { scripts: ['echo "HI THE WEBPACK FINISHED"'] }
        })
    ],
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