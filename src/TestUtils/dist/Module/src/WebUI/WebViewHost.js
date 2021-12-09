"use strict";
/*
 * Skyrim Platform Backend
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
exports.WebViewHost = void 0;
const skyrimPlatform_1 = require("skyrimPlatform");
class WebViewHost {
    constructor(rootUrl = 'file:///Data/WebUI/WebUI/index.html') {
        this.initialized = false;
        this.isReady = false;
        this.messageCallbacks = new Map();
        this.jsToInvokeWhenReady = new Array();
        this.messageResponsePromises = new Map();
        this.rootUrl = rootUrl;
    }
    initialize() {
        if (!this.initialized) {
            this.initialized = true;
            skyrimPlatform_1.browser.loadUrl(this.rootUrl);
            skyrimPlatform_1.browser.setVisible(true);
            (0, skyrimPlatform_1.on)('browserMessage', message => this._handleBrowserMessage(message));
        }
    }
    addToUI(component) {
        this.invokeViewFunction('addFromProps', component);
    }
    removeFromUI(component) {
        this.invokeViewFunction('remove', component.id);
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
            if (messageType == 'request') {
                if (!message.replyId)
                    message.replyId = this.getUniqueReplyId();
                return new Promise(resolve => {
                    this.invokeViewFunction('invokeMessage', { messageType, message, viewId, });
                    this.messageResponsePromises.set(message.replyId, resolve);
                });
            }
            else {
                return new Promise(resolve => {
                    this.invokeViewFunction('invokeMessage', { messageType, message, viewId, });
                    resolve(undefined);
                });
            }
        });
    }
    reply(request, viewId, response) {
        this.invokeViewFunction('onReply', Object.assign({ replyId: request.replyId }, response));
    }
    invokeViewFunction(functionName, parameters) {
        if (this.isReady)
            skyrimPlatform_1.browser.executeJavaScript(`window.__webViewHost.${functionName}(${JSON.stringify(parameters)});`);
        else
            this.jsToInvokeWhenReady.push([functionName, parameters]);
    }
    getUniqueReplyId() {
        return `${Math.random()}_${Math.random()}`;
    }
    _handleBrowserMessage(message) {
        (0, skyrimPlatform_1.once)('update', () => {
            if (message.arguments.length && message.arguments[0] == "WebUI") {
                const browserMessage = message.arguments[1];
                if (browserMessage.messageType == 'webviewhostloaded') {
                    this.isReady = true;
                    this.jsToInvokeWhenReady.forEach(jsToInvoke => {
                        this.invokeViewFunction(jsToInvoke[0], jsToInvoke[1]);
                    });
                }
                else if (browserMessage.messageType == 'response') {
                    const replyId = browserMessage.message.replyId;
                    if (replyId && this.messageResponsePromises.has(replyId)) {
                        this.messageResponsePromises.get(replyId)(browserMessage.message.response);
                        this.messageResponsePromises.delete(replyId);
                    }
                }
                else {
                    const callbacks = this.messageCallbacks.get(browserMessage.messageType);
                    if (callbacks) {
                        callbacks.forEach(callback => {
                            if ((!callback.viewId) || callback.viewId == browserMessage.target)
                                callback.callback(browserMessage.message);
                        });
                    }
                }
            }
        });
    }
}
exports.WebViewHost = WebViewHost;
const defaultInstance = new WebViewHost();
exports.default = defaultInstance;
//# sourceMappingURL=WebViewHost.js.map