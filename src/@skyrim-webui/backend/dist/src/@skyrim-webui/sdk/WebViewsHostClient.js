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
class WebViewsHostClient {
    constructor(javascriptExecutor) {
        this.replyCallbacks = new Map();
        this.executeJS = javascriptExecutor;
    }
    onBrowserMessage(messageArguments) {
        // ['WebUI', 'Reply', replyId, ['MyCoolWebView']]
        if (messageArguments && messageArguments.length == 4 && messageArguments[0] == 'WebUI' && messageArguments[1] == 'Reply') {
            const replyId = messageArguments[2];
            const response = messageArguments[3];
            if (this.replyCallbacks.has(replyId)) {
                this.replyCallbacks.get(replyId)(response);
                this.replyCallbacks.delete(replyId);
            }
        }
    }
    registerWebView(webView) {
        this.sendRequest('registerWebView', webView);
    }
    unregisterWebView(id) {
        this.sendRequest('unregisterWebView', id);
    }
    getWebViewIds() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getResponse('getWebViewIds');
        });
    }
    getWebView(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getResponse('getWebView', id);
        });
    }
    addToUI(id) {
        this.sendRequest('addToUI', id);
    }
    getResponse(functionName, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                const replyId = this.getReplyId();
                this.replyCallbacks.set(replyId, resolve);
                this.sendRequest(functionName, replyId, ...args);
            });
        });
    }
    sendRequest(functionName, ...args) {
        this.executeJS(`__webViewsHost__.${functionName}(${args.map(arg => JSON.stringify(arg)).join(', ')})`);
    }
    getReplyId() {
        return `${Math.random()}_${Math.random()}`;
    }
}
exports.default = WebViewsHostClient;
