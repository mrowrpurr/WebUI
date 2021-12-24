(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('skyrimPlatform')) :
	typeof define === 'function' && define.amd ? define(['skyrimPlatform'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.require$$1));
})(this, (function (require$$1) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var dist = {};

	var WebViewsHostClient$1 = {};

	var __awaiter$1 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(WebViewsHostClient$1, "__esModule", { value: true });
	class WebViewsHostClient {
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
	        return __awaiter$1(this, void 0, void 0, function* () {
	            return this.getResponse('getWebViewIds');
	        });
	    }
	    getWebView(id) {
	        return __awaiter$1(this, void 0, void 0, function* () {
	            return this.getResponse('getWebView', id);
	        });
	    }
	    addToUI(id) {
	        this.sendRequest('addToUI', id);
	    }
	    getResponse(functionName, ...args) {
	        return __awaiter$1(this, void 0, void 0, function* () {
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
	}
	WebViewsHostClient$1.default = WebViewsHostClient;

	var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	Object.defineProperty(dist, "__esModule", { value: true });
	dist.getWebViewIds = dist.registerWebView = getWebViewsHostClient_1 = dist.getWebViewsHostClient = void 0;
	const WebViewsHostClient_1 = WebViewsHostClient$1;
	const skyrimPlatform_1 = require$$1__default["default"];
	const webViewsHostClient$1 = new WebViewsHostClient_1.default((script) => { skyrimPlatform_1.browser.executeJavaScript(script); });
	(0, skyrimPlatform_1.on)('browserMessage', message => {
	    webViewsHostClient$1.onBrowserMessage(message.arguments);
	});
	function getWebViewsHostClient() {
	    return webViewsHostClient$1;
	}
	var getWebViewsHostClient_1 = dist.getWebViewsHostClient = getWebViewsHostClient;
	function registerWebView(webView) {
	    getWebViewsHostClient().registerWebView(webView);
	}
	dist.registerWebView = registerWebView;
	function getWebViewIds() {
	    return __awaiter(this, void 0, void 0, function* () {
	        return getWebViewsHostClient().getWebViewIds();
	    });
	}
	dist.getWebViewIds = getWebViewIds;

	var webViewsHostClient = getWebViewsHostClient_1();
	webViewsHostClient.registerWebView({
	    id: "widget1",
	    url: "http://localhost:8080/src/fixtures/examples/widget1/frontend/"
	});
	webViewsHostClient.addToUI("widget1");

}));
