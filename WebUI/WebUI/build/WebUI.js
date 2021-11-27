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
    }
    getView(id) {
        alert(`Getting view ${id} from ${this.webViews}`);
        const theView = this.webViews.get(id);
        alert(`THE VIEW TO RETURN FROM getView: ${theView}`);
        return this.webViews.get(id);
    }
    add(webViewProps) {
        const webView = new WebView_1.default(webViewProps);
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
        }
    }
    remove(id) {
        this.webViews.delete(id);
        const iframe = this.iframesByName.get(id);
        document.documentElement.removeChild(iframe);
        this.iframesByName.delete(id);
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
window.getWebView = (id) => WebViewHost_1.default.getView(id);
window.skyrim = SkyrimAPI_1.default;
window.WebView = WebView_1.default;
window.addEventListener('load', () => {
    window.skyrimPlatform.sendMessage('WebUI', { messageType: 'webviewhostloaded' });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEUsTUFBYyxDQUFDLE1BQU0sR0FBRyxtQkFBUyxDQUFDO0FBQ2xDLE1BQWMsQ0FBQyxPQUFPLEdBQUcsaUJBQU87QUFFakMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFDaEMsTUFBYyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLENBQUM7QUFDN0YsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2t5cmltLXdlYnVpLWNvbXBvbmVudGhvc3QvLi9zcmMvU2t5cmltQVBJLnRzIiwid2VicGFjazovL3NreXJpbS13ZWJ1aS1jb21wb25lbnRob3N0Ly4vc3JjL1dlYlZpZXcudHMiLCJ3ZWJwYWNrOi8vc2t5cmltLXdlYnVpLWNvbXBvbmVudGhvc3QvLi9zcmMvV2ViVmlld0hvc3QudHMiLCJ3ZWJwYWNrOi8vc2t5cmltLXdlYnVpLWNvbXBvbmVudGhvc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2t5cmltLXdlYnVpLWNvbXBvbmVudGhvc3QvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogSFRNTCBXZWIgRnJvbnRlbmRcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgU2t5cmltQVBJIHtcclxuICAgIHB1YmxpYyBoZWxsbygpIHtcclxuICAgICAgICBhbGVydCgnSEVMTE8gVEhFUkUnKVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBhcGkgPSBuZXcgU2t5cmltQVBJKClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaSIsIi8qXHJcbiAqIEhUTUwgV2ViIEZyb250ZW5kXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgV2ViVmlld01lc3NhZ2UsIFdlYlZpZXdFdmVudCwgV2ViVmlld1JlcXVlc3QsIFdlYlZpZXdSZXNwb25zZSB9IGZyb20gJy4vV2ViVmlld0V2ZW50cydcclxuaW1wb3J0IHsgV2ViVmlld0hvc3QsIHdlYlZpZXdIb3N0SW5zdGFuY2UgfSBmcm9tICcuL1dlYlZpZXdIb3N0J1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXZWJWaWV3U2NyZWVuUG9zaXRpb24ge1xyXG4gICAgeDogbnVtYmVyLFxyXG4gICAgeTogbnVtYmVyLFxyXG4gICAgd2lkdGg6IG51bWJlcixcclxuICAgIGhlaWdodDogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2ViVmlld1Byb3BzIHtcclxuICAgIGlkOiBzdHJpbmcsXHJcbiAgICB1cmw6IHN0cmluZyxcclxuICAgIHBvc2l0aW9uOiBXZWJWaWV3U2NyZWVuUG9zaXRpb24sXHJcbiAgICB2aXNpYmxlOiBib29sZWFuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlZpZXcge1xyXG4gICAgaWQ6IHN0cmluZ1xyXG4gICAgdXJsOiBzdHJpbmdcclxuICAgIHBvc2l0aW9uOiBXZWJWaWV3U2NyZWVuUG9zaXRpb25cclxuICAgIHZpc2libGU6IGJvb2xlYW5cclxuICAgIG1lc3NhZ2VDYWxsYmFja3MgPSBuZXcgTWFwPHN0cmluZywgQXJyYXk8KChtZXNzYWdlOiBhbnkpID0+IHZvaWQpPj4oKVxyXG4gICAgd2ViVmlld0hvc3Q6IFdlYlZpZXdIb3N0XHJcblxyXG4gICAgcHVibGljIGhlbGxvKCkge1xyXG4gICAgICAgIGFsZXJ0KCdZb3UgY2FsbGVkIFdlYlZpZXcgaGVsbG8gaW4gdGhlIGZyb250ZW5kJylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wZXJ0aWVzOiBXZWJWaWV3UHJvcHMsIHdlYlZpZXdIb3N0OiBXZWJWaWV3SG9zdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBwcm9wZXJ0aWVzLmlkXHJcbiAgICAgICAgdGhpcy51cmwgPSBwcm9wZXJ0aWVzLnVybFxyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwcm9wZXJ0aWVzLnBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gcHJvcGVydGllcy52aXNpYmxlXHJcbiAgICAgICAgaWYgKCF3ZWJWaWV3SG9zdClcclxuICAgICAgICAgICAgd2ViVmlld0hvc3QgPSB3ZWJWaWV3SG9zdEluc3RhbmNlXHJcbiAgICAgICAgdGhpcy53ZWJWaWV3SG9zdCA9IHdlYlZpZXdIb3N0IVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogJ2V2ZW50JywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3RXZlbnQpID0+IHZvaWQpOiB2b2lkXHJcbiAgICBwdWJsaWMgb24obWVzc2FnZVR5cGU6ICdyZXF1ZXN0JywgY2FsbGJhY2s6IChtZXNzYWdlOiBXZWJWaWV3UmVxdWVzdCkgPT4gdm9pZCk6IHZvaWRcclxuICAgIHB1YmxpYyBvbihtZXNzYWdlVHlwZTogJ21lc3NhZ2UnLCBjYWxsYmFjazogKG1lc3NhZ2U6IFdlYlZpZXdNZXNzYWdlKSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogYW55KSA9PiB2b2lkKTogdm9pZFxyXG4gICAgcHVibGljIG9uKG1lc3NhZ2VUeXBlOiBzdHJpbmcsIGNhbGxiYWNrOiAobWVzc2FnZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1lc3NhZ2VDYWxsYmFja3MuaGFzKG1lc3NhZ2VUeXBlKSlcclxuICAgICAgICAgICAgdGhpcy5tZXNzYWdlQ2FsbGJhY2tzLnNldChtZXNzYWdlVHlwZSwgbmV3IEFycmF5PCgobWVzc2FnZTogYW55KSA9PiB2b2lkKT4oKSlcclxuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLm1lc3NhZ2VDYWxsYmFja3MuZ2V0KG1lc3NhZ2VUeXBlKVxyXG4gICAgICAgIGlmIChjYWxsYmFja3MpXHJcbiAgICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAnZXZlbnQnLCBtZXNzYWdlOiBXZWJWaWV3RXZlbnQpOiBQcm9taXNlPGFueT5cclxuICAgIHB1YmxpYyBhc3luYyBzZW5kKG1lc3NhZ2VUeXBlOiAncmVxdWVzdCcsIG1lc3NhZ2U6IFdlYlZpZXdSZXF1ZXN0KTogUHJvbWlzZTxXZWJWaWV3UmVzcG9uc2U+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ21lc3NhZ2UnLCBtZXNzYWdlOiBXZWJWaWV3TWVzc2FnZSk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogc3RyaW5nLCBtZXNzYWdlOiBhbnkpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLndlYlZpZXdIb3N0LnNlbmQobWVzc2FnZVR5cGUsIHRoaXMuaWQsIG1lc3NhZ2UpXHJcbiAgICB9XHJcbn1cclxuIiwiLypcclxuICogSFRNTCBXZWIgRnJvbnRlbmRcclxuICovXHJcblxyXG5pbXBvcnQgV2ViVmlldywgeyBXZWJWaWV3UHJvcHMgfSBmcm9tICcuL1dlYlZpZXcnXHJcbmltcG9ydCB7IFdlYlZpZXdNZXNzYWdlLCBXZWJWaWV3RXZlbnQsIFdlYlZpZXdSZXF1ZXN0LCBXZWJWaWV3UmVzcG9uc2UgfSBmcm9tICcuL1dlYlZpZXdFdmVudHMnXHJcblxyXG5leHBvcnQgY2xhc3MgV2ViVmlld0hvc3Qge1xyXG4gICAgd2ViVmlld3MgPSBuZXcgTWFwPHN0cmluZywgV2ViVmlldz4oKVxyXG4gICAgaWZyYW1lc0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MSUZyYW1lRWxlbWVudD4oKVxyXG4gICAgcmVxdWVzdFJlc3VsdFByb21pc2VzID0gbmV3IE1hcDxzdHJpbmcsIChkYXRhOiBhbnkpID0+IHZvaWQ+KClcclxuXHJcbiAgICBwdWJsaWMgZ2V0VmlldyhpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgYWxlcnQoYEdldHRpbmcgdmlldyAke2lkfSBmcm9tICR7dGhpcy53ZWJWaWV3c31gKVxyXG4gICAgICAgIGNvbnN0IHRoZVZpZXcgPSB0aGlzLndlYlZpZXdzLmdldChpZClcclxuICAgICAgICBhbGVydChgVEhFIFZJRVcgVE8gUkVUVVJOIEZST00gZ2V0VmlldzogJHt0aGVWaWV3fWApXHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2ViVmlld3MuZ2V0KGlkKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGQod2ViVmlld1Byb3BzOiBXZWJWaWV3UHJvcHMpIHtcclxuICAgICAgICBjb25zdCB3ZWJWaWV3ID0gbmV3IFdlYlZpZXcod2ViVmlld1Byb3BzKVxyXG4gICAgICAgIGlmICh0aGlzLndlYlZpZXdzLmhhcyh3ZWJWaWV3LmlkKSlcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUod2ViVmlldy5pZClcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMud2ViVmlld3Muc2V0KHdlYlZpZXcuaWQsIHdlYlZpZXcpXHJcbiAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJylcclxuICAgICAgICB0aGlzLmlmcmFtZXNCeU5hbWUuc2V0KHdlYlZpZXcuaWQsIGlmcmFtZSlcclxuICAgICAgICBpZnJhbWUuc3R5bGUubGVmdCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAqICh3ZWJWaWV3LnBvc2l0aW9uLnggLyAxMDApKS50b0ZpeGVkKCkgKyAncHgnXHJcbiAgICAgICAgaWZyYW1lLnN0eWxlLnRvcCA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgKiAod2ViVmlldy5wb3NpdGlvbi55IC8gMTAwKSkudG9GaXhlZCgpICsgJ3B4J1xyXG4gICAgICAgIGlmcmFtZS5zdHlsZS5oZWlnaHQgPSAod2luZG93LmlubmVySGVpZ2h0ICogKHdlYlZpZXcucG9zaXRpb24uaGVpZ2h0IC8gMTAwKSkudG9GaXhlZCgpICsgJ3B4J1xyXG4gICAgICAgIGlmcmFtZS5zdHlsZS53aWR0aCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAqICh3ZWJWaWV3LnBvc2l0aW9uLndpZHRoIC8gMTAwKSkudG9GaXhlZCgpICsgJ3B4J1xyXG4gICAgICAgIGlmcmFtZS5mcmFtZUJvcmRlciA9ICcwJ1xyXG4gICAgICAgIGlmcmFtZS5zY3JvbGxpbmcgPSAnZmFsc2UnXHJcbiAgICAgICAgaWZyYW1lLnNyYyA9IHdlYlZpZXcudXJsXHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKGlmcmFtZSlcclxuICAgICAgICBpZiAoaWZyYW1lLmNvbnRlbnRXaW5kb3cpIHtcclxuICAgICAgICAgICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKG1zZywgdXJsLCBsaW5lbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3IgbWVzc2FnZTogJyArIG1zZyArICdcXG5VUkw6ICcgKyB1cmwgKyAnXFxuTGluZSBOdW1iZXI6ICcgKyBsaW5lbnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLndlYlZpZXdzLmRlbGV0ZShpZClcclxuICAgICAgICBjb25zdCBpZnJhbWUgPSB0aGlzLmlmcmFtZXNCeU5hbWUuZ2V0KGlkKVxyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVDaGlsZChpZnJhbWUhKVxyXG4gICAgICAgIHRoaXMuaWZyYW1lc0J5TmFtZS5kZWxldGUoaWQpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdtZXNzYWdlJywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IFdlYlZpZXdNZXNzYWdlKTogUHJvbWlzZTxhbnk+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogJ2V2ZW50Jywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IFdlYlZpZXdFdmVudCk6IFByb21pc2U8YW55PlxyXG4gICAgcHVibGljIGFzeW5jIHNlbmQobWVzc2FnZVR5cGU6ICdyZXF1ZXN0Jywgdmlld0lkOiBzdHJpbmcsIG1lc3NhZ2U6IFdlYlZpZXdNZXNzYWdlKTogUHJvbWlzZTxXZWJWaWV3UmVzcG9uc2U+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogc3RyaW5nLCB2aWV3SWQ6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+XHJcbiAgICBwdWJsaWMgYXN5bmMgc2VuZChtZXNzYWdlVHlwZTogc3RyaW5nLCB2aWV3SWQ6IHN0cmluZywgbWVzc2FnZTogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAvLyBJbnZva2UgSlNcclxuICAgICAgICBpZiAoIW1lc3NhZ2Uuc291cmNlKVxyXG4gICAgICAgICAgICBtZXNzYWdlLnNvdXJjZSA9IHZpZXdJZFxyXG4gICAgICAgIGlmICghbWVzc2FnZS50YXJnZXQpXHJcbiAgICAgICAgICAgIG1lc3NhZ2UudGFyZ2V0ID0gdmlld0lkO1xyXG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5za3lyaW1QbGF0Zm9ybS5zZW5kTWVzc2FnZSgnV2ViVUknLCB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VUeXBlLCBtZXNzYWdlLCB0YXJnZXQ6IHZpZXdJZFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB3ZWJWaWV3SG9zdEluc3RhbmNlID0gbmV3IFdlYlZpZXdIb3N0KClcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHdlYlZpZXdIb3N0SW5zdGFuY2VcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCBTa3lyaW1BUEkgZnJvbSAnLi9Ta3lyaW1BUEknXHJcbmltcG9ydCBXZWJWaWV3SG9zdCBmcm9tICcuL1dlYlZpZXdIb3N0J1xyXG5pbXBvcnQgV2ViVmlldyBmcm9tICcuL1dlYlZpZXcnXHJcblxyXG4od2luZG93IGFzIGFueSkuX193ZWJWaWV3SG9zdCA9IFdlYlZpZXdIb3N0O1xyXG4od2luZG93IGFzIGFueSkuZ2V0V2ViVmlldyA9IChpZDogc3RyaW5nKSA9PiBXZWJWaWV3SG9zdC5nZXRWaWV3KGlkKTtcclxuKHdpbmRvdyBhcyBhbnkpLnNreXJpbSA9IFNreXJpbUFQSTtcclxuKHdpbmRvdyBhcyBhbnkpLldlYlZpZXcgPSBXZWJWaWV3XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICh3aW5kb3cgYXMgYW55KS5za3lyaW1QbGF0Zm9ybS5zZW5kTWVzc2FnZSgnV2ViVUknLCB7IG1lc3NhZ2VUeXBlOiAnd2Vidmlld2hvc3Rsb2FkZWQnIH0pXHJcbn0pXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==