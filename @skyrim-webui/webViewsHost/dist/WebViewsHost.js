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
            this.setIframePosition(iframe, webView);
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
    getScreenDimensions(replyId) {
        this.reply(replyId, [window.innerHeight, window.innerWidth]);
    }
    reply(replyId, data) {
        window.skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data]);
    }
    setIframePosition(iframe, webView) {
        if (webView.positionType == 'absolute') {
            iframe.style.width = webView.width.toString();
            iframe.style.height = webView.height.toString();
            iframe.style.left = webView.x.toString();
            iframe.style.top = webView.y.toString();
        }
        else {
            iframe.style.width = `${window.innerWidth * (webView.width / 100)}px`;
            iframe.style.height = `${window.innerHeight * (webView.height / 100)}px`;
            iframe.style.left = `${window.innerWidth * (webView.x / 100)}px`;
            iframe.style.top = `${window.innerHeight * (webView.y / 100)}px`;
        }
    }
}
exports.default = WebViewsHost;
//# sourceMappingURL=WebViewsHost.js.map