"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebViewsHost {
    constructor() {
        this.webViews = new Map();
        this.iframes = new Map();
    }
    getWebViewIds(replyId) {
        this.reply(replyId, Array.from(this.webViews.keys()));
    }
    registerWebView(webView) {
        this.webViews.set(webView.id, webView);
    }
    unregisterWebView(id) {
        this.removeFromUI(id);
        this.webViews.delete(id);
    }
    getWebView(replyId, id) {
        this.reply(replyId, this.webViews.get(id));
    }
    addToUI(id) {
        const webView = this.webViews.get(id);
        if (webView && !this.iframes.has(webView.id)) {
            const iframe = document.createElement('iframe');
            this.iframes.set(id, iframe);
            iframe.src = webView.url;
            iframe.dataset.webviewId = id;
            document.body.appendChild(iframe);
        }
    }
    removeFromUI(id) {
        if (this.iframes.has(id)) {
            document.body.removeChild(this.iframes.get(id));
            this.iframes.delete(id);
        }
    }
    isInUI(replyId, id) {
        this.reply(replyId, this.iframes.has(id));
    }
    reply(replyId, data) {
        window.skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data]);
    }
}
exports.default = WebViewsHost;
//# sourceMappingURL=WebViewsHost.js.map