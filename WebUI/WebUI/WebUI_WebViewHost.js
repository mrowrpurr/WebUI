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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7Ozs7Ozs7Ozs7OztBQ3RCQSxpRkFBbUM7QUFDbkMsdUZBQXVDO0FBQ3ZDLDJFQUErQjtBQUU5QixNQUFjLENBQUMsYUFBYSxHQUFHLHFCQUFXLENBQUM7QUFFNUM7O0dBRUc7QUFFRixNQUFjLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN2RSxNQUFjLENBQUMsTUFBTSxHQUFHLG1CQUFTLENBQUM7QUFDbEMsTUFBYyxDQUFDLE9BQU8sR0FBRyxpQkFBTztBQUVqQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNoQyxNQUFjLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztBQUM3RixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9Ta3lyaW1BUEkudHMiLCJ3ZWJwYWNrOi8vc2t5cmltLXdlYnVpLWNvbXBvbmVudGhvc3QvLi9zcmMvV2ViVmlldy50cyIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9XZWJWaWV3SG9zdC50cyIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBIVE1MIFdlYiBGcm9udGVuZFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTa3lyaW1BUEkge1xyXG4gICAgcHVibGljIGhlbGxvKCkge1xyXG4gICAgICAgIGFsZXJ0KCdIRUxMTyBUSEVSRScpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBTa3lyaW1BUEkoKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpIiwiLypcclxuICogSFRNTCBXZWIgRnJvbnRlbmRcclxuICovXHJcblxyXG5pbXBvcnQgeyBXZWJWaWV3TWVzc2FnZSwgV2ViVmlld0V2ZW50LCBXZWJWaWV3UmVxdWVzdCwgV2ViVmlld1Jlc3BvbnNlIH0gZnJvbSAnLi9XZWJWaWV3RXZlbnRzJ1xyXG5pbXBvcnQgeyBXZWJWaWV3SG9zdCwgd2ViVmlld0hvc3RJbnN0YW5jZSB9IGZyb20gJy4vV2ViVmlld0hvc3QnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdlYlZpZXdTY3JlZW5Qb3NpdGlvbiB7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXIsXHJcbiAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgaGVpZ2h0OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXZWJWaWV3UHJvcHMge1xyXG4gICAgaWQ6IHN0cmluZyxcclxuICAgIHVybDogc3RyaW5nLFxyXG4gICAgcG9zaXRpb246IFdlYlZpZXdTY3JlZW5Qb3NpdGlvbixcclxuICAgIHZpc2libGU6IGJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViVmlldyB7XHJcbiAgICBpZDogc3RyaW5nXHJcbiAgICB1cmw6IHN0cmluZ1xyXG4gICAgcG9zaXRpb246IFdlYlZpZXdTY3JlZW5Qb3NpdGlvblxyXG4gICAgdmlzaWJsZTogYm9vbGVhblxyXG4gICAgd2ViVmlld0hvc3Q6IFdlYlZpZXdIb3N0XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcGVydGllczogV2ViVmlld1Byb3BzLCB3ZWJWaWV3SG9zdDogV2ViVmlld0hvc3QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmlkID0gcHJvcGVydGllcy5pZFxyXG4gICAgICAgIHRoaXMudXJsID0gcHJvcGVydGllcy51cmxcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcHJvcGVydGllcy5wb3NpdGlvblxyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHByb3BlcnRpZXMudmlzaWJsZVxyXG4gICAgICAgIGlmICghd2ViVmlld0hvc3QpXHJcbiAgICAgICAgICAgIHdlYlZpZXdIb3N0ID0gd2ViVmlld0hvc3RJbnN0YW5jZVxyXG4gICAgICAgIHRoaXMud2ViVmlld0hvc3QgPSB3ZWJWaWV3SG9zdCFcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdldmVudCcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld0V2ZW50KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiAncmVxdWVzdCcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld1JlcXVlc3QpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdtZXNzYWdlJywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMud2ViVmlld0hvc3Qub24obWVzc2FnZVR5cGUsIHRoaXMuaWQsIGNhbGxiYWNrKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAnZXZlbnQnLCBtZXNzYWdlOiBXZWJWaWV3RXZlbnQpOiBQcm9taXNlPGFueT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAncmVxdWVzdCcsIG1lc3NhZ2U6IFdlYlZpZXdSZXF1ZXN0KTogUHJvbWlzZTxXZWJWaWV3UmVzcG9uc2U+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ21lc3NhZ2UnLCBtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdsb2FkJywgbWVzc2FnZTogV2ViVmlld01lc3NhZ2UpOiBQcm9taXNlPGFueT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWJWaWV3SG9zdC5zZW5kKG1lc3NhZ2VUeXBlLCB0aGlzLmlkLCBtZXNzYWdlKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXBseShyZXF1ZXN0OiBXZWJWaWV3UmVxdWVzdCwgcmVzcG9uc2U6IFdlYlZpZXdSZXNwb25zZSkge1xyXG4gICAgICAgIHRoaXMud2ViVmlld0hvc3QucmVwbHkocmVxdWVzdCwgdGhpcy5pZCwgcmVzcG9uc2UpXHJcbiAgICB9XHJcbn1cclxuIiwiLypcclxuICogSFRNTCBXZWIgRnJvbnRlbmRcclxuICovXHJcblxyXG5pbXBvcnQgV2ViVmlldywgeyBXZWJWaWV3UHJvcHMgfSBmcm9tICcuL1dlYlZpZXcnXHJcbmltcG9ydCB7IFdlYlZpZXdNZXNzYWdlLCBXZWJWaWV3RXZlbnQsIFdlYlZpZXdSZXF1ZXN0LCBXZWJWaWV3UmVzcG9uc2UgfSBmcm9tICcuL1dlYlZpZXdFdmVudHMnXHJcblxyXG5pbnRlcmZhY2UgV2ViVmlld0V2ZW50Q2FsbGJhY2sge1xyXG4gICAgdmlld0lkOiBzdHJpbmcsXHJcbiAgICBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gYW55XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnZva2VNZXNzYWdlUHJvcHMge1xyXG4gICAgbWVzc2FnZVR5cGU6IHN0cmluZywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IGFueVxyXG59XHJcblxyXG5pbnRlcmZhY2UgT25SZXBseVByb3BzIGV4dGVuZHMgV2ViVmlld1Jlc3BvbnNlIHtcclxuICAgIHJlcGx5SWQ6IHN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2ViVmlld0hvc3Qge1xyXG4gICAgd2ViVmlld3MgPSBuZXcgTWFwPHN0cmluZywgV2ViVmlldz4oKVxyXG4gICAgaWZyYW1lc0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MSUZyYW1lRWxlbWVudD4oKVxyXG4gICAgcmVxdWVzdFJlc3VsdFByb21pc2VzID0gbmV3IE1hcDxzdHJpbmcsIChkYXRhOiBhbnkpID0+IHZvaWQ+KClcclxuICAgIG1lc3NhZ2VDYWxsYmFja3MgPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8V2ViVmlld0V2ZW50Q2FsbGJhY2s+PigpXHJcbiAgICBtZXNzYWdlUmVzcG9uc2VQcm9taXNlcyA9IG5ldyBNYXA8c3RyaW5nLCAocmVzcG9uc2U6IFdlYlZpZXdSZXNwb25zZSkgPT4gdm9pZD4oKVxyXG5cclxuICAgIHB1YmxpYyBnZXRXZWJWaWV3KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWJWaWV3cy5nZXQoaWQudG9Mb3dlckNhc2UoKSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRnJvbVByb3BzKHdlYlZpZXdQcm9wczogV2ViVmlld1Byb3BzKSB7XHJcbiAgICAgICAgdGhpcy5hZGQobmV3IFdlYlZpZXcod2ViVmlld1Byb3BzKSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVsb2FkV2ViVmlldyhpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2ViVmlld3MuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICBjb25zdCBpZnJhbWUgPSB0aGlzLmlmcmFtZXNCeU5hbWUuZ2V0KGlkKVxyXG4gICAgICAgICAgICBpZiAoaWZyYW1lKSBpZnJhbWUuY29udGVudFdpbmRvdz8ubG9jYXRpb24ucmVsb2FkKClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZCh3ZWJWaWV3OiBXZWJWaWV3KSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2ViVmlld3MuaGFzKHdlYlZpZXcuaWQpKVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSh3ZWJWaWV3LmlkKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy53ZWJWaWV3cy5zZXQod2ViVmlldy5pZCwgd2ViVmlldylcclxuICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKVxyXG4gICAgICAgIHRoaXMuaWZyYW1lc0J5TmFtZS5zZXQod2ViVmlldy5pZCwgaWZyYW1lKVxyXG4gICAgICAgIGlmcmFtZS5zdHlsZS5sZWZ0ID0gKHdpbmRvdy5pbm5lcldpZHRoICogKHdlYlZpZXcucG9zaXRpb24ueCAvIDEwMCkpLnRvRml4ZWQoKSArICdweCdcclxuICAgICAgICBpZnJhbWUuc3R5bGUudG9wID0gKHdpbmRvdy5pbm5lckhlaWdodCAqICh3ZWJWaWV3LnBvc2l0aW9uLnkgLyAxMDApKS50b0ZpeGVkKCkgKyAncHgnXHJcbiAgICAgICAgaWZyYW1lLnN0eWxlLmhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgKiAod2ViVmlldy5wb3NpdGlvbi5oZWlnaHQgLyAxMDApKS50b0ZpeGVkKCkgKyAncHgnXHJcbiAgICAgICAgaWZyYW1lLnN0eWxlLndpZHRoID0gKHdpbmRvdy5pbm5lcldpZHRoICogKHdlYlZpZXcucG9zaXRpb24ud2lkdGggLyAxMDApKS50b0ZpeGVkKCkgKyAncHgnXHJcbiAgICAgICAgaWZyYW1lLmZyYW1lQm9yZGVyID0gJzAnXHJcbiAgICAgICAgaWZyYW1lLnNjcm9sbGluZyA9ICdmYWxzZSdcclxuICAgICAgICBpZnJhbWUuc3JjID0gd2ViVmlldy51cmxcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoaWZyYW1lKVxyXG4gICAgICAgIGlmIChpZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICAgICAgICBpZnJhbWUuY29udGVudFdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24obXNnLCB1cmwsIGxpbmVudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJvciBtZXNzYWdlOiAnICsgbXNnICsgJ1xcblVSTDogJyArIHVybCArICdcXG5MaW5lIE51bWJlcjogJyArIGxpbmVudW1iZXIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmcmFtZS5jb250ZW50V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmQoJ2xvYWQnLCB3ZWJWaWV3LmlkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld0lkOiB3ZWJWaWV3LmlkXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLndlYlZpZXdzLmRlbGV0ZShpZClcclxuICAgICAgICBjb25zdCBpZnJhbWUgPSB0aGlzLmlmcmFtZXNCeU5hbWUuZ2V0KGlkKVxyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZChpZnJhbWUhKVxyXG4gICAgICAgIHRoaXMuaWZyYW1lc0J5TmFtZS5kZWxldGUoaWQpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiAnZXZlbnQnLCB2aWV3SWQ6IHN0cmluZywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3RXZlbnQpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdyZXF1ZXN0Jywgdmlld0lkOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld1JlcXVlc3QpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdtZXNzYWdlJywgdmlld0lkOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld01lc3NhZ2UpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6IHN0cmluZywgdmlld0lkOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogYW55KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIHZpZXdJZDogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5tZXNzYWdlQ2FsbGJhY2tzLmhhcyhtZXNzYWdlVHlwZSkpXHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNhbGxiYWNrcy5zZXQobWVzc2FnZVR5cGUsIEFycmF5PFdlYlZpZXdFdmVudENhbGxiYWNrPigpKVxyXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMubWVzc2FnZUNhbGxiYWNrcy5nZXQobWVzc2FnZVR5cGUpXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrcylcclxuICAgICAgICAgICAgY2FsbGJhY2tzLnB1c2goeyB2aWV3SWQsIGNhbGxiYWNrIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdtZXNzYWdlJywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IFdlYlZpZXdNZXNzYWdlKTogUHJvbWlzZTx1bmRlZmluZWQ+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ2V2ZW50Jywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IFdlYlZpZXdFdmVudCk6IFByb21pc2U8dW5kZWZpbmVkPlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdyZXF1ZXN0Jywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IFdlYlZpZXdSZXF1ZXN0KTogUHJvbWlzZTxXZWJWaWV3UmVzcG9uc2U+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ2xvYWQnLCB2aWV3SWQ6IHN0cmluZywgbWVzc2FnZTogV2ViVmlld01lc3NhZ2UpOiBQcm9taXNlPHVuZGVmaW5lZD5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIHZpZXdJZDogc3RyaW5nLCBtZXNzYWdlOiBhbnkpOiBQcm9taXNlPHVuZGVmaW5lZD5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIHZpZXdJZDogc3RyaW5nLCBtZXNzYWdlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGlmICghbWVzc2FnZS5zb3VyY2UpIG1lc3NhZ2Uuc291cmNlID0gdmlld0lkXHJcbiAgICAgICAgaWYgKCFtZXNzYWdlLnRhcmdldCkgbWVzc2FnZS50YXJnZXQgPSB2aWV3SWRcclxuICAgICAgICBpZiAobWVzc2FnZVR5cGUgPT0gJ3JlcXVlc3QnKSB7XHJcbiAgICAgICAgICAgIGlmICghbWVzc2FnZS5yZXBseUlkKSBtZXNzYWdlLnJlcGx5SWQgPSB0aGlzLmdldFVuaXF1ZVJlcGx5SWQoKVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8V2ViVmlld1Jlc3BvbnNlPihyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5za3lyaW1QbGF0Zm9ybS5zZW5kTWVzc2FnZSgnV2ViVUknLCB7IG1lc3NhZ2VUeXBlLCBtZXNzYWdlLCB0YXJnZXQ6IHZpZXdJZCB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlUmVzcG9uc2VQcm9taXNlcy5zZXQobWVzc2FnZS5yZXBseUlkLCByZXNvbHZlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLnNreXJpbVBsYXRmb3JtLnNlbmRNZXNzYWdlKCdXZWJVSScsIHsgbWVzc2FnZVR5cGUsIG1lc3NhZ2UsIHRhcmdldDogdmlld0lkIH0pXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogYWJzdHJhY3Qgd2luZG93LnNreXJpbVBsYXRmb3JtIHdpdGggYW4gb2JqZWN0IHdlIGNhbiBwcm92aWRlIHRvIHRoZSB3ZWJ2aWV3aG9zdFxyXG5cclxuICAgIHB1YmxpYyByZXBseShyZXF1ZXN0OiBXZWJWaWV3UmVxdWVzdCwgdmlld0lkOiBzdHJpbmcsIHJlc3BvbnNlOiBXZWJWaWV3UmVzcG9uc2UpIHtcclxuICAgICAgICAod2luZG93IGFzIGFueSkuc2t5cmltUGxhdGZvcm0uc2VuZE1lc3NhZ2UoJ1dlYlVJJywge1xyXG4gICAgICAgICAgICB0YXJnZXQ6IHZpZXdJZCxcclxuICAgICAgICAgICAgbWVzc2FnZVR5cGU6ICdyZXNwb25zZScsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IHsgcmVwbHlJZDogcmVxdWVzdC5yZXBseUlkLCByZXNwb25zZTogcmVzcG9uc2UgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uUmVwbHkocHJvcGVydGllczogT25SZXBseVByb3BzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZVJlc3BvbnNlUHJvbWlzZXMuaGFzKHByb3BlcnRpZXMucmVwbHlJZCkpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBwcm9wZXJ0aWVzIGFzIFdlYlZpZXdSZXNwb25zZVxyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VSZXNwb25zZVByb21pc2VzLmdldChwcm9wZXJ0aWVzLnJlcGx5SWQpIShyZXNwb25zZSlcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlUmVzcG9uc2VQcm9taXNlcy5kZWxldGUocHJvcGVydGllcy5yZXBseUlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiByZWZhY3RvciB0aGUgdmlld0lkIC8gdGFyZ2V0IGluY29uc2lzdGVuY2llc1xyXG4gICAgcHVibGljIGludm9rZU1lc3NhZ2UocHJvcGVydGllczogSW52b2tlTWVzc2FnZVByb3BzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaWZyYW1lc0J5TmFtZS5oYXMocHJvcGVydGllcy52aWV3SWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlmcmFtZSA9IHRoaXMuaWZyYW1lc0J5TmFtZS5nZXQocHJvcGVydGllcy52aWV3SWQpXHJcbiAgICAgICAgICAgIGlmcmFtZT8uY29udGVudFdpbmRvdz8ucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVR5cGU6IHByb3BlcnRpZXMubWVzc2FnZVR5cGUsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBwcm9wZXJ0aWVzLm1lc3NhZ2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc3QgY2FsbGJhY2tzID0gdGhpcy5tZXNzYWdlQ2FsbGJhY2tzLmdldChwcm9wZXJ0aWVzLm1lc3NhZ2VUeXBlKVxyXG4gICAgICAgIC8vIGlmIChjYWxsYmFja3MpXHJcbiAgICAgICAgLy8gICAgIGNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIGlmICgoIWNhbGxiYWNrLnZpZXdJZCkgfHwgY2FsbGJhY2sudmlld0lkID09IHByb3BlcnRpZXMudmlld0lkKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGxiYWNrKHByb3BlcnRpZXMubWVzc2FnZSlcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0VW5pcXVlUmVwbHlJZCgpIHtcclxuICAgICAgICByZXR1cm4gYCR7TWF0aC5yYW5kb20oKX1fJHtNYXRoLnJhbmRvbSgpfWBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHdlYlZpZXdIb3N0SW5zdGFuY2UgPSBuZXcgV2ViVmlld0hvc3QoKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2ViVmlld0hvc3RJbnN0YW5jZVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IFNreXJpbUFQSSBmcm9tICcuL1NreXJpbUFQSSdcclxuaW1wb3J0IFdlYlZpZXdIb3N0IGZyb20gJy4vV2ViVmlld0hvc3QnXHJcbmltcG9ydCBXZWJWaWV3IGZyb20gJy4vV2ViVmlldydcclxuXHJcbih3aW5kb3cgYXMgYW55KS5fX3dlYlZpZXdIb3N0ID0gV2ViVmlld0hvc3Q7XHJcblxyXG4vKlxyXG4gKiBEZWZpbmUgYHBhcmVudC48Zm4+YCBpbnRlcmZhY2VzIGZvciBpZnJhbWVzXHJcbiAqL1xyXG5cclxuKHdpbmRvdyBhcyBhbnkpLmdldFdlYlZpZXcgPSAoaWQ6IHN0cmluZykgPT4gV2ViVmlld0hvc3QuZ2V0V2ViVmlldyhpZCk7XHJcbih3aW5kb3cgYXMgYW55KS5za3lyaW0gPSBTa3lyaW1BUEk7XHJcbih3aW5kb3cgYXMgYW55KS5XZWJWaWV3ID0gV2ViVmlld1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAod2luZG93IGFzIGFueSkuc2t5cmltUGxhdGZvcm0uc2VuZE1lc3NhZ2UoJ1dlYlVJJywgeyBtZXNzYWdlVHlwZTogJ3dlYnZpZXdob3N0bG9hZGVkJyB9KVxyXG59KVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=