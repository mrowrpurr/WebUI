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
            window.skyrimPlatform.sendMessage('WebUI', {
                messageType, message, target: viewId
            });
            // TODO return Promise
        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFDekIsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDLE1BQU07b0JBQzFELFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUM3QyxDQUFDLENBQUM7SUFDVixDQUFDO0NBQ0o7QUFyRkQsa0NBcUZDO0FBRVksMkJBQW1CLEdBQUcsSUFBSSxXQUFXLEVBQUU7QUFFcEQscUJBQWUsMkJBQW1COzs7Ozs7O1VDekdsQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7QUN0QkEsaUZBQW1DO0FBQ25DLHVGQUF1QztBQUN2QywyRUFBK0I7QUFFOUIsTUFBYyxDQUFDLGFBQWEsR0FBRyxxQkFBVyxDQUFDO0FBQzNDLE1BQWMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRSxDQUFDLHFCQUFXLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZFLE1BQWMsQ0FBQyxNQUFNLEdBQUcsbUJBQVMsQ0FBQztBQUNsQyxNQUFjLENBQUMsT0FBTyxHQUFHLGlCQUFPO0FBRWpDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBQ2hDLE1BQWMsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxDQUFDO0FBQzdGLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NreXJpbS13ZWJ1aS1jb21wb25lbnRob3N0Ly4vc3JjL1NreXJpbUFQSS50cyIsIndlYnBhY2s6Ly9za3lyaW0td2VidWktY29tcG9uZW50aG9zdC8uL3NyYy9XZWJWaWV3LnRzIiwid2VicGFjazovL3NreXJpbS13ZWJ1aS1jb21wb25lbnRob3N0Ly4vc3JjL1dlYlZpZXdIb3N0LnRzIiwid2VicGFjazovL3NreXJpbS13ZWJ1aS1jb21wb25lbnRob3N0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NreXJpbS13ZWJ1aS1jb21wb25lbnRob3N0Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIEhUTUwgV2ViIEZyb250ZW5kXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFNreXJpbUFQSSB7XHJcbiAgICBwdWJsaWMgaGVsbG8oKSB7XHJcbiAgICAgICAgYWxlcnQoJ0hFTExPIFRIRVJFJylcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgYXBpID0gbmV3IFNreXJpbUFQSSgpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcGkiLCIvKlxyXG4gKiBIVE1MIFdlYiBGcm9udGVuZFxyXG4gKi9cclxuXHJcbmltcG9ydCB7IFdlYlZpZXdNZXNzYWdlLCBXZWJWaWV3RXZlbnQsIFdlYlZpZXdSZXF1ZXN0LCBXZWJWaWV3UmVzcG9uc2UgfSBmcm9tICcuL1dlYlZpZXdFdmVudHMnXHJcbmltcG9ydCB7IFdlYlZpZXdIb3N0LCB3ZWJWaWV3SG9zdEluc3RhbmNlIH0gZnJvbSAnLi9XZWJWaWV3SG9zdCdcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2ViVmlld1NjcmVlblBvc2l0aW9uIHtcclxuICAgIHg6IG51bWJlcixcclxuICAgIHk6IG51bWJlcixcclxuICAgIHdpZHRoOiBudW1iZXIsXHJcbiAgICBoZWlnaHQ6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdlYlZpZXdQcm9wcyB7XHJcbiAgICBpZDogc3RyaW5nLFxyXG4gICAgdXJsOiBzdHJpbmcsXHJcbiAgICBwb3NpdGlvbjogV2ViVmlld1NjcmVlblBvc2l0aW9uLFxyXG4gICAgdmlzaWJsZTogYm9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJWaWV3IHtcclxuICAgIGlkOiBzdHJpbmdcclxuICAgIHVybDogc3RyaW5nXHJcbiAgICBwb3NpdGlvbjogV2ViVmlld1NjcmVlblBvc2l0aW9uXHJcbiAgICB2aXNpYmxlOiBib29sZWFuXHJcbiAgICB3ZWJWaWV3SG9zdDogV2ViVmlld0hvc3RcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzOiBXZWJWaWV3UHJvcHMsIHdlYlZpZXdIb3N0OiBXZWJWaWV3SG9zdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBwcm9wZXJ0aWVzLmlkXHJcbiAgICAgICAgdGhpcy51cmwgPSBwcm9wZXJ0aWVzLnVybFxyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwcm9wZXJ0aWVzLnBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gcHJvcGVydGllcy52aXNpYmxlXHJcbiAgICAgICAgaWYgKCF3ZWJWaWV3SG9zdClcclxuICAgICAgICAgICAgd2ViVmlld0hvc3QgPSB3ZWJWaWV3SG9zdEluc3RhbmNlXHJcbiAgICAgICAgdGhpcy53ZWJWaWV3SG9zdCA9IHdlYlZpZXdIb3N0IVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogJ2V2ZW50JywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3RXZlbnQpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdyZXF1ZXN0JywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3UmVxdWVzdCkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogJ21lc3NhZ2UnLCBjYWxsYmFjazogKG1lc3NhZ2U6IFdlYlZpZXdNZXNzYWdlKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogYW55KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy53ZWJWaWV3SG9zdC5vbihtZXNzYWdlVHlwZSwgdGhpcy5pZCwgY2FsbGJhY2spXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdldmVudCcsIG1lc3NhZ2U6IFdlYlZpZXdFdmVudCk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdyZXF1ZXN0JywgbWVzc2FnZTogV2ViVmlld1JlcXVlc3QpOiBQcm9taXNlPFdlYlZpZXdSZXNwb25zZT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAnbWVzc2FnZScsIG1lc3NhZ2U6IFdlYlZpZXdNZXNzYWdlKTogUHJvbWlzZTxhbnk+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ2xvYWQnLCBtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogc3RyaW5nLCBtZXNzYWdlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndlYlZpZXdIb3N0LnNlbmQobWVzc2FnZVR5cGUsIHRoaXMuaWQsIG1lc3NhZ2UpXHJcbiAgICB9XHJcbn1cclxuIiwiLypcclxuICogSFRNTCBXZWIgRnJvbnRlbmRcclxuICovXHJcblxyXG5pbXBvcnQgV2ViVmlldywgeyBXZWJWaWV3UHJvcHMgfSBmcm9tICcuL1dlYlZpZXcnXHJcbmltcG9ydCB7IFdlYlZpZXdNZXNzYWdlLCBXZWJWaWV3RXZlbnQsIFdlYlZpZXdSZXF1ZXN0LCBXZWJWaWV3UmVzcG9uc2UgfSBmcm9tICcuL1dlYlZpZXdFdmVudHMnXHJcblxyXG5pbnRlcmZhY2UgV2ViVmlld0V2ZW50Q2FsbGJhY2sge1xyXG4gICAgdmlld0lkOiBzdHJpbmcsXHJcbiAgICBjYWxsYmFjazogKG1lc3NhZ2U6IGFueSkgPT4gYW55XHJcbn1cclxuXHJcbmludGVyZmFjZSBJbnZva2VNZXNzYWdlUHJvcHMge1xyXG4gICAgbWVzc2FnZVR5cGU6IHN0cmluZywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IGFueVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2ViVmlld0hvc3Qge1xyXG4gICAgd2ViVmlld3MgPSBuZXcgTWFwPHN0cmluZywgV2ViVmlldz4oKVxyXG4gICAgaWZyYW1lc0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MSUZyYW1lRWxlbWVudD4oKVxyXG4gICAgcmVxdWVzdFJlc3VsdFByb21pc2VzID0gbmV3IE1hcDxzdHJpbmcsIChkYXRhOiBhbnkpID0+IHZvaWQ+KClcclxuICAgIG1lc3NhZ2VDYWxsYmFja3MgPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8V2ViVmlld0V2ZW50Q2FsbGJhY2s+PigpXHJcblxyXG4gICAgcHVibGljIGdldFdlYlZpZXcoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndlYlZpZXdzLmdldChpZClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkRnJvbVByb3BzKHdlYlZpZXdQcm9wczogV2ViVmlld1Byb3BzKSB7XHJcbiAgICAgICAgdGhpcy5hZGQobmV3IFdlYlZpZXcod2ViVmlld1Byb3BzKSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkKHdlYlZpZXc6IFdlYlZpZXcpIHtcclxuICAgICAgICBpZiAodGhpcy53ZWJWaWV3cy5oYXMod2ViVmlldy5pZCkpXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKHdlYlZpZXcuaWQpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLndlYlZpZXdzLnNldCh3ZWJWaWV3LmlkLCB3ZWJWaWV3KVxyXG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpXHJcbiAgICAgICAgdGhpcy5pZnJhbWVzQnlOYW1lLnNldCh3ZWJWaWV3LmlkLCBpZnJhbWUpXHJcbiAgICAgICAgaWZyYW1lLnN0eWxlLmxlZnQgPSAod2luZG93LmlubmVyV2lkdGggKiAod2ViVmlldy5wb3NpdGlvbi54IC8gMTAwKSkudG9GaXhlZCgpICsgJ3B4J1xyXG4gICAgICAgIGlmcmFtZS5zdHlsZS50b3AgPSAod2luZG93LmlubmVySGVpZ2h0ICogKHdlYlZpZXcucG9zaXRpb24ueSAvIDEwMCkpLnRvRml4ZWQoKSArICdweCdcclxuICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gKHdpbmRvdy5pbm5lckhlaWdodCAqICh3ZWJWaWV3LnBvc2l0aW9uLmhlaWdodCAvIDEwMCkpLnRvRml4ZWQoKSArICdweCdcclxuICAgICAgICBpZnJhbWUuc3R5bGUud2lkdGggPSAod2luZG93LmlubmVyV2lkdGggKiAod2ViVmlldy5wb3NpdGlvbi53aWR0aCAvIDEwMCkpLnRvRml4ZWQoKSArICdweCdcclxuICAgICAgICBpZnJhbWUuZnJhbWVCb3JkZXIgPSAnMCdcclxuICAgICAgICBpZnJhbWUuc2Nyb2xsaW5nID0gJ2ZhbHNlJ1xyXG4gICAgICAgIGlmcmFtZS5zcmMgPSB3ZWJWaWV3LnVybFxyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChpZnJhbWUpXHJcbiAgICAgICAgaWYgKGlmcmFtZS5jb250ZW50V2luZG93KSB7XHJcbiAgICAgICAgICAgIGlmcmFtZS5jb250ZW50V2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihtc2csIHVybCwgbGluZW51bWJlcikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0Vycm9yIG1lc3NhZ2U6ICcgKyBtc2cgKyAnXFxuVVJMOiAnICsgdXJsICsgJ1xcbkxpbmUgTnVtYmVyOiAnICsgbGluZW51bWJlcilcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZCgnbG9hZCcsIHdlYlZpZXcuaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3SWQ6IHdlYlZpZXcuaWRcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMud2ViVmlld3MuZGVsZXRlKGlkKVxyXG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IHRoaXMuaWZyYW1lc0J5TmFtZS5nZXQoaWQpXHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKGlmcmFtZSEpXHJcbiAgICAgICAgdGhpcy5pZnJhbWVzQnlOYW1lLmRlbGV0ZShpZClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdldmVudCcsIHZpZXdJZDogc3RyaW5nLCBjYWxsYmFjazogKG1lc3NhZ2U6IFdlYlZpZXdFdmVudCkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogJ3JlcXVlc3QnLCB2aWV3SWQ6IHN0cmluZywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3UmVxdWVzdCkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogJ21lc3NhZ2UnLCB2aWV3SWQ6IHN0cmluZywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogc3RyaW5nLCB2aWV3SWQ6IHN0cmluZywgY2FsbGJhY2s6IChtZXNzYWdlOiBhbnkpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6IHN0cmluZywgdmlld0lkOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2VDYWxsYmFja3MuaGFzKG1lc3NhZ2VUeXBlKSlcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ2FsbGJhY2tzLnNldChtZXNzYWdlVHlwZSwgQXJyYXk8V2ViVmlld0V2ZW50Q2FsbGJhY2s+KCkpXHJcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5tZXNzYWdlQ2FsbGJhY2tzLmdldChtZXNzYWdlVHlwZSlcclxuICAgICAgICBpZiAoY2FsbGJhY2tzKVxyXG4gICAgICAgICAgICBjYWxsYmFja3MucHVzaCh7IHZpZXdJZCwgY2FsbGJhY2sgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ21lc3NhZ2UnLCB2aWV3SWQ6IHN0cmluZywgbWVzc2FnZTogV2ViVmlld01lc3NhZ2UpOiBQcm9taXNlPGFueT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAnZXZlbnQnLCB2aWV3SWQ6IHN0cmluZywgbWVzc2FnZTogV2ViVmlld0V2ZW50KTogUHJvbWlzZTxhbnk+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ3JlcXVlc3QnLCB2aWV3SWQ6IHN0cmluZywgbWVzc2FnZTogV2ViVmlld01lc3NhZ2UpOiBQcm9taXNlPFdlYlZpZXdSZXNwb25zZT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAnbG9hZCcsIHZpZXdJZDogc3RyaW5nLCBtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6IHN0cmluZywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6IHN0cmluZywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgLy8gSW52b2tlIEpTXHJcbiAgICAgICAgaWYgKCFtZXNzYWdlLnNvdXJjZSkgbWVzc2FnZS5zb3VyY2UgPSB2aWV3SWRcclxuICAgICAgICBpZiAoIW1lc3NhZ2UudGFyZ2V0KSBtZXNzYWdlLnRhcmdldCA9IHZpZXdJZDtcclxuICAgICAgICAod2luZG93IGFzIGFueSkuc2t5cmltUGxhdGZvcm0uc2VuZE1lc3NhZ2UoJ1dlYlVJJywge1xyXG4gICAgICAgICAgICBtZXNzYWdlVHlwZSwgbWVzc2FnZSwgdGFyZ2V0OiB2aWV3SWRcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIFRPRE8gcmV0dXJuIFByb21pc2VcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiByZWZhY3RvciB0aGUgdmlld0lkIC8gdGFyZ2V0IGluY29uc2lzdGVuY2llc1xyXG4gICAgcHVibGljIGludm9rZU1lc3NhZ2UocHJvcGVydGllczogSW52b2tlTWVzc2FnZVByb3BzKSB7XHJcbiAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5tZXNzYWdlQ2FsbGJhY2tzLmdldChwcm9wZXJ0aWVzLm1lc3NhZ2VUeXBlKVxyXG4gICAgICAgIGlmIChjYWxsYmFja3MpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcy5mb3JFYWNoKGNhbGxiYWNrID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgoIWNhbGxiYWNrLnZpZXdJZCkgfHwgY2FsbGJhY2sudmlld0lkID09IHByb3BlcnRpZXMudmlld0lkKVxyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGxiYWNrKHByb3BlcnRpZXMubWVzc2FnZSlcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHdlYlZpZXdIb3N0SW5zdGFuY2UgPSBuZXcgV2ViVmlld0hvc3QoKVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2ViVmlld0hvc3RJbnN0YW5jZVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IFNreXJpbUFQSSBmcm9tICcuL1NreXJpbUFQSSdcclxuaW1wb3J0IFdlYlZpZXdIb3N0IGZyb20gJy4vV2ViVmlld0hvc3QnXHJcbmltcG9ydCBXZWJWaWV3IGZyb20gJy4vV2ViVmlldydcclxuXHJcbih3aW5kb3cgYXMgYW55KS5fX3dlYlZpZXdIb3N0ID0gV2ViVmlld0hvc3Q7XHJcbih3aW5kb3cgYXMgYW55KS5nZXRXZWJWaWV3ID0gKGlkOiBzdHJpbmcpID0+IFdlYlZpZXdIb3N0LmdldFdlYlZpZXcoaWQpO1xyXG4od2luZG93IGFzIGFueSkuc2t5cmltID0gU2t5cmltQVBJO1xyXG4od2luZG93IGFzIGFueSkuV2ViVmlldyA9IFdlYlZpZXdcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG4gICAgKHdpbmRvdyBhcyBhbnkpLnNreXJpbVBsYXRmb3JtLnNlbmRNZXNzYWdlKCdXZWJVSScsIHsgbWVzc2FnZVR5cGU6ICd3ZWJ2aWV3aG9zdGxvYWRlZCcgfSlcclxufSlcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9