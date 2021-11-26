let fs = require('fs');
let path = require('path');

let config = require('./config');
let tsconfig = JSON.parse(fs.readFileSync('./tsconfig-default.json'));
tsconfig.compilerOptions.baseUrl = path.join(config.seRoot, 'Data', 'Platform', 'Modules');
tsconfig.compilerOptions.outFile = path.join("./dist", `${config.pluginName}.js`)
fs.writeFileSync('./tsconfig.json', JSON.stringify(tsconfig, null, 2));
