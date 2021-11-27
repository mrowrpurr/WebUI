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
        window.alert(`frontend ON ${messageType}`);
        if (!this.messageCallbacks.has(messageType))
            this.messageCallbacks.set(messageType, Array());
        const callbacks = this.messageCallbacks.get(messageType);
        if (callbacks)
            callbacks.push({ viewId, callback });
    }
    send(messageType, viewId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            // Invoke JS
            if (!message.source)
                message.source = viewId;
            if (!message.target)
                message.target = viewId;
            window.alert(`Sending Message from Frontend to Backend: ${messageType} ${JSON.stringify(message)}`);
            window.skyrimPlatform.sendMessage('WebUI', {
                messageType, message, target: viewId
            });
            // TODO return Promise
        });
    }
    // TODO: refactor the viewId / target inconsistencies
    invokeMessage(properties) {
        window.alert(`frontend INVOKE ${properties.messageType}`);
        const callbacks = this.messageCallbacks.get(properties.messageType);
        window.alert(`[Frontend] invokeMessage received from Backend: ${JSON.stringify(properties)} --> ${callbacks.length}`);
        if (callbacks)
            callbacks.forEach(callback => {
                window.alert(`CALLBACK: ${callback}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU8sR0FBRyxpQkFBTztBQUVqQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtJQUNoQyxNQUFjLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztBQUM3RixDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9Ta3lyaW1BUEkudHMiLCJ3ZWJwYWNrOi8vc2t5cmltLXdlYnVpLWNvbXBvbmVudGhvc3QvLi9zcmMvV2ViVmlldy50cyIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9XZWJWaWV3SG9zdC50cyIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBIVE1MIFdlYiBGcm9udGVuZFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTa3lyaW1BUEkge1xyXG4gICAgcHVibGljIGhlbGxvKCkge1xyXG4gICAgICAgIGFsZXJ0KCdIRUxMTyBUSEVSRScpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGFwaSA9IG5ldyBTa3lyaW1BUEkoKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpIiwiLypcclxuICogSFRNTCBXZWIgRnJvbnRlbmRcclxuICovXHJcblxyXG5pbXBvcnQgeyBXZWJWaWV3TWVzc2FnZSwgV2ViVmlld0V2ZW50LCBXZWJWaWV3UmVxdWVzdCwgV2ViVmlld1Jlc3BvbnNlIH0gZnJvbSAnLi9XZWJWaWV3RXZlbnRzJ1xyXG5pbXBvcnQgeyBXZWJWaWV3SG9zdCwgd2ViVmlld0hvc3RJbnN0YW5jZSB9IGZyb20gJy4vV2ViVmlld0hvc3QnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdlYlZpZXdTY3JlZW5Qb3NpdGlvbiB7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXIsXHJcbiAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgaGVpZ2h0OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXZWJWaWV3UHJvcHMge1xyXG4gICAgaWQ6IHN0cmluZyxcclxuICAgIHVybDogc3RyaW5nLFxyXG4gICAgcG9zaXRpb246IFdlYlZpZXdTY3JlZW5Qb3NpdGlvbixcclxuICAgIHZpc2libGU6IGJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViVmlldyB7XHJcbiAgICBpZDogc3RyaW5nXHJcbiAgICB1cmw6IHN0cmluZ1xyXG4gICAgcG9zaXRpb246IFdlYlZpZXdTY3JlZW5Qb3NpdGlvblxyXG4gICAgdmlzaWJsZTogYm9vbGVhblxyXG4gICAgd2ViVmlld0hvc3Q6IFdlYlZpZXdIb3N0XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJvcGVydGllczogV2ViVmlld1Byb3BzLCB3ZWJWaWV3SG9zdDogV2ViVmlld0hvc3QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmlkID0gcHJvcGVydGllcy5pZFxyXG4gICAgICAgIHRoaXMudXJsID0gcHJvcGVydGllcy51cmxcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcHJvcGVydGllcy5wb3NpdGlvblxyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHByb3BlcnRpZXMudmlzaWJsZVxyXG4gICAgICAgIGlmICghd2ViVmlld0hvc3QpXHJcbiAgICAgICAgICAgIHdlYlZpZXdIb3N0ID0gd2ViVmlld0hvc3RJbnN0YW5jZVxyXG4gICAgICAgIHRoaXMud2ViVmlld0hvc3QgPSB3ZWJWaWV3SG9zdCFcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdldmVudCcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld0V2ZW50KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiAncmVxdWVzdCcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld1JlcXVlc3QpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdtZXNzYWdlJywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMud2ViVmlld0hvc3Qub24obWVzc2FnZVR5cGUsIHRoaXMuaWQsIGNhbGxiYWNrKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAnZXZlbnQnLCBtZXNzYWdlOiBXZWJWaWV3RXZlbnQpOiBQcm9taXNlPGFueT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAncmVxdWVzdCcsIG1lc3NhZ2U6IFdlYlZpZXdSZXF1ZXN0KTogUHJvbWlzZTxXZWJWaWV3UmVzcG9uc2U+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ21lc3NhZ2UnLCBtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdsb2FkJywgbWVzc2FnZTogV2ViVmlld01lc3NhZ2UpOiBQcm9taXNlPGFueT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWJWaWV3SG9zdC5zZW5kKG1lc3NhZ2VUeXBlLCB0aGlzLmlkLCBtZXNzYWdlKVxyXG4gICAgfVxyXG59XHJcbiIsIi8qXHJcbiAqIEhUTUwgV2ViIEZyb250ZW5kXHJcbiAqL1xyXG5cclxuaW1wb3J0IFdlYlZpZXcsIHsgV2ViVmlld1Byb3BzIH0gZnJvbSAnLi9XZWJWaWV3J1xyXG5pbXBvcnQgeyBXZWJWaWV3TWVzc2FnZSwgV2ViVmlld0V2ZW50LCBXZWJWaWV3UmVxdWVzdCwgV2ViVmlld1Jlc3BvbnNlIH0gZnJvbSAnLi9XZWJWaWV3RXZlbnRzJ1xyXG5cclxuaW50ZXJmYWNlIFdlYlZpZXdFdmVudENhbGxiYWNrIHtcclxuICAgIHZpZXdJZDogc3RyaW5nLFxyXG4gICAgY2FsbGJhY2s6IChtZXNzYWdlOiBhbnkpID0+IGFueVxyXG59XHJcblxyXG5pbnRlcmZhY2UgSW52b2tlTWVzc2FnZVByb3BzIHtcclxuICAgIG1lc3NhZ2VUeXBlOiBzdHJpbmcsIHZpZXdJZDogc3RyaW5nLCBtZXNzYWdlOiBhbnlcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdlYlZpZXdIb3N0IHtcclxuICAgIHdlYlZpZXdzID0gbmV3IE1hcDxzdHJpbmcsIFdlYlZpZXc+KClcclxuICAgIGlmcmFtZXNCeU5hbWUgPSBuZXcgTWFwPHN0cmluZywgSFRNTElGcmFtZUVsZW1lbnQ+KClcclxuICAgIHJlcXVlc3RSZXN1bHRQcm9taXNlcyA9IG5ldyBNYXA8c3RyaW5nLCAoZGF0YTogYW55KSA9PiB2b2lkPigpXHJcbiAgICBtZXNzYWdlQ2FsbGJhY2tzID0gbmV3IE1hcDxzdHJpbmcsIEFycmF5PFdlYlZpZXdFdmVudENhbGxiYWNrPj4oKVxyXG5cclxuICAgIHB1YmxpYyBnZXRXZWJWaWV3KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWJWaWV3cy5nZXQoaWQpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZEZyb21Qcm9wcyh3ZWJWaWV3UHJvcHM6IFdlYlZpZXdQcm9wcykge1xyXG4gICAgICAgIHRoaXMuYWRkKG5ldyBXZWJWaWV3KHdlYlZpZXdQcm9wcykpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZCh3ZWJWaWV3OiBXZWJWaWV3KSB7XHJcbiAgICAgICAgaWYgKHRoaXMud2ViVmlld3MuaGFzKHdlYlZpZXcuaWQpKVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSh3ZWJWaWV3LmlkKVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy53ZWJWaWV3cy5zZXQod2ViVmlldy5pZCwgd2ViVmlldylcclxuICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKVxyXG4gICAgICAgIHRoaXMuaWZyYW1lc0J5TmFtZS5zZXQod2ViVmlldy5pZCwgaWZyYW1lKVxyXG4gICAgICAgIGlmcmFtZS5zdHlsZS5sZWZ0ID0gKHdpbmRvdy5pbm5lcldpZHRoICogKHdlYlZpZXcucG9zaXRpb24ueCAvIDEwMCkpLnRvRml4ZWQoKSArICdweCdcclxuICAgICAgICBpZnJhbWUuc3R5bGUudG9wID0gKHdpbmRvdy5pbm5lckhlaWdodCAqICh3ZWJWaWV3LnBvc2l0aW9uLnkgLyAxMDApKS50b0ZpeGVkKCkgKyAncHgnXHJcbiAgICAgICAgaWZyYW1lLnN0eWxlLmhlaWdodCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgKiAod2ViVmlldy5wb3NpdGlvbi5oZWlnaHQgLyAxMDApKS50b0ZpeGVkKCkgKyAncHgnXHJcbiAgICAgICAgaWZyYW1lLnN0eWxlLndpZHRoID0gKHdpbmRvdy5pbm5lcldpZHRoICogKHdlYlZpZXcucG9zaXRpb24ud2lkdGggLyAxMDApKS50b0ZpeGVkKCkgKyAncHgnXHJcbiAgICAgICAgaWZyYW1lLmZyYW1lQm9yZGVyID0gJzAnXHJcbiAgICAgICAgaWZyYW1lLnNjcm9sbGluZyA9ICdmYWxzZSdcclxuICAgICAgICBpZnJhbWUuc3JjID0gd2ViVmlldy51cmxcclxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoaWZyYW1lKVxyXG4gICAgICAgIGlmIChpZnJhbWUuY29udGVudFdpbmRvdykge1xyXG4gICAgICAgICAgICBpZnJhbWUuY29udGVudFdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24obXNnLCB1cmwsIGxpbmVudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJvciBtZXNzYWdlOiAnICsgbXNnICsgJ1xcblVSTDogJyArIHVybCArICdcXG5MaW5lIE51bWJlcjogJyArIGxpbmVudW1iZXIpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmcmFtZS5jb250ZW50V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmQoJ2xvYWQnLCB3ZWJWaWV3LmlkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld0lkOiB3ZWJWaWV3LmlkXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLndlYlZpZXdzLmRlbGV0ZShpZClcclxuICAgICAgICBjb25zdCBpZnJhbWUgPSB0aGlzLmlmcmFtZXNCeU5hbWUuZ2V0KGlkKVxyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZChpZnJhbWUhKVxyXG4gICAgICAgIHRoaXMuaWZyYW1lc0J5TmFtZS5kZWxldGUoaWQpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiAnZXZlbnQnLCB2aWV3SWQ6IHN0cmluZywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3RXZlbnQpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdyZXF1ZXN0Jywgdmlld0lkOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld1JlcXVlc3QpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdtZXNzYWdlJywgdmlld0lkOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogV2ViVmlld01lc3NhZ2UpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6IHN0cmluZywgdmlld0lkOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogYW55KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIHZpZXdJZDogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5hbGVydChgZnJvbnRlbmQgT04gJHttZXNzYWdlVHlwZX1gKVxyXG4gICAgICAgIGlmICghdGhpcy5tZXNzYWdlQ2FsbGJhY2tzLmhhcyhtZXNzYWdlVHlwZSkpXHJcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZUNhbGxiYWNrcy5zZXQobWVzc2FnZVR5cGUsIEFycmF5PFdlYlZpZXdFdmVudENhbGxiYWNrPigpKVxyXG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMubWVzc2FnZUNhbGxiYWNrcy5nZXQobWVzc2FnZVR5cGUpXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrcylcclxuICAgICAgICAgICAgY2FsbGJhY2tzLnB1c2goeyB2aWV3SWQsIGNhbGxiYWNrIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdtZXNzYWdlJywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IFdlYlZpZXdNZXNzYWdlKTogUHJvbWlzZTxhbnk+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ2V2ZW50Jywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IFdlYlZpZXdFdmVudCk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdyZXF1ZXN0Jywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IFdlYlZpZXdNZXNzYWdlKTogUHJvbWlzZTxXZWJWaWV3UmVzcG9uc2U+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ2xvYWQnLCB2aWV3SWQ6IHN0cmluZywgbWVzc2FnZTogV2ViVmlld01lc3NhZ2UpOiBQcm9taXNlPGFueT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIHZpZXdJZDogc3RyaW5nLCBtZXNzYWdlOiBhbnkpOiBQcm9taXNlPGFueT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIHZpZXdJZDogc3RyaW5nLCBtZXNzYWdlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIC8vIEludm9rZSBKU1xyXG4gICAgICAgIGlmICghbWVzc2FnZS5zb3VyY2UpIG1lc3NhZ2Uuc291cmNlID0gdmlld0lkXHJcbiAgICAgICAgaWYgKCFtZXNzYWdlLnRhcmdldCkgbWVzc2FnZS50YXJnZXQgPSB2aWV3SWQ7XHJcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmFsZXJ0KGBTZW5kaW5nIE1lc3NhZ2UgZnJvbSBGcm9udGVuZCB0byBCYWNrZW5kOiAke21lc3NhZ2VUeXBlfSAke0pTT04uc3RyaW5naWZ5KG1lc3NhZ2UpfWApO1xyXG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5za3lyaW1QbGF0Zm9ybS5zZW5kTWVzc2FnZSgnV2ViVUknLCB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VUeXBlLCBtZXNzYWdlLCB0YXJnZXQ6IHZpZXdJZFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gVE9ETyByZXR1cm4gUHJvbWlzZVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IHJlZmFjdG9yIHRoZSB2aWV3SWQgLyB0YXJnZXQgaW5jb25zaXN0ZW5jaWVzXHJcbiAgICBwdWJsaWMgaW52b2tlTWVzc2FnZShwcm9wZXJ0aWVzOiBJbnZva2VNZXNzYWdlUHJvcHMpIHtcclxuICAgICAgICAod2luZG93IGFzIGFueSkuYWxlcnQoYGZyb250ZW5kIElOVk9LRSAke3Byb3BlcnRpZXMubWVzc2FnZVR5cGV9YClcclxuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLm1lc3NhZ2VDYWxsYmFja3MuZ2V0KHByb3BlcnRpZXMubWVzc2FnZVR5cGUpO1xyXG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5hbGVydChgW0Zyb250ZW5kXSBpbnZva2VNZXNzYWdlIHJlY2VpdmVkIGZyb20gQmFja2VuZDogJHtKU09OLnN0cmluZ2lmeShwcm9wZXJ0aWVzKX0gLS0+ICR7Y2FsbGJhY2tzIS5sZW5ndGh9YClcclxuICAgICAgICBpZiAoY2FsbGJhY2tzKVxyXG4gICAgICAgICAgICBjYWxsYmFja3MuZm9yRWFjaChjYWxsYmFjayA9PiB7XHJcbiAgICAgICAgICAgICAgICAod2luZG93IGFzIGFueSkuYWxlcnQoYENBTExCQUNLOiAke2NhbGxiYWNrfWApXHJcbiAgICAgICAgICAgICAgICBpZiAoKCFjYWxsYmFjay52aWV3SWQpIHx8IGNhbGxiYWNrLnZpZXdJZCA9PSBwcm9wZXJ0aWVzLnZpZXdJZClcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsYmFjayhwcm9wZXJ0aWVzLm1lc3NhZ2UpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB3ZWJWaWV3SG9zdEluc3RhbmNlID0gbmV3IFdlYlZpZXdIb3N0KClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlYlZpZXdIb3N0SW5zdGFuY2VcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCBTa3lyaW1BUEkgZnJvbSAnLi9Ta3lyaW1BUEknXHJcbmltcG9ydCBXZWJWaWV3SG9zdCBmcm9tICcuL1dlYlZpZXdIb3N0J1xyXG5pbXBvcnQgV2ViVmlldyBmcm9tICcuL1dlYlZpZXcnXHJcblxyXG4od2luZG93IGFzIGFueSkuX193ZWJWaWV3SG9zdCA9IFdlYlZpZXdIb3N0O1xyXG4od2luZG93IGFzIGFueSkuZ2V0V2ViVmlldyA9IChpZDogc3RyaW5nKSA9PiBXZWJWaWV3SG9zdC5nZXRXZWJWaWV3KGlkKTtcclxuKHdpbmRvdyBhcyBhbnkpLnNreXJpbSA9IFNreXJpbUFQSTtcclxuKHdpbmRvdyBhcyBhbnkpLldlYlZpZXcgPSBXZWJWaWV3XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICh3aW5kb3cgYXMgYW55KS5za3lyaW1QbGF0Zm9ybS5zZW5kTWVzc2FnZSgnV2ViVUknLCB7IG1lc3NhZ2VUeXBlOiAnd2Vidmlld2hvc3Rsb2FkZWQnIH0pXHJcbn0pXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==