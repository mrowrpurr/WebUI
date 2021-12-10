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
exports.getWebViewsHostBrowserEnvironment = void 0;
const fs = require("fs");
const skyrimPlatformBrowserEnvironment_1 = require("./skyrimPlatformBrowserEnvironment");
function getWebViewsHostBrowserEnvironment(webViewsHostJsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const webViewsHostJs = fs.readFileSync(webViewsHostJsPath).toString();
        const env = (0, skyrimPlatformBrowserEnvironment_1.getBrowserEnvironment)();
        yield env.runJavaScript(webViewsHostJs);
        return new Promise(resolve => {
            resolve(env);
        });
    });
}
exports.getWebViewsHostBrowserEnvironment = getWebViewsHostBrowserEnvironment;
//# sourceMappingURL=WebViewsHostBrowserEnvironment.js.map