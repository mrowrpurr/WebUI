"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import WebViewHost from '../src/WebUI/WebViewHost'
// describe("WebViewHost", () => {
//     it("can register WebViews", () => {
//         const host = new WebViewHost()
//     })
// })
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/src/Module/src/WebUI/ISkyrimPlatform", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-namespace */
// Generated automatically. Do not edit.
System.register("Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/src/Module/src/WebUI/MessageBox", ["Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform"], function (exports_3, context_3) {
    "use strict";
    var skyrimPlatform_1;
    var __moduleName = context_3 && context_3.id;
    function MessageBox(...args) {
        skyrimPlatform_1.once('update', () => {
            skyrimPlatform_1.Debug.messageBox(JSON.stringify(args));
        });
    }
    exports_3("default", MessageBox);
    return {
        setters: [
            function (skyrimPlatform_1_1) {
                skyrimPlatform_1 = skyrimPlatform_1_1;
            }
        ],
        execute: function () {
        }
    };
});
/*
 * Skyrim Platform Backend
 */
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/src/Module/src/WebUI/WebViewEvents", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/src/Module/src/WebUI/index", ["Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform", "Users/mrowr/Dropbox/Skyrim/Mods/WebUI/src/Module/src/WebUI/WebView", "Users/mrowr/Dropbox/Skyrim/Mods/WebUI/src/Module/src/WebUI/WebViewHost"], function (exports_5, context_5) {
    "use strict";
    var skyrimPlatform_2, sp, WebView_1, WebViewHost_1, _currentWebViewHost;
    var __moduleName = context_5 && context_5.id;
    function getWebViewHost() {
        if (!_currentWebViewHost)
            setWebViewHost(defaultWebViewHost());
        return _currentWebViewHost;
    }
    exports_5("getWebViewHost", getWebViewHost);
    function setWebViewHost(host) {
        _currentWebViewHost = host;
        return host;
    }
    exports_5("setWebViewHost", setWebViewHost);
    function defaultWebViewHost() {
        return new WebViewHost_1.default({ skyrimPlatform: {
                browser: skyrimPlatform_2.browser,
                // onBrowserMessage: on,
                onBrowserMessage: (eventName, callback) => {
                    skyrimPlatform_2.on('browserMessage', message => {
                        skyrimPlatform_2.once('update', () => {
                            callback(message);
                        });
                    });
                },
                onceUpdate: (eventName, callback) => {
                    skyrimPlatform_2.once('update', () => {
                        callback();
                    });
                }
            } });
    }
    exports_5("defaultWebViewHost", defaultWebViewHost);
    function getWebView(id) {
        return getWebViewHost().getWebView(id);
    }
    exports_5("getWebView", getWebView);
    function registerWebView(params) {
        const host = getWebViewHost();
        const webView = new WebView_1.default(Object.assign({ host }, params));
        host.addWebView(webView);
        return webView;
    }
    exports_5("registerWebView", registerWebView);
    function reloadAllJsonDefinitions() {
        skyrimPlatform_2.once('update', () => {
            const modEvent = sp.ModEvent;
            const handle = modEvent.Create("WEBUI_RELOAD_JSON");
            modEvent.send(handle);
        });
    }
    exports_5("reloadAllJsonDefinitions", reloadAllJsonDefinitions);
    return {
        setters: [
            function (skyrimPlatform_2_1) {
                skyrimPlatform_2 = skyrimPlatform_2_1;
                sp = skyrimPlatform_2_1;
            },
            function (WebView_1_1) {
                WebView_1 = WebView_1_1;
            },
            function (WebViewHost_1_1) {
                WebViewHost_1 = WebViewHost_1_1;
            }
        ],
        execute: function () {
            _currentWebViewHost = undefined;
        }
    };
});
/*
 * Skyrim Platform Backend
 */
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/src/Module/src/WebUI/WebViewHost", ["Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform"], function (exports_6, context_6) {
    "use strict";
    var skyrimPlatform_3, WebViewHost;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (skyrimPlatform_3_1) {
                skyrimPlatform_3 = skyrimPlatform_3_1;
            }
        ],
        execute: function () {
            WebViewHost = class WebViewHost {
                constructor(params) {
                    this.initialized = false;
                    this.isReady = false;
                    this.messageCallbacks = new Map();
                    this.jsToInvokeWhenReady = new Array();
                    this.messageResponsePromises = new Map();
                    this.webViews = new Map();
                    this.webViewsCurrentlyInUI = new Map();
                    this.onloadCallbacks = new Array();
                    skyrimPlatform_3.once('update', () => {
                        skyrimPlatform_3.Debug.messageBox(`CREATE NEW WEB VIEW HOST`);
                    });
                    if (!params.rootUrl)
                        params.rootUrl = 'file:///Data/WebUI/WebUI/index.html';
                    this.browser = params.skyrimPlatform.browser;
                    this.onBrowserMessage = params.skyrimPlatform.onBrowserMessage;
                    this.onceUpdate = params.skyrimPlatform.onceUpdate;
                    this.rootUrl = params.rootUrl;
                    this.initialize();
                }
                initialize() {
                    if (!this.initialized) {
                        this.initialized = true;
                        this.browser.loadUrl(this.rootUrl);
                        this.browser.setVisible(true);
                        this.onBrowserMessage('browserMessage', message => this._handleBrowserMessage(message));
                    }
                }
                addWebView(webView) {
                    this.webViews.set(webView.id, webView);
                    skyrimPlatform_3.once('update', () => {
                        skyrimPlatform_3.Debug.messageBox(`Registered/Added Web View: ${webView.id} - ${this.getWebViews().length}`);
                    });
                    this.webViewsCurrentlyInUI.set(webView.id, false);
                }
                removeWebView(id) {
                    this.webViews.delete(id);
                    this.webViewsCurrentlyInUI.delete(id);
                }
                addToUI(webView) {
                    this.addWebView(webView);
                    this.webViewsCurrentlyInUI.set(webView.id, true);
                    this.invokeViewHostFunction('addFromProps', {
                        id: webView.id,
                        url: webView.url,
                        position: webView.position
                    });
                    if (webView.isMenu)
                        this.activateMenuMode();
                }
                removeFromUI(id) {
                    const webView = this.getWebView(id);
                    if (webView && webView.isMenu)
                        this.deactivateMenuMode();
                    this.invokeViewHostFunction('remove', id);
                    this.webViewsCurrentlyInUI.set(id, false);
                }
                toggleUI(webView) {
                    if (this.webViewsCurrentlyInUI.has(webView.id) && this.webViewsCurrentlyInUI.get(webView.id))
                        this.removeFromUI(webView.id);
                    else
                        this.addToUI(webView);
                }
                refreshAll() {
                    for (let [webViewId, isInUI] of this.webViewsCurrentlyInUI)
                        if (isInUI)
                            this.invokeViewHostFunction('reloadWebView', webViewId);
                }
                activateMenuMode() {
                    skyrimPlatform_3.Ui.openCustomMenu('', 0);
                    // this.browser.setFocused(true)
                }
                deactivateMenuMode() {
                    skyrimPlatform_3.Ui.closeCustomMenu();
                    this.browser.setFocused(false);
                }
                getWebView(id) {
                    return this.webViews.get(id);
                }
                getWebViews() {
                    return Array.from(this.webViews.values());
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
                        if (messageType == 'request') {
                            if (!message.replyId)
                                message.replyId = this.getUniqueReplyId();
                            return new Promise(resolve => {
                                this.invokeViewHostFunction('invokeMessage', { messageType, message, viewId, });
                                this.messageResponsePromises.set(message.replyId, resolve);
                            });
                        }
                        else {
                            return new Promise(resolve => {
                                this.invokeViewHostFunction('invokeMessage', { messageType, message, viewId, });
                                resolve(undefined);
                            });
                        }
                    });
                }
                reply(request, viewId, response) {
                    this.invokeViewHostFunction('onReply', Object.assign({ replyId: request.replyId }, response));
                }
                invokeViewHostFunction(functionName, parameters) {
                    if (this.isReady)
                        this.browser.executeJavaScript(`window.__webViewHost.${functionName}(${JSON.stringify(parameters)});`);
                    else
                        this.jsToInvokeWhenReady.push([functionName, parameters]);
                }
                getUniqueReplyId() {
                    return `${Math.random()}_${Math.random()}`;
                }
                waitForLoad() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return new Promise(resolve => {
                            if (this.isReady)
                                resolve(undefined);
                            else
                                this.onloadCallbacks.push(resolve);
                        });
                    });
                }
                _handleBrowserMessage(message) {
                    this.onceUpdate('update', () => {
                        if (message.arguments.length && message.arguments[0] == "WebUI") {
                            const browserMessage = message.arguments[1];
                            if (browserMessage.messageType == 'webviewhostloaded') {
                                this.isReady = true;
                                this.jsToInvokeWhenReady.forEach(jsToInvoke => {
                                    this.invokeViewHostFunction(jsToInvoke[0], jsToInvoke[1]);
                                });
                                this.onloadCallbacks.forEach(callback => callback(undefined));
                            }
                            else if (browserMessage.messageType == 'response') {
                                const replyId = browserMessage.message.replyId;
                                if (replyId && this.messageResponsePromises.has(replyId)) {
                                    this.messageResponsePromises.get(replyId)(browserMessage.message.response);
                                    this.messageResponsePromises.delete(replyId);
                                }
                            }
                            else {
                                const callbacks = this.messageCallbacks.get(browserMessage.messageType);
                                if (callbacks) {
                                    callbacks.forEach(callback => {
                                        if ((!callback.viewId) || callback.viewId == browserMessage.target)
                                            callback.callback(browserMessage.message);
                                    });
                                }
                            }
                        }
                    });
                }
            };
            exports_6("default", WebViewHost);
        }
    };
});
/*
 * Skyrim Platform Backend
 */
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/src/Module/src/WebUI/WebView", [], function (exports_7, context_7) {
    "use strict";
    var WebView;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            WebView = class WebView {
                // like client side, allow providing a webhost to the constructor - for unit testing etc
                constructor(params) {
                    this.id = params.id.toLowerCase();
                    this.url = params.url;
                    this.host = params.host;
                    this.isMenu = params.isMenu;
                    if (params.position)
                        this.position = params.position;
                    else
                        this.position = { x: 0, y: 0, width: 100, height: 100 }; // full screen
                }
                addToUI() {
                    this.host.addToUI(this);
                }
                removeFromUI() {
                    this.host.removeFromUI(this.id);
                }
                toggleUI() {
                    this.host.toggleUI(this);
                }
                on(messageType, callback) {
                    this.host.on(messageType, this.id, callback);
                }
                send(messageType, message) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (!message.target)
                            message.target = this.id;
                        if (!message.source)
                            message.source = this.id;
                        return this.host.send(messageType, this.id, message);
                    });
                }
                reply(request, response) {
                    this.host.reply(request, this.id, response);
                }
            };
            exports_7("default", WebView);
        }
    };
});
