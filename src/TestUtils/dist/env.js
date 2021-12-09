"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
const fs = require("fs");
const webViewHostJs = fs.readFileSync('./build/WebUI_WebViewHost.js').toString();
function getWebEnvironment() {
    const jsdom = new jsdom_1.JSDOM('', { runScripts: 'dangerously', resources: 'usable', url: `file://${__dirname}/index.html` });
    const script = jsdom.window.document.createElement('script');
    script.textContent = webViewHostJs;
    jsdom.window.document.documentElement.appendChild(script);
    return jsdom;
}
exports.default = getWebEnvironment;
//# sourceMappingURL=env.js.map