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
exports.getWebView = exports.WebView = void 0;
class WebView {
    constructor() {
        this.eventCallbacks = new Array();
        this.requestCallbacks = new Array();
    }
    onEvent(callback) {
        this.eventCallbacks.push(callback);
    }
    onRequest(callback, reply) {
        this.requestCallbacks.push([callback, reply]);
    }
    send() {
        // postMessage
    }
    request() {
        return __awaiter(this, void 0, void 0, function* () {
            // postMessage and store promise which onReply will deal with
        });
    }
    onReply() {
        // run promise stored by request()
    }
}
exports.WebView = WebView;
const webView = new WebView();
function getWebView(id) {
    webView.id = id;
    return webView;
}
exports.getWebView = getWebView;
window.addEventListener('message', event => {
    if (event.data.messageType) {
        switch (event.data.messageType) {
            case 'event': {
                webView.eventCallbacks.forEach(callback => callback(event.data.data));
                break;
            }
            case 'request': {
                break;
            }
            case 'reply': {
                break;
            }
        }
    }
});
//# sourceMappingURL=index.js.map