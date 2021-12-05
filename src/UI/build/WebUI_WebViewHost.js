/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/SkyrimAPI.ts":
/*!**************************!*\
  !*** ./src/SkyrimAPI.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


/*
 * HTML Web Frontend
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SkyrimAPI = void 0;
class SkyrimAPI {
    hello() {
        alert('HELLO THERE');
    }
}
exports.SkyrimAPI = SkyrimAPI;
const api = new SkyrimAPI();
exports["default"] = api;


/***/ }),

/***/ "./src/WebView.ts":
/*!************************!*\
  !*** ./src/WebView.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
const WebViewHost_1 = __webpack_require__(/*! ./WebViewHost */ "./src/WebViewHost.ts");
class WebView {
    constructor(properties, webViewHost = undefined) {
        this.id = properties.id;
        this.url = properties.url;
        this.position = properties.position;
        this.visible = properties.visible;
        if (!webViewHost)
            webViewHost = WebViewHost_1.webViewHostInstance;
        this.webViewHost = webViewHost;
    }
    on(messageType, callback) {
        this.webViewHost.on(messageType, this.id, callback);
    }
    send(messageType, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.webViewHost.send(messageType, this.id, message);
        });
    }
    reply(request, response) {
        this.webViewHost.reply(request, this.id, response);
    }
}
exports["default"] = WebView;


/***/ }),

/***/ "./src/WebViewHost.ts":
/*!****************************!*\
  !*** ./src/WebViewHost.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.webViewHostInstance = exports.WebViewHost = void 0;
const WebView_1 = __webpack_require__(/*! ./WebView */ "./src/WebView.ts");
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
        const callbacks = this.messageCallbacks.get(properties.messageType);
        if (callbacks)
            callbacks.forEach(callback => {
                if ((!callback.viewId) || callback.viewId == properties.viewId)
                    callback.callback(properties.message);
            });
    }
    getUniqueReplyId() {
        return `${Math.random()}_${Math.random()}`;
    }
}
exports.WebViewHost = WebViewHost;
exports.webViewHostInstance = new WebViewHost();
exports["default"] = exports.webViewHostInstance;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const SkyrimAPI_1 = __webpack_require__(/*! ./SkyrimAPI */ "./src/SkyrimAPI.ts");
const WebViewHost_1 = __webpack_require__(/*! ./WebViewHost */ "./src/WebViewHost.ts");
const WebView_1 = __webpack_require__(/*! ./WebView */ "./src/WebView.ts");
window.__webViewHost = WebViewHost_1.default;
/*
 * Define `parent.<fn>` interfaces for iframes
 */
window.getWebView = (id) => WebViewHost_1.default.getWebView(id);
window.skyrim = SkyrimAPI_1.default;
window.WebView = WebView_1.default;
window.addEventListener('load', () => {
    window.skyrimPlatform.sendMessage('WebUI', { messageType: 'webviewhostloaded' });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQUcsRUFBRTtJQUNoQyxNQUFjLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztBQUM3RixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9Ta3lyaW1BUEkudHMiLCJ3ZWJwYWNrOi8vc2t5cmltLXdlYnVpLWNvbXBvbmVudGhvc3QvLi9zcmMvV2ViVmlldy50cyIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9XZWJWaWV3SG9zdC50cyIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBIVE1MIFdlYiBGcm9udGVuZFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTa3lyaW1BUEkge1xyXG4gICAgcHVibGljIGhlbGxvKCkge1xyXG4gICAgICAgIGFsZXJ0KCdIRUxMTyBUSEVSRScpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBTa3lyaW1BUEkoKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpIiwiLypcclxuICogSFRNTCBXZWIgRnJvbnRlbmRcclxuICovXHJcblxyXG5pbXBvcnQgeyBXZWJWaWV3TWVzc2FnZSwgV2ViVmlld0V2ZW50LCBXZWJWaWV3UmVxdWVzdCwgV2ViVmlld1Jlc3BvbnNlIH0gZnJvbSAnLi9XZWJWaWV3RXZlbnRzJ1xyXG5pbXBvcnQgeyBXZWJWaWV3SG9zdCwgd2ViVmlld0hvc3RJbnN0YW5jZSB9IGZyb20gJy4vV2ViVmlld0hvc3QnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdlYlZpZXdTY3JlZW5Qb3NpdGlvbiB7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXIsXHJcbiAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgaGVpZ2h0OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXZWJWaWV3UHJvcHMge1xyXG4gICAgaWQ6IHN0cmluZyxcclxuICAgIHVybDogc3RyaW5nLFxyXG4gICAgcG9zaXRpb246IFdlYlZpZXdTY3JlZW5Qb3NpdGlvbixcclxuICAgIHZpc2libGU6IGJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViVmlldyB7XHJcbiAgICBpZDogc3RyaW5nXHJcbiAgICB1cmw6IHN0cmluZ1xyXG4gICAgcG9zaXRpb246IFdlYlZpZXdTY3JlZW5Qb3NpdGlvblxyXG4gICAgdmlzaWJsZTogYm9vbGVhblxyXG4gICAgd2ViVmlld0hvc3Q6IFdlYlZpZXdIb3N0XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcGVydGllczogV2ViVmlld1Byb3BzLCB3ZWJWaWV3SG9zdDogV2ViVmlld0hvc3QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmlkID0gcHJvcGVydGllcy5pZFxyXG4gICAgICAgIHRoaXMudXJsID0gcHJvcGVydGllcy51cmxcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcHJvcGVydGllcy5wb3NpdGlvblxyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHByb3BlcnRpZXMudmlzaWJsZVxyXG4gICAgICAgIGlmICghd2ViVmlld0hvc3QpXHJcbiAgICAgICAgICAgIHdlYlZpZXdIb3N0ID0gd2ViVmlld0hvc3RJbnN0YW5jZVxyXG4gICAgICAgIHRoaXMud2ViVmlld0hvc3QgPSB3ZWJWaWV3SG9zdCFcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdldmVudCcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld0V2ZW50KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiAncmVxdWVzdCcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld1JlcXVlc3QpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdtZXNzYWdlJywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMud2ViVmlld0hvc3Qub24obWVzc2FnZVR5cGUsIHRoaXMuaWQsIGNhbGxiYWNrKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAnZXZlbnQnLCBtZXNzYWdlOiBXZWJWaWV3RXZlbnQpOiBQcm9taXNlPGFueT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAncmVxdWVzdCcsIG1lc3NhZ2U6IFdlYlZpZXdSZXF1ZXN0KTogUHJvbWlzZTxXZWJWaWV3UmVzcG9uc2U+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ21lc3NhZ2UnLCBtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdsb2FkJywgbWVzc2FnZTogV2ViVmlld01lc3NhZ2UpOiBQcm9taXNlPGFueT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWJWaWV3SG9zdC5zZW5kKG1lc3NhZ2VUeXBlLCB0aGlzLmlkLCBtZXNzYWdlKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXBseShyZXF1ZXN0OiBXZWJWaWV3UmVxdWVzdCwgcmVzcG9uc2U6IFdlYlZpZXdSZXNwb25zZSkge1xyXG4gICAgICAgIHRoaXMud2ViVmlld0hvc3QucmVwbHkocmVxdWVzdCwgdGhpcy5pZCwgcmVzcG9uc2UpXHJcbiAgICB9XHJcbn1cclxuIiwiLypcclxuICogSFRNTCBXZWIgRnJvbnRlbmRcclxuICovXHJcblxyXG5pbXBvcnQgV2ViVmlldywgeyBXZWJWaWV3UHJvcHMgfSBmcm9tICcuL1dlYlZpZXcnXHJcbmltcG9ydCB7IFdlYlZpZXdNZXNzYWdlLCBXZWJWaWV3RXZlbnQsIFdlYlZpZXdSZXF1ZXN0LCBXZWJWaWV3UmVzcG9uc2UgfSBmcm9tICcuL1dlYlZpZXdFdmVudHMnXHJcblxyXG5pbnRlcmZhY2UgV2ViVmlld0V2ZW50Q2FsbGJhY2sge1xyXG4gICAgdmlld0lkOiBzdHJpbmcsXHJcbiAgICBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gYW55XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnZva2VNZXNzYWdlUHJvcHMge1xyXG4gICAgbWVzc2FnZVR5cGU6IHN0cmluZywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IGFueVxyXG59XHJcblxyXG5pbnRlcmZhY2UgT25SZXBseVByb3BzIGV4dGVuZHMgV2ViVmlld1Jlc3BvbnNlIHtcclxuICAgIHJlcGx5SWQ6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2ViVmlld0hvc3Qge1xyXG4gICAgd2ViVmlld3MgPSBuZXcgTWFwPHN0cmluZywgV2ViVmlldz4oKVxyXG4gICAgaWZyYW1lc0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MSUZyYW1lRWxlbWVudD4oKVxyXG4gICAgcmVxdWVzdFJlc3VsdFByb21pc2VzID0gbmV3IE1hcDxzdHJpbmcsIChkYXRhOiBhbnkpID0+IHZvaWQ+KClcclxuICAgIG1lc3NhZ2VDYWxsYmFja3MgPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8V2ViVmlld0V2ZW50Q2FsbGJhY2s+PigpXHJcbiAgICBtZXNzYWdlUmVzcG9uc2VQcm9taXNlcyA9IG5ldyBNYXA8c3RyaW5nLCAocmVzcG9uc2U6IFdlYlZpZXdSZXNwb25zZSkgPT4gdm9pZD4oKVxyXG5cclxuICAgIHB1YmxpYyBnZXRXZWJWaWV3KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWJWaWV3cy5nZXQoaWQudG9Mb3dlckNhc2UoKSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRnJvbVByb3BzKHdlYlZpZXdQcm9wczogV2ViVmlld1Byb3BzKSB7XHJcbiAgICAgICAgdGhpcy5hZGQobmV3IFdlYlZpZXcod2ViVmlld1Byb3BzKSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkKHdlYlZpZXc6IFdlYlZpZXcpIHtcclxuICAgICAgICBpZiAodGhpcy53ZWJWaWV3cy5oYXMod2ViVmlldy5pZCkpXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKHdlYlZpZXcuaWQpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLndlYlZpZXdzLnNldCh3ZWJWaWV3LmlkLCB3ZWJWaWV3KVxyXG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpXHJcbiAgICAgICAgdGhpcy5pZnJhbWVzQnlOYW1lLnNldCh3ZWJWaWV3LmlkLCBpZnJhbWUpXHJcbiAgICAgICAgaWZyYW1lLnN0eWxlLmxlZnQgPSAod2luZG93LmlubmVyV2lkdGggKiAod2ViVmlldy5wb3NpdGlvbi54IC8gMTAwKSkudG9GaXhlZCgpICsgJ3B4J1xyXG4gICAgICAgIGlmcmFtZS5zdHlsZS50b3AgPSAod2luZG93LmlubmVySGVpZ2h0ICogKHdlYlZpZXcucG9zaXRpb24ueSAvIDEwMCkpLnRvRml4ZWQoKSArICdweCdcclxuICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCAqICh3ZWJWaWV3LnBvc2l0aW9uLmhlaWdodCAvIDEwMCkpLnRvRml4ZWQoKSArICdweCdcclxuICAgICAgICBpZnJhbWUuc3R5bGUud2lkdGggPSAod2luZG93LmlubmVyV2lkdGggKiAod2ViVmlldy5wb3NpdGlvbi53aWR0aCAvIDEwMCkpLnRvRml4ZWQoKSArICdweCdcclxuICAgICAgICBpZnJhbWUuZnJhbWVCb3JkZXIgPSAnMCdcclxuICAgICAgICBpZnJhbWUuc2Nyb2xsaW5nID0gJ2ZhbHNlJ1xyXG4gICAgICAgIGlmcmFtZS5zcmMgPSB3ZWJWaWV3LnVybFxyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChpZnJhbWUpXHJcbiAgICAgICAgaWYgKGlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgICAgICAgIGlmcmFtZS5jb250ZW50V2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihtc2csIHVybCwgbGluZW51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yIG1lc3NhZ2U6ICcgKyBtc2cgKyAnXFxuVVJMOiAnICsgdXJsICsgJ1xcbkxpbmUgTnVtYmVyOiAnICsgbGluZW51bWJlcilcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZCgnbG9hZCcsIHdlYlZpZXcuaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3SWQ6IHdlYlZpZXcuaWRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMud2ViVmlld3MuZGVsZXRlKGlkKVxyXG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IHRoaXMuaWZyYW1lc0J5TmFtZS5nZXQoaWQpXHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKGlmcmFtZSEpXHJcbiAgICAgICAgdGhpcy5pZnJhbWVzQnlOYW1lLmRlbGV0ZShpZClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdldmVudCcsIHZpZXdJZDogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IFdlYlZpZXdFdmVudCkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogJ3JlcXVlc3QnLCB2aWV3SWQ6IHN0cmluZywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3UmVxdWVzdCkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogJ21lc3NhZ2UnLCB2aWV3SWQ6IHN0cmluZywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogc3RyaW5nLCB2aWV3SWQ6IHN0cmluZywgY2FsbGJhY2s6IChtZXNzYWdlOiBhbnkpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6IHN0cmluZywgdmlld0lkOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2VDYWxsYmFja3MuaGFzKG1lc3NhZ2VUeXBlKSlcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ2FsbGJhY2tzLnNldChtZXNzYWdlVHlwZSwgQXJyYXk8V2ViVmlld0V2ZW50Q2FsbGJhY2s+KCkpXHJcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5tZXNzYWdlQ2FsbGJhY2tzLmdldChtZXNzYWdlVHlwZSlcclxuICAgICAgICBpZiAoY2FsbGJhY2tzKVxyXG4gICAgICAgICAgICBjYWxsYmFja3MucHVzaCh7IHZpZXdJZCwgY2FsbGJhY2sgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ21lc3NhZ2UnLCB2aWV3SWQ6IHN0cmluZywgbWVzc2FnZTogV2ViVmlld01lc3NhZ2UpOiBQcm9taXNlPHVuZGVmaW5lZD5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAnZXZlbnQnLCB2aWV3SWQ6IHN0cmluZywgbWVzc2FnZTogV2ViVmlld0V2ZW50KTogUHJvbWlzZTx1bmRlZmluZWQ+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ3JlcXVlc3QnLCB2aWV3SWQ6IHN0cmluZywgbWVzc2FnZTogV2ViVmlld1JlcXVlc3QpOiBQcm9taXNlPFdlYlZpZXdSZXNwb25zZT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAnbG9hZCcsIHZpZXdJZDogc3RyaW5nLCBtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSk6IFByb21pc2U8dW5kZWZpbmVkPlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6IHN0cmluZywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSk6IFByb21pc2U8dW5kZWZpbmVkPlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6IHN0cmluZywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKCFtZXNzYWdlLnNvdXJjZSkgbWVzc2FnZS5zb3VyY2UgPSB2aWV3SWRcclxuICAgICAgICBpZiAoIW1lc3NhZ2UudGFyZ2V0KSBtZXNzYWdlLnRhcmdldCA9IHZpZXdJZFxyXG4gICAgICAgIGlmIChtZXNzYWdlVHlwZSA9PSAncmVxdWVzdCcpIHtcclxuICAgICAgICAgICAgaWYgKCFtZXNzYWdlLnJlcGx5SWQpIG1lc3NhZ2UucmVwbHlJZCA9IHRoaXMuZ2V0VW5pcXVlUmVwbHlJZCgpXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxXZWJWaWV3UmVzcG9uc2U+KHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLnNreXJpbVBsYXRmb3JtLnNlbmRNZXNzYWdlKCdXZWJVSScsIHsgbWVzc2FnZVR5cGUsIG1lc3NhZ2UsIHRhcmdldDogdmlld0lkIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VSZXNwb25zZVByb21pc2VzLnNldChtZXNzYWdlLnJlcGx5SWQsIHJlc29sdmUpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHVuZGVmaW5lZD4ocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAod2luZG93IGFzIGFueSkuc2t5cmltUGxhdGZvcm0uc2VuZE1lc3NhZ2UoJ1dlYlVJJywgeyBtZXNzYWdlVHlwZSwgbWVzc2FnZSwgdGFyZ2V0OiB2aWV3SWQgfSlcclxuICAgICAgICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiBhYnN0cmFjdCB3aW5kb3cuc2t5cmltUGxhdGZvcm0gd2l0aCBhbiBvYmplY3Qgd2UgY2FuIHByb3ZpZGUgdG8gdGhlIHdlYnZpZXdob3N0XHJcblxyXG4gICAgcHVibGljIHJlcGx5KHJlcXVlc3Q6IFdlYlZpZXdSZXF1ZXN0LCB2aWV3SWQ6IHN0cmluZywgcmVzcG9uc2U6IFdlYlZpZXdSZXNwb25zZSkge1xyXG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5za3lyaW1QbGF0Zm9ybS5zZW5kTWVzc2FnZSgnV2ViVUknLCB7XHJcbiAgICAgICAgICAgIHRhcmdldDogdmlld0lkLFxyXG4gICAgICAgICAgICBtZXNzYWdlVHlwZTogJ3Jlc3BvbnNlJyxcclxuICAgICAgICAgICAgbWVzc2FnZTogeyByZXBseUlkOiByZXF1ZXN0LnJlcGx5SWQsIHJlc3BvbnNlOiByZXNwb25zZSB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25SZXBseShwcm9wZXJ0aWVzOiBPblJlcGx5UHJvcHMpIHtcclxuICAgICAgICBpZiAodGhpcy5tZXNzYWdlUmVzcG9uc2VQcm9taXNlcy5oYXMocHJvcGVydGllcy5yZXBseUlkKSkge1xyXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHByb3BlcnRpZXMgYXMgV2ViVmlld1Jlc3BvbnNlXHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVJlc3BvbnNlUHJvbWlzZXMuZ2V0KHByb3BlcnRpZXMucmVwbHlJZCkhKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VSZXNwb25zZVByb21pc2VzLmRlbGV0ZShwcm9wZXJ0aWVzLnJlcGx5SWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IHJlZmFjdG9yIHRoZSB2aWV3SWQgLyB0YXJnZXQgaW5jb25zaXN0ZW5jaWVzXHJcbiAgICBwdWJsaWMgaW52b2tlTWVzc2FnZShwcm9wZXJ0aWVzOiBJbnZva2VNZXNzYWdlUHJvcHMpIHtcclxuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLm1lc3NhZ2VDYWxsYmFja3MuZ2V0KHByb3BlcnRpZXMubWVzc2FnZVR5cGUpXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrcylcclxuICAgICAgICAgICAgY2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCghY2FsbGJhY2sudmlld0lkKSB8fCBjYWxsYmFjay52aWV3SWQgPT0gcHJvcGVydGllcy52aWV3SWQpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbGJhY2socHJvcGVydGllcy5tZXNzYWdlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRVbmlxdWVSZXBseUlkKCkge1xyXG4gICAgICAgIHJldHVybiBgJHtNYXRoLnJhbmRvbSgpfV8ke01hdGgucmFuZG9tKCl9YFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgd2ViVmlld0hvc3RJbnN0YW5jZSA9IG5ldyBXZWJWaWV3SG9zdCgpXHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWJWaWV3SG9zdEluc3RhbmNlXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgU2t5cmltQVBJIGZyb20gJy4vU2t5cmltQVBJJ1xyXG5pbXBvcnQgV2ViVmlld0hvc3QgZnJvbSAnLi9XZWJWaWV3SG9zdCdcclxuaW1wb3J0IFdlYlZpZXcgZnJvbSAnLi9XZWJWaWV3J1xyXG5cclxuKHdpbmRvdyBhcyBhbnkpLl9fd2ViVmlld0hvc3QgPSBXZWJWaWV3SG9zdDtcclxuXHJcbi8qXHJcbiAqIERlZmluZSBgcGFyZW50Ljxmbj5gIGludGVyZmFjZXMgZm9yIGlmcmFtZXNcclxuICovXHJcblxyXG4od2luZG93IGFzIGFueSkuZ2V0V2ViVmlldyA9IChpZDogc3RyaW5nKSA9PiBXZWJWaWV3SG9zdC5nZXRXZWJWaWV3KGlkKTtcclxuKHdpbmRvdyBhcyBhbnkpLnNreXJpbSA9IFNreXJpbUFQSTtcclxuKHdpbmRvdyBhcyBhbnkpLldlYlZpZXcgPSBXZWJWaWV3XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICh3aW5kb3cgYXMgYW55KS5za3lyaW1QbGF0Zm9ybS5zZW5kTWVzc2FnZSgnV2ViVUknLCB7IG1lc3NhZ2VUeXBlOiAnd2Vidmlld2hvc3Rsb2FkZWQnIH0pXHJcbn0pXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==