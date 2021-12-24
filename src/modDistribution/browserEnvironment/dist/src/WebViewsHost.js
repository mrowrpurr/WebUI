var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
import WebViewsHostSkyrimPlatformAPI from './WebViewsHostSkyrimPlatformAPI';
var WebViewsHost = (function () {
    function WebViewsHost() {
        this._webViews = new Map();
        this._iframes = new Map();
        this.id = 'WebViewHostExtension';
        this.scripts = [];
    }
    WebViewsHost.prototype.onRegister = function (window) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._window = window;
                window.__webViewsHost__SkyrimPlatformAPI = new WebViewsHostSkyrimPlatformAPI(this);
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
export default WebViewsHost;
