//webpack.config.js
const path = require('path');
const fs = require('fs')
const skyrimInfo = require('../../../skyrim.config.js')
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const buildFolder = './build'

//////////////////////////////////
// Configure this for each plugin
const filename = 'WebUI.js'
//////////////////////////////////

// This will run after webpack to deploy the plugin .js file to the Skyrim Platform plugin folder
const deployScript = `xcopy "${path.join(buildFolder, filename)}" "${skyrimInfo.skyrimPluginsFolder}" /Y`

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new WebpackShellPluginNext({
            onBuildEnd: { scripts: [deployScript] }
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
                loader: "ts-loader"
            }
        ]
    }
};