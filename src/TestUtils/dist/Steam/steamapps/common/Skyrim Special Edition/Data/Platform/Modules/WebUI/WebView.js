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
const WebViewHost_1 = require("./WebViewHost");
class WebView {
    // like client side, allow providing a webhost to the constructor - for unit testing etc
    constructor(properties) {
        this.id = properties.id;
        this.url = properties.url;
        this.position = properties.position;
        this.visible = properties.visible;
        WebViewHost_1.default.initialize();
        WebView.components.set(properties.id, this);
        if (this.visible)
            WebViewHost_1.default.addToUI(this);
    }
    addToUI() {
        WebViewHost_1.default.addToUI(this);
    }
    removeFromUI() {
        WebViewHost_1.default.removeFromUI(this);
    }
    on(messageType, callback) {
        WebViewHost_1.default.on(messageType, this.id, callback);
    }
    send(messageType, message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.target)
                message.target = this.id;
            if (!message.source)
                message.source = this.id;
            return WebViewHost_1.default.send(messageType, this.id, message);
        });
    }
    reply(request, response) {
        WebViewHost_1.default.reply(request, this.id, response);
    }
}
exports.default = WebView;
WebView.components = new Map();
//# sourceMappingURL=WebView.js.map