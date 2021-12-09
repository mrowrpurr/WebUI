"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SkyrimAPI_1 = require("./SkyrimAPI");
const WebViewHost_1 = require("./WebViewHost");
const WebView_1 = require("./WebView");
window.__webViewHost = WebViewHost_1.default;
/*
 * Define `parent.<fn>` interfaces for iframes
 */
window.getWebView = (id) => WebViewHost_1.default.getWebView(id);
window.skyrim = SkyrimAPI_1.default;
window.WebView = WebView_1.default;
window.addEventListener('load', () => {
    window.skyrimPlatform.sendMessage('WebUI', { messageType: 'webviewhostloaded' });
});
//# sourceMappingURL=index.js.map