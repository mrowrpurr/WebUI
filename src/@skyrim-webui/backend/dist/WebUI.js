var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/@skyrim-webui/sdk/src/@skyrim-webui/sdk/WebView", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/@skyrim-webui/sdk/src/@skyrim-webui/sdk/WebViewsHostClient", [], function (exports_2, context_2) {
    "use strict";
    var WebViewsHostClient;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            WebViewsHostClient = class WebViewsHostClient {
                constructor(javascriptExecutor) {
                    this.replyCallbacks = new Map();
                    this.executeJS = javascriptExecutor;
                }
                onBrowserMessage(messageArguments) {
                    // ['WebUI', 'Reply', replyId, ['MyCoolWebView']]
                    if (messageArguments && messageArguments.length == 4 && messageArguments[0] == 'WebUI' && messageArguments[1] == 'Reply') {
                        const replyId = messageArguments[2];
                        const response = messageArguments[3];
                        if (this.replyCallbacks.has(replyId)) {
                            this.replyCallbacks.get(replyId)(response);
                            this.replyCallbacks.delete(replyId);
                        }
                    }
                }
                registerWebView(webView) {
                    this.sendRequest('registerWebView', webView);
                }
                unregisterWebView(id) {
                    this.sendRequest('unregisterWebView', id);
                }
                getWebViewIds() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return this.getResponse('getWebViewIds');
                    });
                }
                getWebView(id) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return this.getResponse('getWebView', id);
                    });
                }
                addToUI(id) {
                    this.sendRequest('addToUI', id);
                }
                getResponse(functionName, ...args) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return new Promise(resolve => {
                            const replyId = this.getReplyId();
                            this.replyCallbacks.set(replyId, resolve);
                            this.sendRequest(functionName, replyId, ...args);
                        });
                    });
                }
                sendRequest(functionName, ...args) {
                    this.executeJS(`__webViewsHost__.${functionName}(${args.map(arg => JSON.stringify(arg)).join(', ')})`);
                }
                getReplyId() {
                    return `${Math.random()}_${Math.random()}`;
                }
            };
            exports_2("default", WebViewsHostClient);
        }
    };
});
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/@skyrim-webui/sdk/__tests__/WebViewsHostClient.test", ["puppeteer", "Users/mrowr/Dropbox/Skyrim/Mods/WebUI/@skyrim-webui/sdk/src/@skyrim-webui/sdk/WebViewsHostClient"], function (exports_3, context_3) {
    "use strict";
    var puppeteer, WebViewsHostClient_1;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (puppeteer_1) {
                puppeteer = puppeteer_1;
            },
            function (WebViewsHostClient_1_1) {
                WebViewsHostClient_1 = WebViewsHostClient_1_1;
            }
        ],
        execute: function () {
            describe('WebViewsHostClient SDK for Skyrim Platform', () => {
                const widget1URL = `file://${__dirname}/../../testFixtures/html/widget1.html`;
                const widget2URL = `file://${__dirname}/../../testFixtures/html/widget1.html`;
                let client;
                let browser;
                let page;
                beforeAll(() => __awaiter(void 0, void 0, void 0, function* () { browser = yield puppeteer.launch(); }));
                afterAll(() => __awaiter(void 0, void 0, void 0, function* () { yield browser.close(); }));
                beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                    page = yield browser.newPage();
                    client = new WebViewsHostClient_1.default((script) => { page.evaluate(script); });
                    yield page.exposeFunction('onSkyrimPlatformMessage', (args) => { client.onBrowserMessage(args); });
                    yield page.exposeFunction('consoleLogToTests', (...args) => { console.log(args); });
                    yield page.goto(`file://${__dirname}/../../../WebUI/__WebUI__/webViewsHost.html`);
                    yield page.addScriptTag({ url: `file://${__dirname}/../../testFixtures/delegateSkyrimPlatformMessagesToPuppeteer.js` });
                    yield page.addScriptTag({ url: `file://${__dirname}/../../testFixtures/delegateConsoleLogToTest.js` });
                }));
                /*
                 * Tests for the API interface provided by WebViewsHost for Skyrim Platform (using the SDK Client)
                 */
                /*
                 * Skyrim Platform ---> executeJavascript window.__webViewsHost__.[API FUNCTION]
                 * WebViewsHost    ---> window.skyrimPlatform.sendMessage
                 */
                it('can registerWebView', () => __awaiter(void 0, void 0, void 0, function* () {
                    expect(yield client.getWebViewIds()).toHaveLength(0);
                    client.registerWebView({ id: 'widget1', url: widget1URL });
                    expect(yield client.getWebViewIds()).toEqual(['widget1']);
                }));
                it('can getWebViewIds', () => __awaiter(void 0, void 0, void 0, function* () {
                    expect(yield client.getWebViewIds()).toEqual([]);
                    client.registerWebView({ id: 'widget1', url: widget1URL });
                    expect(yield client.getWebViewIds()).toEqual(['widget1']);
                    client.registerWebView({ id: 'widget2', url: widget2URL });
                    expect(yield client.getWebViewIds()).toEqual(['widget1', 'widget2']);
                }));
                it('can getWebView', () => __awaiter(void 0, void 0, void 0, function* () {
                    expect(yield client.getWebView('widget1')).toEqual(null);
                    expect(yield client.getWebView('widget2')).toEqual(null);
                    expect(yield client.getWebViewIds()).toEqual([]);
                    client.registerWebView({ id: 'widget1', url: widget1URL });
                    expect(yield client.getWebViewIds()).toEqual(['widget1']);
                    expect(yield client.getWebView('widget1')).not.toEqual(null);
                    let webView = yield client.getWebView('widget1');
                    expect(webView.id).toEqual('widget1');
                    expect(webView.url).toEqual(widget1URL);
                    expect(yield client.getWebView('widget2')).toEqual(null);
                    client.registerWebView({ id: 'widget2', url: widget2URL });
                    expect(yield client.getWebView('widget2')).not.toEqual(null);
                    webView = yield client.getWebView('widget2');
                    expect(webView.id).toEqual('widget2');
                    expect(webView.url).toEqual(widget2URL);
                }));
                it('can unregisterWebView', () => __awaiter(void 0, void 0, void 0, function* () {
                    client.registerWebView({ id: 'widget1', url: widget1URL });
                    client.registerWebView({ id: 'widget2', url: widget1URL });
                    expect(yield client.getWebViewIds()).toEqual(['widget1', 'widget2']);
                    client.unregisterWebView('widget1');
                    expect(yield client.getWebViewIds()).toEqual(['widget2']);
                    client.unregisterWebView('widget2');
                    expect(yield client.getWebViewIds()).toEqual([]);
                }));
                it('can addToUI', () => __awaiter(void 0, void 0, void 0, function* () {
                    expect((yield page.$$('iframe')).length).toEqual(0);
                    client.registerWebView({ id: 'widget1', url: widget1URL });
                    client.addToUI('widget1');
                    expect((yield page.$$('iframe')).length).toEqual(1);
                    const iframeHandle = yield page.$('iframe');
                    expect(yield iframeHandle.evaluate(iframe => iframe.getAttribute('src'))).toEqual(widget1URL);
                }));
                // it('can unregisterWebView', async () => {
                // it('can add web view to the UI - addToUI', async () => {
                // test.todo('cannot add multiple web views with the same identifier')
                // test.todo('web views added to UI are put into the properly style positions')
                // test.todo('can reposition web view currently added to UI')
                // test.todo('can remove web view from the UI - removeFromUI')
                // test.todo('can hide web view in the UI - hide')
                // test.todo('can unhide web view in the UI - show')
                // test.todo('can toggle web view in the UI - toggle')
            });
        }
    };
});
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-namespace */
// Generated automatically. Do not edit.
System.register("Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/@skyrim-webui/sdk/src/@skyrim-webui/sdk/index", ["Users/mrowr/Dropbox/Skyrim/Mods/WebUI/@skyrim-webui/sdk/src/@skyrim-webui/sdk/WebViewsHostClient", "Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform"], function (exports_5, context_5) {
    "use strict";
    var WebViewsHostClient_2, skyrimPlatform_1, webViewsHostClient;
    var __moduleName = context_5 && context_5.id;
    function getWebViewsHostClient() {
        return webViewsHostClient;
    }
    exports_5("getWebViewsHostClient", getWebViewsHostClient);
    function registerWebView(webView) {
        getWebViewsHostClient().registerWebView(webView);
    }
    exports_5("registerWebView", registerWebView);
    function getWebViewIds() {
        return __awaiter(this, void 0, void 0, function* () {
            return getWebViewsHostClient().getWebViewIds();
        });
    }
    exports_5("getWebViewIds", getWebViewIds);
    return {
        setters: [
            function (WebViewsHostClient_2_1) {
                WebViewsHostClient_2 = WebViewsHostClient_2_1;
            },
            function (skyrimPlatform_1_1) {
                skyrimPlatform_1 = skyrimPlatform_1_1;
            }
        ],
        execute: function () {
            webViewsHostClient = new WebViewsHostClient_2.default((script) => { skyrimPlatform_1.browser.executeJavaScript(script); });
            skyrimPlatform_1.on('browserMessage', message => {
                webViewsHostClient.onBrowserMessage(message.arguments);
            });
        }
    };
});
