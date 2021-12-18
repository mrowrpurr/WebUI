/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@skyrim-webui/backend/dist/WebViewsHostClient.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@skyrim-webui/backend/dist/WebViewsHostClient.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, exports) {


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
}
exports["default"] = WebViewsHostClient;
//# sourceMappingURL=WebViewsHostClient.js.map

/***/ }),

/***/ "./node_modules/@skyrim-webui/backend/dist/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@skyrim-webui/backend/dist/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.getWebViewIds = exports.registerWebView = exports.getWebViewsHostClient = void 0;
const WebViewsHostClient_1 = __webpack_require__(/*! ./WebViewsHostClient */ "./node_modules/@skyrim-webui/backend/dist/WebViewsHostClient.js");
const skyrimPlatform_1 = __webpack_require__(/*! skyrimPlatform */ "./node_modules/@skyrim-webui/backend/node_modules/skyrimPlatform/dist/index.js");
const webViewsHostClient = new WebViewsHostClient_1.default((script) => { skyrimPlatform_1.browser.executeJavaScript(script); });
(0, skyrimPlatform_1.on)('browserMessage', message => {
    webViewsHostClient.onBrowserMessage(message.arguments);
});
function getWebViewsHostClient() {
    return webViewsHostClient;
}
exports.getWebViewsHostClient = getWebViewsHostClient;
function registerWebView(webView) {
    getWebViewsHostClient().registerWebView(webView);
}
exports.registerWebView = registerWebView;
function getWebViewIds() {
    return __awaiter(this, void 0, void 0, function* () {
        return getWebViewsHostClient().getWebViewIds();
    });
}
exports.getWebViewIds = getWebViewIds;
// export function addToUI(id: string) {
//     getWebViewsHostClient().addToUI(id)
// }
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@skyrim-webui/backend/node_modules/skyrimPlatform/dist/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@skyrim-webui/backend/node_modules/skyrimPlatform/dist/index.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {


/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-namespace */
// Generated automatically. Do not edit.
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/skyrimPlatform/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/skyrimPlatform/dist/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {


/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-namespace */
// Generated automatically. Do not edit.
Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=index.js.map

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
const backend_1 = __webpack_require__(/*! @skyrim-webui/backend */ "./node_modules/@skyrim-webui/backend/dist/index.js");
const skyrimPlatform_1 = __webpack_require__(/*! skyrimPlatform */ "./node_modules/skyrimPlatform/dist/index.js");
(0, skyrimPlatform_1.once)('tick', () => {
    (0, skyrimPlatform_1.printConsole)('HELLO FROM WIDGET 1');
});
const webViewsHostClient = (0, backend_1.getWebViewsHostClient)();
webViewsHostClient.registerWebView({
    id: "widget1",
    url: "http://localhost:8080/src/testFixtures/examples/widget1/frontend/"
});
webViewsHostClient.addToUI("widget1");
// TODO: focus this!

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0MS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsMkNBQTJDLGFBQWEsR0FBRyxnREFBZ0Q7QUFDM0c7QUFDQTtBQUNBLGtCQUFrQixjQUFjLEdBQUcsY0FBYztBQUNqRDtBQUNBO0FBQ0Esa0JBQWU7QUFDZjs7Ozs7Ozs7OztBQy9EYTtBQUNiO0FBQ0EsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QscUJBQXFCLEdBQUcsdUJBQXVCLEdBQUcsNkJBQTZCO0FBQy9FLDZCQUE2QixtQkFBTyxDQUFDLDZGQUFzQjtBQUMzRCx5QkFBeUIsbUJBQU8sQ0FBQyxzR0FBZ0I7QUFDakQsMEVBQTBFLHFEQUFxRDtBQUMvSDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkNhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEOzs7Ozs7Ozs7O0FDTGE7QUFDYjtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Q7Ozs7OztVQ0xBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsa0JBQWtCLG1CQUFPLENBQUMsaUZBQXVCO0FBQ2pELHlCQUF5QixtQkFBTyxDQUFDLG1FQUFnQjtBQUNqRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJ1aS10ZXN0Zml4dHVyZXMtd2lkZ2V0MS8uL25vZGVfbW9kdWxlcy9Ac2t5cmltLXdlYnVpL2JhY2tlbmQvZGlzdC9XZWJWaWV3c0hvc3RDbGllbnQuanMiLCJ3ZWJwYWNrOi8vd2VidWktdGVzdGZpeHR1cmVzLXdpZGdldDEvLi9ub2RlX21vZHVsZXMvQHNreXJpbS13ZWJ1aS9iYWNrZW5kL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VidWktdGVzdGZpeHR1cmVzLXdpZGdldDEvLi9ub2RlX21vZHVsZXMvQHNreXJpbS13ZWJ1aS9iYWNrZW5kL25vZGVfbW9kdWxlcy9za3lyaW1QbGF0Zm9ybS9kaXN0L2luZGV4LmpzIiwid2VicGFjazovL3dlYnVpLXRlc3RmaXh0dXJlcy13aWRnZXQxLy4vbm9kZV9tb2R1bGVzL3NreXJpbVBsYXRmb3JtL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vd2VidWktdGVzdGZpeHR1cmVzLXdpZGdldDEvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VidWktdGVzdGZpeHR1cmVzLXdpZGdldDEvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5jbGFzcyBXZWJWaWV3c0hvc3RDbGllbnQge1xyXG4gICAgY29uc3RydWN0b3IoamF2YXNjcmlwdEV4ZWN1dG9yKSB7XHJcbiAgICAgICAgdGhpcy5yZXBseUNhbGxiYWNrcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLmV4ZWN1dGVKUyA9IGphdmFzY3JpcHRFeGVjdXRvcjtcclxuICAgIH1cclxuICAgIG9uQnJvd3Nlck1lc3NhZ2UobWVzc2FnZUFyZ3VtZW50cykge1xyXG4gICAgICAgIC8vIFsnV2ViVUknLCAnUmVwbHknLCByZXBseUlkLCBbJ015Q29vbFdlYlZpZXcnXV1cclxuICAgICAgICBpZiAobWVzc2FnZUFyZ3VtZW50cyAmJiBtZXNzYWdlQXJndW1lbnRzLmxlbmd0aCA9PSA0ICYmIG1lc3NhZ2VBcmd1bWVudHNbMF0gPT0gJ1dlYlVJJyAmJiBtZXNzYWdlQXJndW1lbnRzWzFdID09ICdSZXBseScpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVwbHlJZCA9IG1lc3NhZ2VBcmd1bWVudHNbMl07XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gbWVzc2FnZUFyZ3VtZW50c1szXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVwbHlDYWxsYmFja3MuaGFzKHJlcGx5SWQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcGx5Q2FsbGJhY2tzLmdldChyZXBseUlkKShyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcGx5Q2FsbGJhY2tzLmRlbGV0ZShyZXBseUlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlZ2lzdGVyV2ViVmlldyh3ZWJWaWV3KSB7XHJcbiAgICAgICAgdGhpcy5zZW5kUmVxdWVzdCgncmVnaXN0ZXJXZWJWaWV3Jywgd2ViVmlldyk7XHJcbiAgICB9XHJcbiAgICB1bnJlZ2lzdGVyV2ViVmlldyhpZCkge1xyXG4gICAgICAgIHRoaXMuc2VuZFJlcXVlc3QoJ3VucmVnaXN0ZXJXZWJWaWV3JywgaWQpO1xyXG4gICAgfVxyXG4gICAgZ2V0V2ViVmlld0lkcygpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRSZXNwb25zZSgnZ2V0V2ViVmlld0lkcycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0V2ViVmlldyhpZCkge1xyXG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlc3BvbnNlKCdnZXRXZWJWaWV3JywgaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgYWRkVG9VSShpZCkge1xyXG4gICAgICAgIHRoaXMuc2VuZFJlcXVlc3QoJ2FkZFRvVUknLCBpZCk7XHJcbiAgICB9XHJcbiAgICBnZXRSZXNwb25zZShmdW5jdGlvbk5hbWUsIC4uLmFyZ3MpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXBseUlkID0gdGhpcy5nZXRSZXBseUlkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcGx5Q2FsbGJhY2tzLnNldChyZXBseUlkLCByZXNvbHZlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZFJlcXVlc3QoZnVuY3Rpb25OYW1lLCByZXBseUlkLCAuLi5hcmdzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzZW5kUmVxdWVzdChmdW5jdGlvbk5hbWUsIC4uLmFyZ3MpIHtcclxuICAgICAgICB0aGlzLmV4ZWN1dGVKUyhgX193ZWJWaWV3c0hvc3RfXy4ke2Z1bmN0aW9uTmFtZX0oJHthcmdzLm1hcChhcmcgPT4gSlNPTi5zdHJpbmdpZnkoYXJnKSkuam9pbignLCAnKX0pYCk7XHJcbiAgICB9XHJcbiAgICBnZXRSZXBseUlkKCkge1xyXG4gICAgICAgIHJldHVybiBgJHtNYXRoLnJhbmRvbSgpfV8ke01hdGgucmFuZG9tKCl9YDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSBXZWJWaWV3c0hvc3RDbGllbnQ7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVdlYlZpZXdzSG9zdENsaWVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZ2V0V2ViVmlld0lkcyA9IGV4cG9ydHMucmVnaXN0ZXJXZWJWaWV3ID0gZXhwb3J0cy5nZXRXZWJWaWV3c0hvc3RDbGllbnQgPSB2b2lkIDA7XHJcbmNvbnN0IFdlYlZpZXdzSG9zdENsaWVudF8xID0gcmVxdWlyZShcIi4vV2ViVmlld3NIb3N0Q2xpZW50XCIpO1xyXG5jb25zdCBza3lyaW1QbGF0Zm9ybV8xID0gcmVxdWlyZShcInNreXJpbVBsYXRmb3JtXCIpO1xyXG5jb25zdCB3ZWJWaWV3c0hvc3RDbGllbnQgPSBuZXcgV2ViVmlld3NIb3N0Q2xpZW50XzEuZGVmYXVsdCgoc2NyaXB0KSA9PiB7IHNreXJpbVBsYXRmb3JtXzEuYnJvd3Nlci5leGVjdXRlSmF2YVNjcmlwdChzY3JpcHQpOyB9KTtcclxuKDAsIHNreXJpbVBsYXRmb3JtXzEub24pKCdicm93c2VyTWVzc2FnZScsIG1lc3NhZ2UgPT4ge1xyXG4gICAgd2ViVmlld3NIb3N0Q2xpZW50Lm9uQnJvd3Nlck1lc3NhZ2UobWVzc2FnZS5hcmd1bWVudHMpO1xyXG59KTtcclxuZnVuY3Rpb24gZ2V0V2ViVmlld3NIb3N0Q2xpZW50KCkge1xyXG4gICAgcmV0dXJuIHdlYlZpZXdzSG9zdENsaWVudDtcclxufVxyXG5leHBvcnRzLmdldFdlYlZpZXdzSG9zdENsaWVudCA9IGdldFdlYlZpZXdzSG9zdENsaWVudDtcclxuZnVuY3Rpb24gcmVnaXN0ZXJXZWJWaWV3KHdlYlZpZXcpIHtcclxuICAgIGdldFdlYlZpZXdzSG9zdENsaWVudCgpLnJlZ2lzdGVyV2ViVmlldyh3ZWJWaWV3KTtcclxufVxyXG5leHBvcnRzLnJlZ2lzdGVyV2ViVmlldyA9IHJlZ2lzdGVyV2ViVmlldztcclxuZnVuY3Rpb24gZ2V0V2ViVmlld0lkcygpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGdldFdlYlZpZXdzSG9zdENsaWVudCgpLmdldFdlYlZpZXdJZHMoKTtcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZ2V0V2ViVmlld0lkcyA9IGdldFdlYlZpZXdJZHM7XHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBhZGRUb1VJKGlkOiBzdHJpbmcpIHtcclxuLy8gICAgIGdldFdlYlZpZXdzSG9zdENsaWVudCgpLmFkZFRvVUkoaWQpXHJcbi8vIH1cclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9hZGphY2VudC1vdmVybG9hZC1zaWduYXR1cmVzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2UgKi9cclxuLy8gR2VuZXJhdGVkIGF1dG9tYXRpY2FsbHkuIERvIG5vdCBlZGl0LlxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvYWRqYWNlbnQtb3ZlcmxvYWQtc2lnbmF0dXJlcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlICovXHJcbi8vIEdlbmVyYXRlZCBhdXRvbWF0aWNhbGx5LiBEbyBub3QgZWRpdC5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgYmFja2VuZF8xID0gcmVxdWlyZShcIkBza3lyaW0td2VidWkvYmFja2VuZFwiKTtcclxuY29uc3Qgc2t5cmltUGxhdGZvcm1fMSA9IHJlcXVpcmUoXCJza3lyaW1QbGF0Zm9ybVwiKTtcclxuKDAsIHNreXJpbVBsYXRmb3JtXzEub25jZSkoJ3RpY2snLCAoKSA9PiB7XHJcbiAgICAoMCwgc2t5cmltUGxhdGZvcm1fMS5wcmludENvbnNvbGUpKCdIRUxMTyBGUk9NIFdJREdFVCAxJyk7XHJcbn0pO1xyXG5jb25zdCB3ZWJWaWV3c0hvc3RDbGllbnQgPSAoMCwgYmFja2VuZF8xLmdldFdlYlZpZXdzSG9zdENsaWVudCkoKTtcclxud2ViVmlld3NIb3N0Q2xpZW50LnJlZ2lzdGVyV2ViVmlldyh7XHJcbiAgICBpZDogXCJ3aWRnZXQxXCIsXHJcbiAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3NyYy90ZXN0Rml4dHVyZXMvZXhhbXBsZXMvd2lkZ2V0MS9mcm9udGVuZC9cIlxyXG59KTtcclxud2ViVmlld3NIb3N0Q2xpZW50LmFkZFRvVUkoXCJ3aWRnZXQxXCIpO1xyXG4vLyBUT0RPOiBmb2N1cyB0aGlzIVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=