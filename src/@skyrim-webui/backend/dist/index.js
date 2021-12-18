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
exports.getWebViewIds = exports.registerWebView = exports.getWebViewsHostClient = void 0;
const WebViewsHostClient_1 = require("./WebViewsHostClient");
const skyrimPlatform_1 = require("skyrimPlatform");
const webViewsHostClient = new WebViewsHostClient_1.default((script) => { skyrimPlatform_1.browser.executeJavaScript(script); });
(0, skyrimPlatform_1.on)('browserMessage', message => {
    webViewsHostClient.onBrowserMessage(message.arguments);
});
function getWebViewsHostClient() {
    return webViewsHostClient;
}
exports.getWebViewsHostClient = getWebViewsHostClient;
function registerWebView(webView) {
    getWebViewsHostClient().registerWebView(webView);
}
exports.registerWebView = registerWebView;
function getWebViewIds() {
    return __awaiter(this, void 0, void 0, function* () {
        return getWebViewsHostClient().getWebViewIds();
    });
}
exports.getWebViewIds = getWebViewIds;
// export function addToUI(id: string) {
//     getWebViewsHostClient().addToUI(id)
// }
