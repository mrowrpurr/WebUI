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
        return this.webViews.get(id);
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
    onReply(properties) {
        if (this.messageResponsePromises.has(properties.replyId)) {
            const response = properties;
            this.messageResponsePromises.get(properties.replyId)(response);
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
window.getWebView = (id) => WebViewHost_1.default.getWebView(id);
window.skyrim = SkyrimAPI_1.default;
window.WebView = WebView_1.default;
window.addEventListener('load', () => {
    window.skyrimPlatform.sendMessage('WebUI', { messageType: 'webviewhostloaded' });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7Ozs7Ozs7O0FDdEJBLGlGQUFtQztBQUNuQyx1RkFBdUM7QUFDdkMsMkVBQStCO0FBRTlCLE1BQWMsQ0FBQyxhQUFhLEdBQUcscUJBQVcsQ0FBQztBQUMzQyxNQUFjLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBVSxFQUFFLEVBQUUsQ0FBQyxxQkFBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN2RSxNQUFjLENBQUMsTUFBTSxHQUFHLG1CQUFTLENBQUM7QUFDbEMsTUFBYyxDQUFDLE9BQU8sR0FBRyxpQkFBTztBQUVqQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNoQyxNQUFjLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztBQUM3RixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9Ta3lyaW1BUEkudHMiLCJ3ZWJwYWNrOi8vc2t5cmltLXdlYnVpLWNvbXBvbmVudGhvc3QvLi9zcmMvV2ViVmlldy50cyIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9XZWJWaWV3SG9zdC50cyIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBIVE1MIFdlYiBGcm9udGVuZFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTa3lyaW1BUEkge1xyXG4gICAgcHVibGljIGhlbGxvKCkge1xyXG4gICAgICAgIGFsZXJ0KCdIRUxMTyBUSEVSRScpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBTa3lyaW1BUEkoKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpIiwiLypcclxuICogSFRNTCBXZWIgRnJvbnRlbmRcclxuICovXHJcblxyXG5pbXBvcnQgeyBXZWJWaWV3TWVzc2FnZSwgV2ViVmlld0V2ZW50LCBXZWJWaWV3UmVxdWVzdCwgV2ViVmlld1Jlc3BvbnNlIH0gZnJvbSAnLi9XZWJWaWV3RXZlbnRzJ1xyXG5pbXBvcnQgeyBXZWJWaWV3SG9zdCwgd2ViVmlld0hvc3RJbnN0YW5jZSB9IGZyb20gJy4vV2ViVmlld0hvc3QnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdlYlZpZXdTY3JlZW5Qb3NpdGlvbiB7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXIsXHJcbiAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgaGVpZ2h0OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXZWJWaWV3UHJvcHMge1xyXG4gICAgaWQ6IHN0cmluZyxcclxuICAgIHVybDogc3RyaW5nLFxyXG4gICAgcG9zaXRpb246IFdlYlZpZXdTY3JlZW5Qb3NpdGlvbixcclxuICAgIHZpc2libGU6IGJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViVmlldyB7XHJcbiAgICBpZDogc3RyaW5nXHJcbiAgICB1cmw6IHN0cmluZ1xyXG4gICAgcG9zaXRpb246IFdlYlZpZXdTY3JlZW5Qb3NpdGlvblxyXG4gICAgdmlzaWJsZTogYm9vbGVhblxyXG4gICAgd2ViVmlld0hvc3Q6IFdlYlZpZXdIb3N0XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcGVydGllczogV2ViVmlld1Byb3BzLCB3ZWJWaWV3SG9zdDogV2ViVmlld0hvc3QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmlkID0gcHJvcGVydGllcy5pZFxyXG4gICAgICAgIHRoaXMudXJsID0gcHJvcGVydGllcy51cmxcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcHJvcGVydGllcy5wb3NpdGlvblxyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHByb3BlcnRpZXMudmlzaWJsZVxyXG4gICAgICAgIGlmICghd2ViVmlld0hvc3QpXHJcbiAgICAgICAgICAgIHdlYlZpZXdIb3N0ID0gd2ViVmlld0hvc3RJbnN0YW5jZVxyXG4gICAgICAgIHRoaXMud2ViVmlld0hvc3QgPSB3ZWJWaWV3SG9zdCFcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdldmVudCcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld0V2ZW50KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiAncmVxdWVzdCcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld1JlcXVlc3QpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdtZXNzYWdlJywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMud2ViVmlld0hvc3Qub24obWVzc2FnZVR5cGUsIHRoaXMuaWQsIGNhbGxiYWNrKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAnZXZlbnQnLCBtZXNzYWdlOiBXZWJWaWV3RXZlbnQpOiBQcm9taXNlPGFueT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAncmVxdWVzdCcsIG1lc3NhZ2U6IFdlYlZpZXdSZXF1ZXN0KTogUHJvbWlzZTxXZWJWaWV3UmVzcG9uc2U+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ21lc3NhZ2UnLCBtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdsb2FkJywgbWVzc2FnZTogV2ViVmlld01lc3NhZ2UpOiBQcm9taXNlPGFueT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWJWaWV3SG9zdC5zZW5kKG1lc3NhZ2VUeXBlLCB0aGlzLmlkLCBtZXNzYWdlKVxyXG4gICAgfVxyXG59XHJcbiIsIi8qXHJcbiAqIEhUTUwgV2ViIEZyb250ZW5kXHJcbiAqL1xyXG5cclxuaW1wb3J0IFdlYlZpZXcsIHsgV2ViVmlld1Byb3BzIH0gZnJvbSAnLi9XZWJWaWV3J1xyXG5pbXBvcnQgeyBXZWJWaWV3TWVzc2FnZSwgV2ViVmlld0V2ZW50LCBXZWJWaWV3UmVxdWVzdCwgV2ViVmlld1Jlc3BvbnNlIH0gZnJvbSAnLi9XZWJWaWV3RXZlbnRzJ1xyXG5cclxuaW50ZXJmYWNlIFdlYlZpZXdFdmVudENhbGxiYWNrIHtcclxuICAgIHZpZXdJZDogc3RyaW5nLFxyXG4gICAgY2FsbGJhY2s6IChtZXNzYWdlOiBhbnkpID0+IGFueVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSW52b2tlTWVzc2FnZVByb3BzIHtcclxuICAgIG1lc3NhZ2VUeXBlOiBzdHJpbmcsIHZpZXdJZDogc3RyaW5nLCBtZXNzYWdlOiBhbnlcclxufVxyXG5cclxuaW50ZXJmYWNlIE9uUmVwbHlQcm9wcyBleHRlbmRzIFdlYlZpZXdSZXNwb25zZSB7XHJcbiAgICByZXBseUlkOiBzdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdlYlZpZXdIb3N0IHtcclxuICAgIHdlYlZpZXdzID0gbmV3IE1hcDxzdHJpbmcsIFdlYlZpZXc+KClcclxuICAgIGlmcmFtZXNCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgSFRNTElGcmFtZUVsZW1lbnQ+KClcclxuICAgIHJlcXVlc3RSZXN1bHRQcm9taXNlcyA9IG5ldyBNYXA8c3RyaW5nLCAoZGF0YTogYW55KSA9PiB2b2lkPigpXHJcbiAgICBtZXNzYWdlQ2FsbGJhY2tzID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PFdlYlZpZXdFdmVudENhbGxiYWNrPj4oKVxyXG4gICAgbWVzc2FnZVJlc3BvbnNlUHJvbWlzZXMgPSBuZXcgTWFwPHN0cmluZywgKHJlc3BvbnNlOiBXZWJWaWV3UmVzcG9uc2UpID0+IHZvaWQ+KClcclxuXHJcbiAgICBwdWJsaWMgZ2V0V2ViVmlldyhpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2ViVmlld3MuZ2V0KGlkKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRGcm9tUHJvcHMod2ViVmlld1Byb3BzOiBXZWJWaWV3UHJvcHMpIHtcclxuICAgICAgICB0aGlzLmFkZChuZXcgV2ViVmlldyh3ZWJWaWV3UHJvcHMpKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGQod2ViVmlldzogV2ViVmlldykge1xyXG4gICAgICAgIGlmICh0aGlzLndlYlZpZXdzLmhhcyh3ZWJWaWV3LmlkKSlcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUod2ViVmlldy5pZClcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMud2ViVmlld3Muc2V0KHdlYlZpZXcuaWQsIHdlYlZpZXcpXHJcbiAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJylcclxuICAgICAgICB0aGlzLmlmcmFtZXNCeU5hbWUuc2V0KHdlYlZpZXcuaWQsIGlmcmFtZSlcclxuICAgICAgICBpZnJhbWUuc3R5bGUubGVmdCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAqICh3ZWJWaWV3LnBvc2l0aW9uLnggLyAxMDApKS50b0ZpeGVkKCkgKyAncHgnXHJcbiAgICAgICAgaWZyYW1lLnN0eWxlLnRvcCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgKiAod2ViVmlldy5wb3NpdGlvbi55IC8gMTAwKSkudG9GaXhlZCgpICsgJ3B4J1xyXG4gICAgICAgIGlmcmFtZS5zdHlsZS5oZWlnaHQgPSAod2luZG93LmlubmVySGVpZ2h0ICogKHdlYlZpZXcucG9zaXRpb24uaGVpZ2h0IC8gMTAwKSkudG9GaXhlZCgpICsgJ3B4J1xyXG4gICAgICAgIGlmcmFtZS5zdHlsZS53aWR0aCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAqICh3ZWJWaWV3LnBvc2l0aW9uLndpZHRoIC8gMTAwKSkudG9GaXhlZCgpICsgJ3B4J1xyXG4gICAgICAgIGlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJ1xyXG4gICAgICAgIGlmcmFtZS5zY3JvbGxpbmcgPSAnZmFsc2UnXHJcbiAgICAgICAgaWZyYW1lLnNyYyA9IHdlYlZpZXcudXJsXHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGlmcmFtZSlcclxuICAgICAgICBpZiAoaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgICAgICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKG1zZywgdXJsLCBsaW5lbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3IgbWVzc2FnZTogJyArIG1zZyArICdcXG5VUkw6ICcgKyB1cmwgKyAnXFxuTGluZSBOdW1iZXI6ICcgKyBsaW5lbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZnJhbWUuY29udGVudFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kKCdsb2FkJywgd2ViVmlldy5pZCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdJZDogd2ViVmlldy5pZFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbW92ZShpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy53ZWJWaWV3cy5kZWxldGUoaWQpXHJcbiAgICAgICAgY29uc3QgaWZyYW1lID0gdGhpcy5pZnJhbWVzQnlOYW1lLmdldChpZClcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoaWZyYW1lISlcclxuICAgICAgICB0aGlzLmlmcmFtZXNCeU5hbWUuZGVsZXRlKGlkKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogJ2V2ZW50Jywgdmlld0lkOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld0V2ZW50KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiAncmVxdWVzdCcsIHZpZXdJZDogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IFdlYlZpZXdSZXF1ZXN0KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiAnbWVzc2FnZScsIHZpZXdJZDogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IFdlYlZpZXdNZXNzYWdlKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIHZpZXdJZDogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogc3RyaW5nLCB2aWV3SWQ6IHN0cmluZywgY2FsbGJhY2s6IChtZXNzYWdlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMubWVzc2FnZUNhbGxiYWNrcy5oYXMobWVzc2FnZVR5cGUpKVxyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VDYWxsYmFja3Muc2V0KG1lc3NhZ2VUeXBlLCBBcnJheTxXZWJWaWV3RXZlbnRDYWxsYmFjaz4oKSlcclxuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLm1lc3NhZ2VDYWxsYmFja3MuZ2V0KG1lc3NhZ2VUeXBlKVxyXG4gICAgICAgIGlmIChjYWxsYmFja3MpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKHsgdmlld0lkLCBjYWxsYmFjayB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAnbWVzc2FnZScsIHZpZXdJZDogc3RyaW5nLCBtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSk6IFByb21pc2U8dW5kZWZpbmVkPlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdldmVudCcsIHZpZXdJZDogc3RyaW5nLCBtZXNzYWdlOiBXZWJWaWV3RXZlbnQpOiBQcm9taXNlPHVuZGVmaW5lZD5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAncmVxdWVzdCcsIHZpZXdJZDogc3RyaW5nLCBtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSk6IFByb21pc2U8V2ViVmlld1Jlc3BvbnNlPlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdsb2FkJywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IFdlYlZpZXdNZXNzYWdlKTogUHJvbWlzZTx1bmRlZmluZWQ+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogc3RyaW5nLCB2aWV3SWQ6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTx1bmRlZmluZWQ+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogc3RyaW5nLCB2aWV3SWQ6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBpZiAoIW1lc3NhZ2Uuc291cmNlKSBtZXNzYWdlLnNvdXJjZSA9IHZpZXdJZFxyXG4gICAgICAgIGlmICghbWVzc2FnZS50YXJnZXQpIG1lc3NhZ2UudGFyZ2V0ID0gdmlld0lkXHJcbiAgICAgICAgaWYgKG1lc3NhZ2VUeXBlID09ICdyZXF1ZXN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8V2ViVmlld1Jlc3BvbnNlPihyZXNvbHZlID0+IHtcclxuICAgICAgICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5za3lyaW1QbGF0Zm9ybS5zZW5kTWVzc2FnZSgnV2ViVUknLCB7IG1lc3NhZ2VUeXBlLCBtZXNzYWdlLCB0YXJnZXQ6IHZpZXdJZCB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlUmVzcG9uc2VQcm9taXNlcy5zZXQobWVzc2FnZS5yZXBseUlkLCByZXNvbHZlKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KHJlc29sdmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgKHdpbmRvdyBhcyBhbnkpLnNreXJpbVBsYXRmb3JtLnNlbmRNZXNzYWdlKCdXZWJVSScsIHsgbWVzc2FnZVR5cGUsIG1lc3NhZ2UsIHRhcmdldDogdmlld0lkIH0pXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uUmVwbHkocHJvcGVydGllczogT25SZXBseVByb3BzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZVJlc3BvbnNlUHJvbWlzZXMuaGFzKHByb3BlcnRpZXMucmVwbHlJZCkpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBwcm9wZXJ0aWVzIGFzIFdlYlZpZXdSZXNwb25zZVxyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VSZXNwb25zZVByb21pc2VzLmdldChwcm9wZXJ0aWVzLnJlcGx5SWQpIShyZXNwb25zZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogcmVmYWN0b3IgdGhlIHZpZXdJZCAvIHRhcmdldCBpbmNvbnNpc3RlbmNpZXNcclxuICAgIHB1YmxpYyBpbnZva2VNZXNzYWdlKHByb3BlcnRpZXM6IEludm9rZU1lc3NhZ2VQcm9wcykge1xyXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMubWVzc2FnZUNhbGxiYWNrcy5nZXQocHJvcGVydGllcy5tZXNzYWdlVHlwZSlcclxuICAgICAgICBpZiAoY2FsbGJhY2tzKVxyXG4gICAgICAgICAgICBjYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKCFjYWxsYmFjay52aWV3SWQpIHx8IGNhbGxiYWNrLnZpZXdJZCA9PSBwcm9wZXJ0aWVzLnZpZXdJZClcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsYmFjayhwcm9wZXJ0aWVzLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB3ZWJWaWV3SG9zdEluc3RhbmNlID0gbmV3IFdlYlZpZXdIb3N0KClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlYlZpZXdIb3N0SW5zdGFuY2VcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCBTa3lyaW1BUEkgZnJvbSAnLi9Ta3lyaW1BUEknXHJcbmltcG9ydCBXZWJWaWV3SG9zdCBmcm9tICcuL1dlYlZpZXdIb3N0J1xyXG5pbXBvcnQgV2ViVmlldyBmcm9tICcuL1dlYlZpZXcnXHJcblxyXG4od2luZG93IGFzIGFueSkuX193ZWJWaWV3SG9zdCA9IFdlYlZpZXdIb3N0O1xyXG4od2luZG93IGFzIGFueSkuZ2V0V2ViVmlldyA9IChpZDogc3RyaW5nKSA9PiBXZWJWaWV3SG9zdC5nZXRXZWJWaWV3KGlkKTtcclxuKHdpbmRvdyBhcyBhbnkpLnNreXJpbSA9IFNreXJpbUFQSTtcclxuKHdpbmRvdyBhcyBhbnkpLldlYlZpZXcgPSBXZWJWaWV3XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICh3aW5kb3cgYXMgYW55KS5za3lyaW1QbGF0Zm9ybS5zZW5kTWVzc2FnZSgnV2ViVUknLCB7IG1lc3NhZ2VUeXBlOiAnd2Vidmlld2hvc3Rsb2FkZWQnIH0pXHJcbn0pXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==