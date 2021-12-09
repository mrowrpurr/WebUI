var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-namespace */
// Generated automatically. Do not edit.
System.register("Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/papyrusBridge", ["Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform"], function (exports_2, context_2) {
    "use strict";
    var skyrimPlatform_1, sp, skyrimPlatformBridgeEsp, skyrimPlatformBridgeMessagesContainerId, skyrimPlatformBridgeQuestId, skseModEventNamePrefix_ModEvent, skseModEventNamePrefix_GlobalEvent, skseModEventNamePrefix_Response, skyrimPlatformBridgeEventMessageDelimiter, messagePrefix_Event, messagePrefix_Request, messagePrefix_Response, skyrimPlatformBridgeJsonDataPrefix, skyrimPlatformBridgeConnectionRequestQueryName, skyrimPlatformBridgeConnectionRequestResponseText, messageTypePrefixes, SkseModEvent, PapyrusBridge, defaultInstance;
    var __moduleName = context_2 && context_2.id;
    function getVersion() {
        return '1.0';
    }
    exports_2("getVersion", getVersion);
    function getConnection(connectionName) {
        return new PapyrusBridge(connectionName);
    }
    exports_2("getConnection", getConnection);
    function getPapyrusConnection(connectionName) {
        return new PapyrusBridge(connectionName);
    }
    exports_2("getPapyrusConnection", getPapyrusConnection);
    return {
        setters: [
            function (skyrimPlatform_1_1) {
                skyrimPlatform_1 = skyrimPlatform_1_1;
                sp = skyrimPlatform_1_1;
            }
        ],
        execute: function () {
            skyrimPlatformBridgeEsp = 'SkyrimPlatformBridge.esp';
            skyrimPlatformBridgeMessagesContainerId = 0xd66;
            skyrimPlatformBridgeQuestId = 0x800;
            skseModEventNamePrefix_ModEvent = 'SkyrimPlatformBridge_Event_'; // Target a particular mod
            skseModEventNamePrefix_GlobalEvent = 'SkyrimPlatformBridge_Event_'; // Globally subscribe/publish
            skseModEventNamePrefix_Response = 'SkyrimPlatformBridge_Response_'; // Reserved for Response/Reply management
            skyrimPlatformBridgeEventMessageDelimiter = '<||>';
            messagePrefix_Event = '::SKYRIM_PLATFORM_BRIDGE_EVENT::';
            messagePrefix_Request = '::SKYRIM_PLATFORM_BRIDGE_REQUEST::';
            messagePrefix_Response = '::SKYRIM_PLATFORM_BRIDGE_RESPONSE::';
            skyrimPlatformBridgeJsonDataPrefix = '::SKYRIM_PLATFORM_BRIDGE_JSON::';
            skyrimPlatformBridgeConnectionRequestQueryName = 'SkyrimPlatformBridge_ConnectionRequest'.toLowerCase();
            skyrimPlatformBridgeConnectionRequestResponseText = 'CONNECTED';
            messageTypePrefixes = new Map([
                [messagePrefix_Event, 'event'],
                [messagePrefix_Request, 'request'],
                [messagePrefix_Response, 'response']
            ]);
            // TODO
            SkseModEvent = class SkseModEvent {
            };
            exports_2("SkseModEvent", SkseModEvent);
            PapyrusBridge = class PapyrusBridge {
                constructor(connectionName = '') {
                    this.activeConnections = new Set();
                    this.connectionName = '';
                    this.messagesContainerFormId = 0;
                    this.questFormId = 0;
                    this.isConnected = false;
                    this.isListening = false;
                    this.requestCallbacks = new Array();
                    this.eventCallbacks = new Array();
                    this.connectionCallbacks = new Array();
                    this.requestResponsePromises = new Map();
                    this.connectionName = connectionName.toLowerCase();
                }
                getConnection(connectionName) {
                    return new PapyrusBridge(connectionName.toLowerCase());
                }
                getConnectionName() {
                    var _a;
                    return (_a = this.connectionName) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                }
                onRequest(callback) {
                    this.listen();
                    this.requestCallbacks.push(callback);
                }
                onEvent(callback) {
                    this.listen();
                    this.eventCallbacks.push(callback);
                }
                onConnected(callback) {
                    this.listen();
                    this.connectionCallbacks.push(callback);
                }
                listen() {
                    if (!this.isListening) {
                        this.isListening = true;
                        skyrimPlatform_1.on('containerChanged', changeInfo => {
                            const container = changeInfo.newContainer || changeInfo.oldContainer;
                            if (container) {
                                this.setMessagesContainerFormId();
                                if (this.messagesContainerFormId && this.messagesContainerFormId == container.getFormID()) {
                                    const messageText = changeInfo.baseObj.getName();
                                    if (messageText) {
                                        const messageType = this.getMessageType(messageText);
                                        if (messageType) {
                                            const message = this.parse(messageType, messageText);
                                            if (message) {
                                                this._onPapyrusMessage(messageType, message);
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
                send(eventName, data, target, source) {
                    this._sendEvent({ eventName, data, target, source });
                }
                request(query, data, target, source) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return this._makeRequest({
                            query, data, target, source
                        });
                    });
                }
                _sendModEvent(skseModEventName, parameterBuilder) {
                    skyrimPlatform_1.once('update', () => {
                        let quest = null;
                        if (!this.questFormId) {
                            quest = skyrimPlatform_1.Game.getFormFromFile(skyrimPlatformBridgeQuestId, skyrimPlatformBridgeEsp);
                            if (quest) {
                                this.questFormId = quest.getFormID();
                            }
                        }
                        if (!quest) {
                            // Todo: cache object (and *handle stale errors*)
                            quest = skyrimPlatform_1.Game.getFormFromFile(skyrimPlatformBridgeQuestId, skyrimPlatformBridgeEsp);
                        }
                        if (quest) {
                            const handle = sp.ModEvent.create(skseModEventName);
                            if (handle) {
                                const modEvent = sp.ModEvent;
                                const handle = modEvent.Create(skseModEventName);
                                parameterBuilder(modEvent, handle);
                                modEvent.send(handle);
                            }
                        }
                        else {
                            skyrimPlatform_1.writeLogs('papyrusBridge', `Could not send message, Quest object ${skyrimPlatformBridgeQuestId.toString(16)} not found.`);
                        }
                    });
                }
                _sendEvent(event) {
                    const messageToSend = this._prepareMessageForSending('event', event);
                    if (messageToSend) {
                        this._sendModEvent(messageToSend.skseModEventName, (modEvent, handle) => {
                            modEvent.pushString(handle, messageToSend.messageType);
                            modEvent.pushString(handle, messageToSend.eventNameOrQuery);
                            modEvent.pushString(handle, messageToSend.source);
                            modEvent.pushString(handle, messageToSend.target);
                            modEvent.pushString(handle, messageToSend.dataText);
                            modEvent.pushString(handle, messageToSend.replyId);
                        });
                    }
                }
                _makeRequest(request) {
                    return __awaiter(this, void 0, void 0, function* () {
                        return new Promise(resolve => {
                            try {
                                const messageToSend = this._prepareMessageForSending('request', request);
                                if (messageToSend) {
                                    if (!messageToSend.replyId)
                                        messageToSend.replyId = this.getUniqueReplyId();
                                    this.requestResponsePromises.set(messageToSend.replyId, resolve);
                                    this._sendModEvent(messageToSend.skseModEventName, (modEvent, handle) => {
                                        modEvent.pushString(handle, messageToSend.messageType);
                                        modEvent.pushString(handle, messageToSend.eventNameOrQuery);
                                        modEvent.pushString(handle, messageToSend.source);
                                        modEvent.pushString(handle, messageToSend.target);
                                        modEvent.pushString(handle, messageToSend.dataText);
                                        modEvent.pushString(handle, messageToSend.replyId);
                                    });
                                }
                                else {
                                    resolve(undefined);
                                }
                            }
                            catch (_a) {
                                resolve(undefined);
                            }
                        });
                    });
                }
                _sendResponse(response) {
                    const messageToSend = this._prepareMessageForSending('response', response);
                    if (messageToSend) {
                        this._sendModEvent(messageToSend.skseModEventName, (modEvent, handle) => {
                            modEvent.pushString(handle, messageToSend.replyId);
                            modEvent.pushString(handle, messageToSend.dataText);
                        });
                    }
                }
                _prepareMessageForSending(messageType, message) {
                    var _a, _b, _c, _d;
                    const target = (_b = (_a = message.target) !== null && _a !== void 0 ? _a : this.connectionName) !== null && _b !== void 0 ? _b : '';
                    if (!target) {
                        skyrimPlatform_1.once('update', () => {
                            skyrimPlatform_1.writeLogs('papyrusBridge', `[PapyrusBridge] Tried sending event to null target ${JSON.stringify(message)}`);
                        });
                        return;
                    }
                    const source = (_d = (_c = message.source) !== null && _c !== void 0 ? _c : this.connectionName) !== null && _d !== void 0 ? _d : '';
                    let data;
                    switch (messageType) {
                        case 'event': {
                            data = message.data;
                            break;
                        }
                        case 'request': {
                            data = message.data;
                            break;
                        }
                        case 'response': {
                            data = message.data;
                            break;
                        }
                    }
                    let dataText = '';
                    if (typeof data === 'string')
                        dataText = data.toString();
                    else if (data === undefined)
                        dataText = '';
                    else
                        dataText = `${skyrimPlatformBridgeJsonDataPrefix}${JSON.stringify(data)}`;
                    let eventNameOrQuery = '';
                    switch (messageType) {
                        case 'event': {
                            eventNameOrQuery = message.eventName;
                            break;
                        }
                        case 'request': {
                            eventNameOrQuery = message.query;
                            break;
                        }
                    }
                    let skseModEventName = `${skseModEventNamePrefix_ModEvent}${target}`;
                    if (messageType == 'response')
                        skseModEventName = `${skseModEventNamePrefix_Response}${message.replyId}`;
                    return { skseModEventName, messageType, eventNameOrQuery, source, target, dataText, replyId: message.replyId };
                }
                parse(messageType, message) {
                    const eventParts = message.split(skyrimPlatformBridgeEventMessageDelimiter);
                    if (eventParts.length < 4)
                        return;
                    switch (messageType) {
                        case 'event': {
                            return { eventName: eventParts[1].toLowerCase(), source: eventParts[2].toLowerCase(), target: eventParts[3].toLowerCase(), data: eventParts.slice(5).join('||') };
                        }
                        case 'request': {
                            return { query: eventParts[1].toLowerCase(), source: eventParts[2].toLowerCase(), target: eventParts[3].toLowerCase(), replyId: eventParts[4].toLowerCase(), data: eventParts.slice(5).join('||') };
                        }
                        case 'response': {
                            return { source: eventParts[2].toLowerCase(), target: eventParts[3].toLowerCase(), replyId: eventParts[4].toLowerCase(), data: eventParts.slice(5).join('||') };
                        }
                    }
                }
                getMessageType(receivedText) {
                    let messageType;
                    messageTypePrefixes.forEach((type, prefix) => {
                        if (receivedText.startsWith(prefix)) {
                            messageType = type;
                        }
                    });
                    return messageType;
                }
                getUniqueReplyId() {
                    return `${Math.random()}_${Math.random()}`;
                }
                _onPapyrusMessage(messageType, message) {
                    switch (messageType) {
                        case 'event': {
                            this._onEvent(message);
                            break;
                        }
                        case 'request': {
                            this._onRequest(message);
                            break;
                        }
                        case 'response': {
                            this._onResponse(message);
                            break;
                        }
                    }
                }
                _onEvent(event) {
                    this.eventCallbacks.forEach(callback => callback(event));
                }
                _onRequest(request) {
                    if (request.query == skyrimPlatformBridgeConnectionRequestQueryName) {
                        this._onConnectedRequest(request);
                    }
                    else {
                        this.requestCallbacks.forEach(callback => {
                            callback(request, (data) => {
                                this._sendResponse({
                                    replyId: request.replyId,
                                    data
                                });
                            });
                        });
                    }
                }
                _onConnectedRequest(request) {
                    if ((!this.connectionName) || this.connectionName == request.source) {
                        this._sendResponse({ data: skyrimPlatformBridgeConnectionRequestResponseText, replyId: request.replyId });
                        if (this.connectionName && !this.isConnected) {
                            this.isConnected = true;
                        }
                        if (!this.activeConnections.has(request.source)) {
                            this.activeConnections.add(request.source);
                            this.connectionCallbacks.forEach(callback => callback(request.source));
                        }
                    }
                }
                _onResponse(response) {
                    if (response.replyId) {
                        if (this.requestResponsePromises.has(response.replyId)) {
                            this.requestResponsePromises.get(response.replyId)(response);
                            this.requestResponsePromises.delete(response.replyId);
                        }
                    }
                }
                setMessagesContainerFormId() {
                    if (!this.messagesContainerFormId) {
                        const messagesContainer = skyrimPlatform_1.Game.getFormFromFile(skyrimPlatformBridgeMessagesContainerId, skyrimPlatformBridgeEsp);
                        if (messagesContainer) {
                            this.messagesContainerFormId = messagesContainer.getFormID();
                        }
                    }
                }
            };
            exports_2("PapyrusBridge", PapyrusBridge);
            defaultInstance = new PapyrusBridge();
            exports_2("default", defaultInstance);
        }
    };
});
/*
 * Skyrim Platform Backend
 */
System.register("Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/WebUI/WebViewEvents", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/WebUI/ISkyrimPlatform", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/WebUI/MessageBox", ["Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform"], function (exports_5, context_5) {
    "use strict";
    var skyrimPlatform_2;
    var __moduleName = context_5 && context_5.id;
    function MessageBox(...args) {
        skyrimPlatform_2.once('update', () => {
            skyrimPlatform_2.Debug.messageBox(JSON.stringify(args));
        });
    }
    exports_5("default", MessageBox);
    return {
        setters: [
            function (skyrimPlatform_2_1) {
                skyrimPlatform_2 = skyrimPlatform_2_1;
            }
        ],
        execute: function () {
        }
    };
});
/*
 * Skyrim Platform Backend
 */
System.register("Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/WebUI/WebViewHost", ["Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform"], function (exports_6, context_6) {
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
System.register("Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/WebUI/WebView", [], function (exports_7, context_7) {
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
System.register("Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/WebUI/index", ["Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform", "Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/WebUI/WebView", "Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/WebUI/WebViewHost"], function (exports_8, context_8) {
    "use strict";
    var skyrimPlatform_4, sp, WebView_1, WebViewHost_1, _currentWebViewHost;
    var __moduleName = context_8 && context_8.id;
    function getWebViewHost() {
        if (!_currentWebViewHost)
            setWebViewHost(defaultWebViewHost());
        return _currentWebViewHost;
    }
    exports_8("getWebViewHost", getWebViewHost);
    function setWebViewHost(host) {
        _currentWebViewHost = host;
        return host;
    }
    exports_8("setWebViewHost", setWebViewHost);
    function defaultWebViewHost() {
        return new WebViewHost_1.default({ skyrimPlatform: {
                browser: skyrimPlatform_4.browser,
                // onBrowserMessage: on,
                onBrowserMessage: (eventName, callback) => {
                    skyrimPlatform_4.on('browserMessage', message => {
                        skyrimPlatform_4.once('update', () => {
                            callback(message);
                        });
                    });
                },
                onceUpdate: (eventName, callback) => {
                    skyrimPlatform_4.once('update', () => {
                        callback();
                    });
                }
            } });
    }
    exports_8("defaultWebViewHost", defaultWebViewHost);
    function getWebView(id) {
        return getWebViewHost().getWebView(id);
    }
    exports_8("getWebView", getWebView);
    function registerWebView(params) {
        const host = getWebViewHost();
        const webView = new WebView_1.default(Object.assign({ host }, params));
        host.addWebView(webView);
        return webView;
    }
    exports_8("registerWebView", registerWebView);
    function reloadAllJsonDefinitions() {
        skyrimPlatform_4.once('update', () => {
            const modEvent = sp.ModEvent;
            const handle = modEvent.Create("WEBUI_RELOAD_JSON");
            modEvent.send(handle);
        });
    }
    exports_8("reloadAllJsonDefinitions", reloadAllJsonDefinitions);
    return {
        setters: [
            function (skyrimPlatform_4_1) {
                skyrimPlatform_4 = skyrimPlatform_4_1;
                sp = skyrimPlatform_4_1;
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
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/src/PapyrusIntegration/index", ["Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/papyrusBridge", "Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/WebUI/index"], function (exports_9, context_9) {
    "use strict";
    var papyrusBridge_1, WebUI_1, papyrus;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (papyrusBridge_1_1) {
                papyrusBridge_1 = papyrusBridge_1_1;
            },
            function (WebUI_1_1) {
                WebUI_1 = WebUI_1_1;
            }
        ],
        execute: function () {
            papyrus = papyrusBridge_1.getConnection('WebUI');
            papyrus.onEvent(event => {
                let webViewId = '';
                let eventName = '';
                if (event.eventName.includes('::')) {
                    const [id, ...eventNameParts] = event.eventName.split('::');
                    eventName = eventNameParts.join('::');
                    webViewId = id;
                }
                else {
                    eventName = event.eventName;
                }
                switch (eventName) {
                    case 'registerwebview': {
                        const [id, url, x, y, width, height, isMenu, isVisible] = event.data.split('|');
                        const webView = WebUI_1.registerWebView({
                            id: id,
                            url: url,
                            position: { width: Number(width), height: Number(height), y: Number(y), x: Number(x) },
                            isMenu: isMenu.toLowerCase() == 'true'
                        });
                        if (isVisible.toLowerCase() == 'true')
                            webView.addToUI();
                        break;
                    }
                    case 'registerandshowwebview': {
                        const [id, url, x, y, width, height, isMenu] = event.data.split('|');
                        WebUI_1.registerWebView({
                            id: id,
                            url: url,
                            position: { width: Number(width), height: Number(height), y: Number(y), x: Number(x) },
                            isMenu: isMenu == 'true'
                        }).addToUI();
                        break;
                    }
                    case 'addtoui': {
                        const webView = WebUI_1.getWebView(webViewId);
                        if (webView)
                            webView.addToUI();
                        break;
                    }
                    case 'removefromui': {
                        const webView = WebUI_1.getWebView(webViewId);
                        if (webView)
                            webView.removeFromUI();
                        break;
                    }
                    case 'toggleui': {
                        const webView = WebUI_1.getWebView(webViewId);
                        if (webView)
                            webView.toggleUI();
                        break;
                    }
                    case 'refreshall': {
                        WebUI_1.getWebViewHost().refreshAll();
                        break;
                    }
                    default: {
                        const webView = WebUI_1.getWebView(webViewId);
                        if (webView)
                            webView.send('event', { eventName, data: event.data, target: webViewId });
                        break;
                    }
                }
            });
            papyrus.onRequest((request, reply) => __awaiter(void 0, void 0, void 0, function* () {
                const [webViewID, ...queryParts] = request.query.split('::');
                const query = queryParts.join('::');
                const webView = WebUI_1.getWebView(webViewID);
                if (webView) {
                    const response = yield webView.send('request', { query, data: request.query });
                    reply(response);
                }
                else {
                    reply(undefined);
                }
            }));
        }
    };
});
