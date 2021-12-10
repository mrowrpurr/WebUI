"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebViewsHostBrowserEnvironment = exports.WebViewsHostBrowserEnvironment = void 0;
const fs = require("fs");
const skyrimPlatformBrowserEnvironment_1 = require("./skyrimPlatformBrowserEnvironment");
class WebViewsHostBrowserEnvironment extends skyrimPlatformBrowserEnvironment_1.SkyrimPlatformBrowserEnvironment {
    load(webViewsHostJsPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const webViewsHostJs = fs.readFileSync(webViewsHostJsPath).toString();
            return this.runJavaScript(webViewsHostJs);
        });
    }
    runWebViewsBrowserFunction(functionName, ...args) {
        return this.runFunction(`__webViewsHost__.${functionName}`, ...args);
    }
}
exports.WebViewsHostBrowserEnvironment = WebViewsHostBrowserEnvironment;
function getWebViewsHostBrowserEnvironment(webViewsHostJsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const env = new WebViewsHostBrowserEnvironment();
        yield env.load(webViewsHostJsPath);
        return env;
    });
}
exports.getWebViewsHostBrowserEnvironment = getWebViewsHostBrowserEnvironment;
//# sourceMappingURL=WebViewsHostBrowserEnvironment.js.map