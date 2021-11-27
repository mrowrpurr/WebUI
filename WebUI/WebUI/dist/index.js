"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SkyrimAPI_1 = require("./SkyrimAPI");
const WebViewHost_1 = require("./WebViewHost");
window.__webViewHost = WebViewHost_1.default;
window.getWebView = (id) => WebViewHost_1.default.getView(id);
window.skyrim = SkyrimAPI_1.default;
window.addEventListener('load', () => {
    window.skyrimPlatform.sendMessage('WebUI', { messageType: 'webviewhostloaded' });
});
//# sourceMappingURL=index.js.map