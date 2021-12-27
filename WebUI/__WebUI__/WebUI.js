/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/BrowserEnvironment.ts":
/*!***********************************!*\
  !*** ./src/BrowserEnvironment.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BrowserEnvironment = (function () {
    function BrowserEnvironment(window) {
        this.extensions = new Map();
        this._window = window;
    }
    BrowserEnvironment.prototype.register = function (extension) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, extension.onRegister(this._window)];
            });
        });
    };
    BrowserEnvironment.prototype.unregister = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, true];
            });
        });
    };
    BrowserEnvironment.prototype.setMenuMode = function (enable) {
        if (enable === void 0) { enable = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, true];
            });
        });
    };
    BrowserEnvironment.prototype.setFocused = function (focused) {
        if (focused === void 0) { focused = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, true];
            });
        });
    };
    BrowserEnvironment.prototype.setVisible = function (focused) {
        if (focused === void 0) { focused = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, true];
            });
        });
    };
    return BrowserEnvironment;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BrowserEnvironment);


/***/ }),

/***/ "./src/WebViewsHost.ts":
/*!*****************************!*\
  !*** ./src/WebViewsHost.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WebViewsHostSkyrimPlatformAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebViewsHostSkyrimPlatformAPI */ "./src/WebViewsHostSkyrimPlatformAPI.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var WebViewsHost = (function () {
    function WebViewsHost() {
        this.id = 'WebViewHostExtension';
        this.scripts = [];
        this._webViews = new Map();
        this._iframes = new Map();
    }
    WebViewsHost.prototype.onRegister = function (window) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._window = window;
                window.__webViewsHost__SkyrimPlatformAPI = new _WebViewsHostSkyrimPlatformAPI__WEBPACK_IMPORTED_MODULE_0__["default"](this);
                return [2, true];
            });
        });
    };
    WebViewsHost.prototype.onUnregister = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, true];
            });
        });
    };
    WebViewsHost.prototype.registerWebView = function (webView) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._webViews.has(webView.id))
                    return [2, false];
                else {
                    this._webViews.set(webView.id, webView);
                    return [2, true];
                }
                return [2];
            });
        });
    };
    WebViewsHost.prototype.unregisterWebView = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._webViews.has(id)) {
                    this._webViews.delete(id);
                    return [2, true];
                }
                else
                    return [2, false];
                return [2];
            });
        });
    };
    WebViewsHost.prototype.updateWebView = function (webView) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("UPDATING WEB VIEW", webView);
                if (this._webViews.has(webView.id)) {
                    this._webViews.set(webView.id, webView);
                    console.log("UPDATED THE WEB VIEW", webView.id);
                    return [2, true];
                }
                else
                    return [2, false];
                return [2];
            });
        });
    };
    WebViewsHost.prototype.getWebViewIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, Array.from(this._webViews.keys())];
            });
        });
    };
    WebViewsHost.prototype.getWebViews = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Array()];
            });
        });
    };
    WebViewsHost.prototype.getWebView = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this._webViews.get(id)];
            });
        });
    };
    WebViewsHost.prototype.hasWebView = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, true];
            });
        });
    };
    WebViewsHost.prototype.addWebViewToUI = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var webView, iframe;
            return __generator(this, function (_a) {
                if (!this._webViews.has(id) || this._iframes.has(id))
                    return [2, false];
                webView = this._webViews.get(id);
                iframe = document.createElement('iframe');
                this._iframes.set(id, iframe);
                iframe.src = webView.url;
                iframe.dataset.webviewId = id;
                this.setIframePosition(iframe, webView);
                return [2, new Promise(function (resolve) {
                        iframe.onload = function (e) { return resolve(true); };
                        document.body.appendChild(iframe);
                    })];
            });
        });
    };
    WebViewsHost.prototype.removeWebViewFromUI = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._iframes.has(id)) {
                    document.body.removeChild(this._iframes.get(id));
                    return [2, true];
                }
                else
                    return [2, false];
                return [2];
            });
        });
    };
    WebViewsHost.prototype.showWebView = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, false];
            });
        });
    };
    WebViewsHost.prototype.hideWebView = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, false];
            });
        });
    };
    WebViewsHost.prototype.setWebViewMenuMode = function (id, menuMode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, false];
            });
        });
    };
    WebViewsHost.prototype.getScreenDimensions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, { width: window.innerWidth, height: window.innerHeight }];
            });
        });
    };
    WebViewsHost.prototype.moveWebView = function (id, position) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, false];
            });
        });
    };
    WebViewsHost.prototype.redirectWebViewUrl = function (id, url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, false];
            });
        });
    };
    WebViewsHost.prototype.setIframePosition = function (iframe, webView) {
        if (webView.position && webView.position.type) {
            if (webView.position.type == 'absolute') {
                iframe.style.width = webView.position.info.width.toString();
                iframe.style.height = webView.position.info.height.toString();
                iframe.style.left = webView.position.info.x.toString();
                iframe.style.top = webView.position.info.y.toString();
            }
            else if (webView.position.info.position.type == 'percentage') {
                iframe.style.width = "".concat(window.innerWidth * (webView.position.info.width / 100), "px");
                iframe.style.height = "".concat(window.innerHeight * (webView.position.info.height / 100), "px");
                iframe.style.left = "".concat(window.innerWidth * (webView.position.info.x / 100), "px");
                iframe.style.top = "".concat(window.innerHeight * (webView.position.info.y / 100), "px");
            }
            else {
                console.error("Unknown WebView position type: ".concat(webView.position.type));
            }
        }
    };
    WebViewsHost.prototype.addScriptsAndWaitForLoad = function (scripts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    };
    return WebViewsHost;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebViewsHost);


/***/ }),

/***/ "./src/WebViewsHostSkyrimPlatformAPI.ts":
/*!**********************************************!*\
  !*** ./src/WebViewsHostSkyrimPlatformAPI.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var WebViewsHostSkyrimPlatformAPI = (function () {
    function WebViewsHostSkyrimPlatformAPI(webViewsHost) {
        this._webViewsHost = webViewsHost;
    }
    WebViewsHostSkyrimPlatformAPI.prototype.reply = function (replyId, data) {
        window.skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data]);
    };
    WebViewsHostSkyrimPlatformAPI.prototype.getWebViewIds = function (replyId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.reply;
                        _b = [replyId];
                        return [4, this._webViewsHost.getWebViewIds()];
                    case 1:
                        _a.apply(this, _b.concat([_c.sent()]));
                        return [2];
                }
            });
        });
    };
    WebViewsHostSkyrimPlatformAPI.prototype.registerWebView = function (webView) {
        this._webViewsHost.registerWebView(webView);
    };
    WebViewsHostSkyrimPlatformAPI.prototype.unregisterWebView = function (id) {
        this._webViewsHost.unregisterWebView(id);
    };
    WebViewsHostSkyrimPlatformAPI.prototype.updateWebView = function (webView) {
        this._webViewsHost.updateWebView(webView);
    };
    WebViewsHostSkyrimPlatformAPI.prototype.getWebView = function (replyId, id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.reply;
                        _b = [replyId];
                        return [4, this._webViewsHost.getWebView(id)];
                    case 1:
                        _a.apply(this, _b.concat([_c.sent()]));
                        return [2];
                }
            });
        });
    };
    WebViewsHostSkyrimPlatformAPI.prototype.addWebViewToUI = function (id) {
        this._webViewsHost.addWebViewToUI(id);
    };
    WebViewsHostSkyrimPlatformAPI.prototype.removeWebViewFromUI = function (id) {
        this._webViewsHost.removeWebViewFromUI(id);
    };
    WebViewsHostSkyrimPlatformAPI.prototype.getScreenDimensions = function (replyId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.reply;
                        _b = [replyId];
                        return [4, this._webViewsHost.getScreenDimensions()];
                    case 1:
                        _a.apply(this, _b.concat([_c.sent()]));
                        return [2];
                }
            });
        });
    };
    return WebViewsHostSkyrimPlatformAPI;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebViewsHostSkyrimPlatformAPI);


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BrowserEnvironment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BrowserEnvironment */ "./src/BrowserEnvironment.ts");
/* harmony import */ var _WebViewsHost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WebViewsHost */ "./src/WebViewsHost.ts");

var browserEnvironment = new _BrowserEnvironment__WEBPACK_IMPORTED_MODULE_0__["default"](window);
window.browserEnv = browserEnvironment;

browserEnvironment.register(new _WebViewsHost__WEBPACK_IMPORTED_MODULE_1__["default"]());
window.foo = "Hello?";

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViVUkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtQkFBbUIsU0FBSSxJQUFJLFNBQUk7QUFDL0IsY0FBYyw2QkFBNkIsMEJBQTBCLGNBQWMscUJBQXFCO0FBQ3hHLGlCQUFpQixvREFBb0QscUVBQXFFLGNBQWM7QUFDeEosdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsbUNBQW1DLFNBQVM7QUFDNUMsbUNBQW1DLFdBQVcsVUFBVTtBQUN4RCwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBLDhHQUE4RyxPQUFPO0FBQ3JILGlGQUFpRixpQkFBaUI7QUFDbEcseURBQXlELGdCQUFnQixRQUFRO0FBQ2pGLCtDQUErQyxnQkFBZ0IsZ0JBQWdCO0FBQy9FO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxVQUFVLFlBQVksYUFBYSxTQUFTLFVBQVU7QUFDdEQsb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDRCxpRUFBZSxrQkFBa0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGbEMsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsbUJBQW1CLFNBQUksSUFBSSxTQUFJO0FBQy9CLGNBQWMsNkJBQTZCLDBCQUEwQixjQUFjLHFCQUFxQjtBQUN4RyxpQkFBaUIsb0RBQW9ELHFFQUFxRSxjQUFjO0FBQ3hKLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDLG1DQUFtQyxTQUFTO0FBQzVDLG1DQUFtQyxXQUFXLFVBQVU7QUFDeEQsMENBQTBDLGNBQWM7QUFDeEQ7QUFDQSw4R0FBOEcsT0FBTztBQUNySCxpRkFBaUYsaUJBQWlCO0FBQ2xHLHlEQUF5RCxnQkFBZ0IsUUFBUTtBQUNqRiwrQ0FBK0MsZ0JBQWdCLGdCQUFnQjtBQUMvRTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0EsVUFBVSxZQUFZLGFBQWEsU0FBUyxVQUFVO0FBQ3RELG9DQUFvQyxTQUFTO0FBQzdDO0FBQ0E7QUFDNEU7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxzRUFBNkI7QUFDNUY7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0EscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsc0RBQXNEO0FBQ25GLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDdk81QixpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0IsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtQkFBbUIsU0FBSSxJQUFJLFNBQUk7QUFDL0IsY0FBYyw2QkFBNkIsMEJBQTBCLGNBQWMscUJBQXFCO0FBQ3hHLGlCQUFpQixvREFBb0QscUVBQXFFLGNBQWM7QUFDeEosdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsbUNBQW1DLFNBQVM7QUFDNUMsbUNBQW1DLFdBQVcsVUFBVTtBQUN4RCwwQ0FBMEMsY0FBYztBQUN4RDtBQUNBLDhHQUE4RyxPQUFPO0FBQ3JILGlGQUFpRixpQkFBaUI7QUFDbEcseURBQXlELGdCQUFnQixRQUFRO0FBQ2pGLCtDQUErQyxnQkFBZ0IsZ0JBQWdCO0FBQy9FO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxVQUFVLFlBQVksYUFBYSxTQUFTLFVBQVU7QUFDdEQsb0NBQW9DLFNBQVM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUVBQWUsNkJBQTZCLEVBQUM7Ozs7Ozs7VUM1RzdDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnNEO0FBQ3RELDZCQUE2QiwyREFBa0I7QUFDL0M7QUFDMEM7QUFDMUMsZ0NBQWdDLHFEQUFZO0FBQzVDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS9ydW50aW1lLXdlYi8uL3NyYy9Ccm93c2VyRW52aXJvbm1lbnQudHMiLCJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS9ydW50aW1lLXdlYi8uL3NyYy9XZWJWaWV3c0hvc3QudHMiLCJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS9ydW50aW1lLXdlYi8uL3NyYy9XZWJWaWV3c0hvc3RTa3lyaW1QbGF0Zm9ybUFQSS50cyIsIndlYnBhY2s6Ly9Ac2t5cmltLXdlYnVpL3J1bnRpbWUtd2ViL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0Bza3lyaW0td2VidWkvcnVudGltZS13ZWIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0Bza3lyaW0td2VidWkvcnVudGltZS13ZWIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Ac2t5cmltLXdlYnVpL3J1bnRpbWUtd2ViL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS9ydW50aW1lLXdlYi8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufTtcclxudmFyIEJyb3dzZXJFbnZpcm9ubWVudCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBCcm93c2VyRW52aXJvbm1lbnQod2luZG93KSB7XHJcbiAgICAgICAgdGhpcy5leHRlbnNpb25zID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMuX3dpbmRvdyA9IHdpbmRvdztcclxuICAgIH1cclxuICAgIEJyb3dzZXJFbnZpcm9ubWVudC5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoZXh0ZW5zaW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIGV4dGVuc2lvbi5vblJlZ2lzdGVyKHRoaXMuX3dpbmRvdyldO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBCcm93c2VyRW52aXJvbm1lbnQucHJvdG90eXBlLnVucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiwgdHJ1ZV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEJyb3dzZXJFbnZpcm9ubWVudC5wcm90b3R5cGUuc2V0TWVudU1vZGUgPSBmdW5jdGlvbiAoZW5hYmxlKSB7XHJcbiAgICAgICAgaWYgKGVuYWJsZSA9PT0gdm9pZCAwKSB7IGVuYWJsZSA9IHRydWU7IH1cclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiwgdHJ1ZV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIEJyb3dzZXJFbnZpcm9ubWVudC5wcm90b3R5cGUuc2V0Rm9jdXNlZCA9IGZ1bmN0aW9uIChmb2N1c2VkKSB7XHJcbiAgICAgICAgaWYgKGZvY3VzZWQgPT09IHZvaWQgMCkgeyBmb2N1c2VkID0gdHJ1ZTsgfVxyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB0cnVlXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgQnJvd3NlckVudmlyb25tZW50LnByb3RvdHlwZS5zZXRWaXNpYmxlID0gZnVuY3Rpb24gKGZvY3VzZWQpIHtcclxuICAgICAgICBpZiAoZm9jdXNlZCA9PT0gdm9pZCAwKSB7IGZvY3VzZWQgPSB0cnVlOyB9XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIHRydWVdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQnJvd3NlckVudmlyb25tZW50O1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBCcm93c2VyRW52aXJvbm1lbnQ7XHJcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG5pbXBvcnQgV2ViVmlld3NIb3N0U2t5cmltUGxhdGZvcm1BUEkgZnJvbSAnLi9XZWJWaWV3c0hvc3RTa3lyaW1QbGF0Zm9ybUFQSSc7XHJcbnZhciBXZWJWaWV3c0hvc3QgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV2ViVmlld3NIb3N0KCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSAnV2ViVmlld0hvc3RFeHRlbnNpb24nO1xyXG4gICAgICAgIHRoaXMuc2NyaXB0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3dlYlZpZXdzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMuX2lmcmFtZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB9XHJcbiAgICBXZWJWaWV3c0hvc3QucHJvdG90eXBlLm9uUmVnaXN0ZXIgPSBmdW5jdGlvbiAod2luZG93KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93aW5kb3cgPSB3aW5kb3c7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuX193ZWJWaWV3c0hvc3RfX1NreXJpbVBsYXRmb3JtQVBJID0gbmV3IFdlYlZpZXdzSG9zdFNreXJpbVBsYXRmb3JtQVBJKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB0cnVlXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgV2ViVmlld3NIb3N0LnByb3RvdHlwZS5vblVucmVnaXN0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIHRydWVdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBXZWJWaWV3c0hvc3QucHJvdG90eXBlLnJlZ2lzdGVyV2ViVmlldyA9IGZ1bmN0aW9uICh3ZWJWaWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fd2ViVmlld3MuaGFzKHdlYlZpZXcuaWQpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgZmFsc2VdO1xyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2ViVmlld3Muc2V0KHdlYlZpZXcuaWQsIHdlYlZpZXcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgdHJ1ZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBXZWJWaWV3c0hvc3QucHJvdG90eXBlLnVucmVnaXN0ZXJXZWJWaWV3ID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fd2ViVmlld3MuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dlYlZpZXdzLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB0cnVlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIGZhbHNlXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMl07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYlZpZXdzSG9zdC5wcm90b3R5cGUudXBkYXRlV2ViVmlldyA9IGZ1bmN0aW9uICh3ZWJWaWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVQREFUSU5HIFdFQiBWSUVXXCIsIHdlYlZpZXcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3dlYlZpZXdzLmhhcyh3ZWJWaWV3LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dlYlZpZXdzLnNldCh3ZWJWaWV3LmlkLCB3ZWJWaWV3KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVQREFURUQgVEhFIFdFQiBWSUVXXCIsIHdlYlZpZXcuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiwgdHJ1ZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBmYWxzZV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBXZWJWaWV3c0hvc3QucHJvdG90eXBlLmdldFdlYlZpZXdJZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIEFycmF5LmZyb20odGhpcy5fd2ViVmlld3Mua2V5cygpKV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYlZpZXdzSG9zdC5wcm90b3R5cGUuZ2V0V2ViVmlld3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIG5ldyBBcnJheSgpXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgV2ViVmlld3NIb3N0LnByb3RvdHlwZS5nZXRXZWJWaWV3ID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIHRoaXMuX3dlYlZpZXdzLmdldChpZCldO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBXZWJWaWV3c0hvc3QucHJvdG90eXBlLmhhc1dlYlZpZXcgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiwgdHJ1ZV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYlZpZXdzSG9zdC5wcm90b3R5cGUuYWRkV2ViVmlld1RvVUkgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB3ZWJWaWV3LCBpZnJhbWU7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fd2ViVmlld3MuaGFzKGlkKSB8fCB0aGlzLl9pZnJhbWVzLmhhcyhpZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBmYWxzZV07XHJcbiAgICAgICAgICAgICAgICB3ZWJWaWV3ID0gdGhpcy5fd2ViVmlld3MuZ2V0KGlkKTtcclxuICAgICAgICAgICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faWZyYW1lcy5zZXQoaWQsIGlmcmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZnJhbWUuc3JjID0gd2ViVmlldy51cmw7XHJcbiAgICAgICAgICAgICAgICBpZnJhbWUuZGF0YXNldC53ZWJ2aWV3SWQgPSBpZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SWZyYW1lUG9zaXRpb24oaWZyYW1lLCB3ZWJWaWV3KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiwgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7IHJldHVybiByZXNvbHZlKHRydWUpOyB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSldO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBXZWJWaWV3c0hvc3QucHJvdG90eXBlLnJlbW92ZVdlYlZpZXdGcm9tVUkgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pZnJhbWVzLmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuX2lmcmFtZXMuZ2V0KGlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB0cnVlXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIsIGZhbHNlXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMl07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYlZpZXdzSG9zdC5wcm90b3R5cGUuc2hvd1dlYlZpZXcgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbMiwgZmFsc2VdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBXZWJWaWV3c0hvc3QucHJvdG90eXBlLmhpZGVXZWJWaWV3ID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIGZhbHNlXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgV2ViVmlld3NIb3N0LnByb3RvdHlwZS5zZXRXZWJWaWV3TWVudU1vZGUgPSBmdW5jdGlvbiAoaWQsIG1lbnVNb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIGZhbHNlXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgV2ViVmlld3NIb3N0LnByb3RvdHlwZS5nZXRTY3JlZW5EaW1lbnNpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyLCB7IHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQgfV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYlZpZXdzSG9zdC5wcm90b3R5cGUubW92ZVdlYlZpZXcgPSBmdW5jdGlvbiAoaWQsIHBvc2l0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzIsIGZhbHNlXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgV2ViVmlld3NIb3N0LnByb3RvdHlwZS5yZWRpcmVjdFdlYlZpZXdVcmwgPSBmdW5jdGlvbiAoaWQsIHVybCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyLCBmYWxzZV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYlZpZXdzSG9zdC5wcm90b3R5cGUuc2V0SWZyYW1lUG9zaXRpb24gPSBmdW5jdGlvbiAoaWZyYW1lLCB3ZWJWaWV3KSB7XHJcbiAgICAgICAgaWYgKHdlYlZpZXcucG9zaXRpb24gJiYgd2ViVmlldy5wb3NpdGlvbi50eXBlKSB7XHJcbiAgICAgICAgICAgIGlmICh3ZWJWaWV3LnBvc2l0aW9uLnR5cGUgPT0gJ2Fic29sdXRlJykge1xyXG4gICAgICAgICAgICAgICAgaWZyYW1lLnN0eWxlLndpZHRoID0gd2ViVmlldy5wb3NpdGlvbi5pbmZvLndpZHRoLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gd2ViVmlldy5wb3NpdGlvbi5pbmZvLmhlaWdodC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgaWZyYW1lLnN0eWxlLmxlZnQgPSB3ZWJWaWV3LnBvc2l0aW9uLmluZm8ueC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgaWZyYW1lLnN0eWxlLnRvcCA9IHdlYlZpZXcucG9zaXRpb24uaW5mby55LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAod2ViVmlldy5wb3NpdGlvbi5pbmZvLnBvc2l0aW9uLnR5cGUgPT0gJ3BlcmNlbnRhZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICBpZnJhbWUuc3R5bGUud2lkdGggPSBcIlwiLmNvbmNhdCh3aW5kb3cuaW5uZXJXaWR0aCAqICh3ZWJWaWV3LnBvc2l0aW9uLmluZm8ud2lkdGggLyAxMDApLCBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgaWZyYW1lLnN0eWxlLmhlaWdodCA9IFwiXCIuY29uY2F0KHdpbmRvdy5pbm5lckhlaWdodCAqICh3ZWJWaWV3LnBvc2l0aW9uLmluZm8uaGVpZ2h0IC8gMTAwKSwgXCJweFwiKTtcclxuICAgICAgICAgICAgICAgIGlmcmFtZS5zdHlsZS5sZWZ0ID0gXCJcIi5jb25jYXQod2luZG93LmlubmVyV2lkdGggKiAod2ViVmlldy5wb3NpdGlvbi5pbmZvLnggLyAxMDApLCBcInB4XCIpO1xyXG4gICAgICAgICAgICAgICAgaWZyYW1lLnN0eWxlLnRvcCA9IFwiXCIuY29uY2F0KHdpbmRvdy5pbm5lckhlaWdodCAqICh3ZWJWaWV3LnBvc2l0aW9uLmluZm8ueSAvIDEwMCksIFwicHhcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5rbm93biBXZWJWaWV3IHBvc2l0aW9uIHR5cGU6IFwiLmNvbmNhdCh3ZWJWaWV3LnBvc2l0aW9uLnR5cGUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBXZWJWaWV3c0hvc3QucHJvdG90eXBlLmFkZFNjcmlwdHNBbmRXYWl0Rm9yTG9hZCA9IGZ1bmN0aW9uIChzY3JpcHRzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gV2ViVmlld3NIb3N0O1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBXZWJWaWV3c0hvc3Q7XHJcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59O1xyXG52YXIgV2ViVmlld3NIb3N0U2t5cmltUGxhdGZvcm1BUEkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV2ViVmlld3NIb3N0U2t5cmltUGxhdGZvcm1BUEkod2ViVmlld3NIb3N0KSB7XHJcbiAgICAgICAgdGhpcy5fd2ViVmlld3NIb3N0ID0gd2ViVmlld3NIb3N0O1xyXG4gICAgfVxyXG4gICAgV2ViVmlld3NIb3N0U2t5cmltUGxhdGZvcm1BUEkucHJvdG90eXBlLnJlcGx5ID0gZnVuY3Rpb24gKHJlcGx5SWQsIGRhdGEpIHtcclxuICAgICAgICB3aW5kb3cuc2t5cmltUGxhdGZvcm0uc2VuZE1lc3NhZ2UoWydXZWJVSScsICdSZXBseScsIHJlcGx5SWQsIGRhdGFdKTtcclxuICAgIH07XHJcbiAgICBXZWJWaWV3c0hvc3RTa3lyaW1QbGF0Zm9ybUFQSS5wcm90b3R5cGUuZ2V0V2ViVmlld0lkcyA9IGZ1bmN0aW9uIChyZXBseUlkKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9jLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHRoaXMucmVwbHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iID0gW3JlcGx5SWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQsIHRoaXMuX3dlYlZpZXdzSG9zdC5nZXRXZWJWaWV3SWRzKCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2EuYXBwbHkodGhpcywgX2IuY29uY2F0KFtfYy5zZW50KCldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIFdlYlZpZXdzSG9zdFNreXJpbVBsYXRmb3JtQVBJLnByb3RvdHlwZS5yZWdpc3RlcldlYlZpZXcgPSBmdW5jdGlvbiAod2ViVmlldykge1xyXG4gICAgICAgIHRoaXMuX3dlYlZpZXdzSG9zdC5yZWdpc3RlcldlYlZpZXcod2ViVmlldyk7XHJcbiAgICB9O1xyXG4gICAgV2ViVmlld3NIb3N0U2t5cmltUGxhdGZvcm1BUEkucHJvdG90eXBlLnVucmVnaXN0ZXJXZWJWaWV3ID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgdGhpcy5fd2ViVmlld3NIb3N0LnVucmVnaXN0ZXJXZWJWaWV3KGlkKTtcclxuICAgIH07XHJcbiAgICBXZWJWaWV3c0hvc3RTa3lyaW1QbGF0Zm9ybUFQSS5wcm90b3R5cGUudXBkYXRlV2ViVmlldyA9IGZ1bmN0aW9uICh3ZWJWaWV3KSB7XHJcbiAgICAgICAgdGhpcy5fd2ViVmlld3NIb3N0LnVwZGF0ZVdlYlZpZXcod2ViVmlldyk7XHJcbiAgICB9O1xyXG4gICAgV2ViVmlld3NIb3N0U2t5cmltUGxhdGZvcm1BUEkucHJvdG90eXBlLmdldFdlYlZpZXcgPSBmdW5jdGlvbiAocmVwbHlJZCwgaWQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2MpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2MubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gdGhpcy5yZXBseTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSBbcmVwbHlJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5fd2ViVmlld3NIb3N0LmdldFdlYlZpZXcoaWQpXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hLmFwcGx5KHRoaXMsIF9iLmNvbmNhdChbX2Muc2VudCgpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzJdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBXZWJWaWV3c0hvc3RTa3lyaW1QbGF0Zm9ybUFQSS5wcm90b3R5cGUuYWRkV2ViVmlld1RvVUkgPSBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICB0aGlzLl93ZWJWaWV3c0hvc3QuYWRkV2ViVmlld1RvVUkoaWQpO1xyXG4gICAgfTtcclxuICAgIFdlYlZpZXdzSG9zdFNreXJpbVBsYXRmb3JtQVBJLnByb3RvdHlwZS5yZW1vdmVXZWJWaWV3RnJvbVVJID0gZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgdGhpcy5fd2ViVmlld3NIb3N0LnJlbW92ZVdlYlZpZXdGcm9tVUkoaWQpO1xyXG4gICAgfTtcclxuICAgIFdlYlZpZXdzSG9zdFNreXJpbVBsYXRmb3JtQVBJLnByb3RvdHlwZS5nZXRTY3JlZW5EaW1lbnNpb25zID0gZnVuY3Rpb24gKHJlcGx5SWQpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2MpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoX2MubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gdGhpcy5yZXBseTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2IgPSBbcmVwbHlJZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCwgdGhpcy5fd2ViVmlld3NIb3N0LmdldFNjcmVlbkRpbWVuc2lvbnMoKV07XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5hcHBseSh0aGlzLCBfYi5jb25jYXQoW19jLnNlbnQoKV0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIFdlYlZpZXdzSG9zdFNreXJpbVBsYXRmb3JtQVBJO1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBXZWJWaWV3c0hvc3RTa3lyaW1QbGF0Zm9ybUFQSTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgQnJvd3NlckVudmlyb25tZW50IGZyb20gJy4vQnJvd3NlckVudmlyb25tZW50JztcclxudmFyIGJyb3dzZXJFbnZpcm9ubWVudCA9IG5ldyBCcm93c2VyRW52aXJvbm1lbnQod2luZG93KTtcclxud2luZG93LmJyb3dzZXJFbnYgPSBicm93c2VyRW52aXJvbm1lbnQ7XHJcbmltcG9ydCBXZWJWaWV3c0hvc3QgZnJvbSAnLi9XZWJWaWV3c0hvc3QnO1xyXG5icm93c2VyRW52aXJvbm1lbnQucmVnaXN0ZXIobmV3IFdlYlZpZXdzSG9zdCgpKTtcclxud2luZG93LmZvbyA9IFwiSGVsbG8/XCI7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==