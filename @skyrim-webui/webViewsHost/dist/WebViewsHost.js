"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebViewsHost {
    constructor() {
        this.webViews = new Map();
    }
    getWebViewIds(replyId) {
        this.reply(replyId, Array.from(this.webViews.keys()));
    }
    registerWebView(webView) {
        this.webViews.set(webView.id, webView);
    }
    unregisterWebView(id) {
        // TODO remove from the UI if present
        this.webViews.delete(id);
    }
    getWebView(replyId, id) {
        this.reply(replyId, this.webViews.get(id));
    }
    addToUI(id) {
        const webView = this.webViews.get(id);
        if (webView) {
            const iframe = document.createElement('iframe');
            iframe.src = webView.url;
            document.body.appendChild(iframe);
        }
    }
    reply(replyId, data) {
        window.skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data]);
    }
}
exports.default = WebViewsHost;
//# sourceMappingURL=WebViewsHost.js.map