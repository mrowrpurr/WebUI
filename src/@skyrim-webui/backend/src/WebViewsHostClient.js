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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var WebViewsHostClient = (function () {
    function WebViewsHostClient(javascriptExecutor) {
        this.replyCallbacks = new Map();
        this.executeJS = javascriptExecutor;
    }
    WebViewsHostClient.prototype.onBrowserMessage = function (messageArguments) {
        if (messageArguments && messageArguments.length == 4 && messageArguments[0] == 'WebUI' && messageArguments[1] == 'Reply') {
            var replyId = messageArguments[2];
            var response = messageArguments[3];
            if (this.replyCallbacks.has(replyId)) {
                this.replyCallbacks.get(replyId)(response);
                this.replyCallbacks.delete(replyId);
            }
        }
    };
    WebViewsHostClient.prototype.registerWebView = function (webView) {
        this.sendRequest('registerWebView', webView);
    };
    WebViewsHostClient.prototype.unregisterWebView = function (id) {
        this.sendRequest('unregisterWebView', id);
    };
    WebViewsHostClient.prototype.getWebViewIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.getResponse('getWebViewIds')];
            });
        });
    };
    WebViewsHostClient.prototype.getWebView = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.getResponse('getWebView', id)];
            });
        });
    };
    WebViewsHostClient.prototype.addToUI = function (id) {
        this.sendRequest('addToUI', id);
    };
    WebViewsHostClient.prototype.getResponse = function (functionName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        var replyId = _this.getReplyId();
                        _this.replyCallbacks.set(replyId, resolve);
                        _this.sendRequest.apply(_this, __spreadArray([functionName, replyId], args, false));
                    })];
            });
        });
    };
    WebViewsHostClient.prototype.sendRequest = function (functionName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.executeJS("__webViewsHost__.".concat(functionName, "(").concat(args.map(function (arg) { return JSON.stringify(arg); }).join(', '), ")"));
    };
    WebViewsHostClient.prototype.getReplyId = function () {
        return "".concat(Math.random(), "_").concat(Math.random());
    };
    return WebViewsHostClient;
}());
export default WebViewsHostClient;
