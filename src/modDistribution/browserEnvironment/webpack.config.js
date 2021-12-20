//webpack.config.js
const path = require('path');
const fs = require('fs')
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const buildFolder = './build'

//////////////////////////////////
// Configure this for each plugin
const filename = `WebUI.BrowserEnvironment.js`
//////////////////////////////////

const webUiDestinationDirectory = path.resolve(__dirname, '..', '..', '..', 'WebUI', '__WebUI__')

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new WebpackShellPluginNext({
            onDoneWatch: { scripts: [`xcopy "${path.join(buildFolder, filename)}" "${webUiDestinationDirectory}" /Y`] }
        })
    ],
    entry: {
        main: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, buildFolder),
        filename
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
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.build.json"
                }
            }
        ]
    }
};