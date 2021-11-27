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
const WebViewHost_1 = require("./WebViewHost");
class WebView {
    constructor(properties, webViewHost = undefined) {
        this.messageCallbacks = new Map();
        this.id = properties.id;
        this.url = properties.url;
        this.position = properties.position;
        this.visible = properties.visible;
        if (!webViewHost)
            webViewHost = WebViewHost_1.webViewHostInstance;
        this.webViewHost = webViewHost;
    }
    hello() {
        alert('You called WebView hello in the frontend');
    }
    on(messageType, callback) {
        if (!this.messageCallbacks.has(messageType))
            this.messageCallbacks.set(messageType, new Array());
        const callbacks = this.messageCallbacks.get(messageType);
        if (callbacks)
            callbacks.push(callback);
    }
    send(messageType, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.webViewHost.send(messageType, this.id, message);
        });
    }
}
exports.default = WebView;
//# sourceMappingURL=WebView.js.map