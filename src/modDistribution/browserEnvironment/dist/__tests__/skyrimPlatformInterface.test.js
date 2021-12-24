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
import puppeteer from 'puppeteer';
describe('WebViewsHost interface for Skyrim Platform', function () {
    var widget1URL = "file://".concat(__dirname, "/../../../testFixtures/html/widget1.html");
    var widget2URL = "file://".concat(__dirname, "/../../../testFixtures/html/widget1.html");
    var browser;
    var page;
    var apiResponseCallbacks;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, puppeteer.launch()];
            case 1:
                browser = _a.sent();
                return [2];
        }
    }); }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, browser.close()];
            case 1:
                _a.sent();
                return [2];
        }
    }); }); });
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiResponseCallbacks = new Map();
                    return [4, browser.newPage()];
                case 1:
                    page = _a.sent();
                    return [4, page.exposeFunction('onSkyrimPlatformMessage', function (args) {
                            if (args && args.length == 4 && args[0] == 'WebUI' && args[1] == 'Reply') {
                                var replyId = args[2];
                                var response = args[3];
                                if (apiResponseCallbacks.has(replyId)) {
                                    apiResponseCallbacks.get(replyId)(response);
                                    apiResponseCallbacks.delete(replyId);
                                }
                            }
                        })];
                case 2:
                    _a.sent();
                    return [4, page.exposeFunction('consoleLogToTests', function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            console.log(args);
                        })];
                case 3:
                    _a.sent();
                    return [4, page.goto("file://".concat(__dirname, "/../../../../WebUI/__WebUI__/WebUI.BrowserEnvironment.html"))];
                case 4:
                    _a.sent();
                    return [4, page.addScriptTag({ url: "file://".concat(__dirname, "/../../../testFixtures/delegateSkyrimPlatformMessagesToPuppeteer.js") })];
                case 5:
                    _a.sent();
                    return [4, page.addScriptTag({ url: "file://".concat(__dirname, "/../../../testFixtures/delegateConsoleLogToTest.js") })];
                case 6:
                    _a.sent();
                    return [2];
            }
        });
    }); });
    function invokeAPI(functionName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, page.evaluate(function (functionName, args) {
                            var _a;
                            (_a = window['__webViewsHost__SkyrimPlatformAPI'])[functionName].apply(_a, args);
                        }, functionName, args)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    }
    function getFromAPI(functionName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve) {
                        var replyId = getReplyId();
                        apiResponseCallbacks.set(replyId, resolve);
                        invokeAPI.apply(void 0, __spreadArray([functionName, replyId], args, false));
                    })];
            });
        });
    }
    function getElementPosition(selector) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, width, height, x, y;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, page.evaluate(function (selector) {
                            var element = document.querySelector(selector);
                            return [element.style.width, element.style.height, element.style.left, element.style.top];
                        }, selector)];
                    case 1:
                        _a = _b.sent(), width = _a[0], height = _a[1], x = _a[2], y = _a[3];
                        return [2, [width, height, x, y]];
                }
            });
        });
    }
    var getReplyId = function () { return "".concat(Math.random(), "_").concat(Math.random()); };
    test.todo('returns responses via a browser message: WebUI, Reply, [ReplyID], Response');
    it('can getWebViewIds', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = expect;
                    return [4, getFromAPI('getWebViewIds')];
                case 1:
                    _a.apply(void 0, [_d.sent()]).toEqual([]);
                    return [4, invokeAPI('registerWebView', { id: 'MyFirstWebView', url: 'file:///index.html' })];
                case 2:
                    _d.sent();
                    _b = expect;
                    return [4, getFromAPI('getWebViewIds')];
                case 3:
                    _b.apply(void 0, [_d.sent()]).toEqual(['MyFirstWebView']);
                    return [4, invokeAPI('registerWebView', { id: 'MySecondWebView', url: 'file:///index.html' })];
                case 4:
                    _d.sent();
                    _c = expect;
                    return [4, getFromAPI('getWebViewIds')];
                case 5:
                    _c.apply(void 0, [_d.sent()]).toEqual(['MyFirstWebView', 'MySecondWebView']);
                    return [2];
            }
        });
    }); });
    it('can getWebView', function () { return __awaiter(void 0, void 0, void 0, function () {
        var webViewInfo, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    webViewInfo = { id: 'MyCoolWebView', url: widget1URL, x: 69, y: 420 };
                    _a = expect;
                    return [4, getFromAPI('getWebView', 'MyCoolWebView')];
                case 1:
                    _a.apply(void 0, [_c.sent()]).toEqual(null);
                    return [4, invokeAPI('registerWebView', webViewInfo)];
                case 2:
                    _c.sent();
                    _b = expect;
                    return [4, getFromAPI('getWebView', 'MyCoolWebView')];
                case 3:
                    _b.apply(void 0, [_c.sent()]).toEqual(webViewInfo);
                    return [2];
            }
        });
    }); });
    it('can unregisterWebView', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, invokeAPI('registerWebView', { id: 'MyCoolWebView1', url: widget1URL })];
                case 1:
                    _d.sent();
                    return [4, invokeAPI('registerWebView', { id: 'MyCoolWebView2', url: widget2URL })];
                case 2:
                    _d.sent();
                    _a = expect;
                    return [4, getFromAPI('getWebViewIds')];
                case 3:
                    _a.apply(void 0, [_d.sent()]).toEqual(['MyCoolWebView1', 'MyCoolWebView2']);
                    return [4, invokeAPI('unregisterWebView', 'MyCoolWebView1')];
                case 4:
                    _d.sent();
                    _b = expect;
                    return [4, getFromAPI('getWebViewIds')];
                case 5:
                    _b.apply(void 0, [_d.sent()]).toEqual(['MyCoolWebView2']);
                    return [4, invokeAPI('unregisterWebView', 'MyCoolWebView2')];
                case 6:
                    _d.sent();
                    _c = expect;
                    return [4, getFromAPI('getWebViewIds')];
                case 7:
                    _c.apply(void 0, [_d.sent()]).toEqual([]);
                    return [2];
            }
        });
    }); });
    it('can add web view to the UI (addWebViewToUI)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, iframe, frame, iframeHtml;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4, invokeAPI('registerWebView', { id: 'MyCoolWebView', url: widget1URL })];
                case 1:
                    _d.sent();
                    _a = expect;
                    return [4, page.evaluate(function () { return document.querySelectorAll('iframe').length; })];
                case 2:
                    _a.apply(void 0, [_d.sent()]).toEqual(0);
                    return [4, invokeAPI('addWebViewToUI', 'MyCoolWebView')];
                case 3:
                    _d.sent();
                    _b = expect;
                    return [4, page.evaluate(function () { return document.querySelectorAll('iframe').length; })];
                case 4:
                    _b.apply(void 0, [_d.sent()]).toEqual(1);
                    _c = expect;
                    return [4, page.evaluate(function () { var _a; return (_a = document.querySelector('iframe')) === null || _a === void 0 ? void 0 : _a.getAttribute('src'); })];
                case 5:
                    _c.apply(void 0, [_d.sent()]).toEqual(widget1URL);
                    return [4, page.waitForSelector('iframe')];
                case 6:
                    iframe = _d.sent();
                    return [4, iframe.contentFrame()];
                case 7:
                    frame = _d.sent();
                    return [4, (frame === null || frame === void 0 ? void 0 : frame.evaluate(function () { var _a; return (_a = document.querySelector('*')) === null || _a === void 0 ? void 0 : _a.outerHTML; }))];
                case 8:
                    iframeHtml = _d.sent();
                    expect(iframeHtml).toContain('I am widget 1');
                    return [2];
            }
        });
    }); });
});
