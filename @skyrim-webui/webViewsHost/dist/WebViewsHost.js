"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebViewsHost {
    constructor() {
        this.webViews = new Map();
    }
    reply(replyId, data) {
        window.skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data]);
    }
    getWebViewIds(replyId) {
        this.reply(replyId, Array.from(this.webViews.keys()));
    }
    registerWebView(webView) {
        this.webViews.set(webView.id, webView);
    }
}
exports.default = WebViewsHost;
//# sourceMappingURL=WebViewsHost.js.map