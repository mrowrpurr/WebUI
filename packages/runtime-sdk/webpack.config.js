const fs = require('fs');

// Get the path to the Skyrim folder from skyrim.json or SKYRIMPATH environment variable
let skyrimConfig
if (fs.existsSync('./skyrim.json')) skyrimConfig = require('./skyrim.json')
const skyrimPathFromConfig = skyrimConfig && skyrimConfig.skyrimFolder
const skyrimPathFromEnvironment = process.env['SKYRIMPATH']
let skyrimFolder
if (fs.existsSync(skyrimPathFromConfig)) skyrimFolder = skyrimPathFromConfig
if (! skyrimFolder)
    if (fs.existsSync(skyrimPathFromEnvironment)) skyrimFolder = skyrimPathFromEnvironment
if (! skyrimFolder) {
    console.error('Please set valid path to your Skyrim folder in skyrim.json (or SKYRIMPATH environment variable)') 
    process.exit(1)
}

const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

let plugins = []
if (process.env['DEPLOY_PLUGIN'].includes('true')) {
    const outputFile = path.join(__dirname, './build', `WebUI.js`)
    const skyrimPlatformPluginsDirectory = path.resolve(skyrimFolder, 'Data', 'Platform', 'PluginsDev')
    fs.mkdirSync(skyrimPlatformPluginsDirectory, { recursive: true })
    const pluginDestinationPath = path.join(skyrimPlatformPluginsDirectory, `WebUI.js`)
    const copyCommand = `xcopy "${outputFile}" "${skyrimPlatformPluginsDirectory}" /I /Y && echo "Copied WebUI.js to ${pluginDestinationPath}"`
    plugins.push(new WebpackShellPluginNext({ onBuildEnd: { scripts: [copyCommand] } }))
}

module.exports = {
    plugins,
    mode: 'development',
    devtool: 'inline-source-map',
    entry: { main: './src/index.ts', },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: `WebUI.js`
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    externals: {
        '@skyrim-platform/skyrim-platform': ['skyrimPlatform'],
        'skyrim-platform': ['skyrimPlatform'],
        'skyrimPlatform': ['skyrimPlatform']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: { configFile: 'tsconfig.json' }
            }
        ]
    }
};