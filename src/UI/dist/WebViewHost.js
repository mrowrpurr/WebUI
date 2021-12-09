"use strict";
/*
 * HTML Web Frontend
 */
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
exports.webViewHostInstance = exports.WebViewHost = void 0;
const WebView_1 = require("./WebView");
class WebViewHost {
    constructor() {
        this.webViews = new Map();
        this.iframesByName = new Map();
        this.requestResultPromises = new Map();
        this.messageCallbacks = new Map();
        this.messageResponsePromises = new Map();
    }
    getWebView(id) {
        return this.webViews.get(id.toLowerCase());
    }
    addFromProps(webViewProps) {
        this.add(new WebView_1.default(webViewProps));
    }
    reloadWebView(id) {
        var _a;
        if (this.webViews.has(id)) {
            const iframe = this.iframesByName.get(id);
            if (iframe)
                (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.location.reload();
        }
    }
    add(webView) {
        if (this.webViews.has(webView.id))
            this.remove(webView.id);
        else
            this.webViews.set(webView.id, webView);
        const iframe = document.createElement('iframe');
        this.iframesByName.set(webView.id, iframe);
        iframe.style.left = (window.innerWidth * (webView.position.x / 100)).toFixed() + 'px';
        iframe.style.top = (window.innerHeight * (webView.position.y / 100)).toFixed() + 'px';
        iframe.style.height = (window.innerHeight * (webView.position.height / 100)).toFixed() + 'px';
        iframe.style.width = (window.innerWidth * (webView.position.width / 100)).toFixed() + 'px';
        iframe.frameBorder = '0';
        iframe.scrolling = 'false';
        iframe.src = webView.url;
        document.documentElement.appendChild(iframe);
        if (iframe.contentWindow) {
            iframe.contentWindow.onerror = function (msg, url, linenumber) {
                alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
                return true;
            };
            iframe.contentWindow.addEventListener('load', () => {
                this.send('load', webView.id, {
                    viewId: webView.id
                });
            });
        }
    }
    remove(id) {
        this.webViews.delete(id);
        const iframe = this.iframesByName.get(id);
        document.documentElement.removeChild(iframe);
        this.iframesByName.delete(id);
    }
    on(messageType, viewId, callback) {
        if (!this.messageCallbacks.has(messageType))
            this.messageCallbacks.set(messageType, Array());
        const callbacks = this.messageCallbacks.get(messageType);
        if (callbacks)
            callbacks.push({ viewId, callback });
    }
    send(messageType, viewId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.source)
                message.source = viewId;
            if (!message.target)
                message.target = viewId;
            if (messageType == 'request') {
                if (!message.replyId)
                    message.replyId = this.getUniqueReplyId();
                return new Promise(resolve => {
                    window.skyrimPlatform.sendMessage('WebUI', { messageType, message, target: viewId });
                    this.messageResponsePromises.set(message.replyId, resolve);
                });
            }
            else {
                return new Promise(resolve => {
                    window.skyrimPlatform.sendMessage('WebUI', { messageType, message, target: viewId });
                    resolve(undefined);
                });
            }
        });
    }
    // TODO: abstract window.skyrimPlatform with an object we can provide to the webviewhost
    reply(request, viewId, response) {
        window.skyrimPlatform.sendMessage('WebUI', {
            target: viewId,
            messageType: 'response',
            message: { replyId: request.replyId, response: response }
        });
    }
    onReply(properties) {
        if (this.messageResponsePromises.has(properties.replyId)) {
            const response = properties;
            this.messageResponsePromises.get(properties.replyId)(response);
            this.messageResponsePromises.delete(properties.replyId);
        }
    }
    // TODO: refactor the viewId / target inconsistencies
    invokeMessage(properties) {
        var _a;
        if (this.iframesByName.has(properties.viewId)) {
            const iframe = this.iframesByName.get(properties.viewId);
            (_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage({
                messageType: properties.messageType,
                data: properties.message
            });
        }
        // const callbacks = this.messageCallbacks.get(properties.messageType)
        // if (callbacks)
        //     callbacks.forEach(callback => {
        //         if ((!callback.viewId) || callback.viewId == properties.viewId)
        //             callback.callback(properties.message)
        //     })
    }
    getUniqueReplyId() {
        return `${Math.random()}_${Math.random()}`;
    }
}
exports.WebViewHost = WebViewHost;
exports.webViewHostInstance = new WebViewHost();
exports.default = exports.webViewHostInstance;
//# sourceMappingURL=WebViewHost.js.map