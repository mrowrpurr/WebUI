/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/WebViewsHost.ts":
/*!*****************************!*\
  !*** ./src/WebViewsHost.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class WebViewsHost {
    constructor() {
        this.webViews = new Map();
    }
    reply(replyId, data) {
        window.skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data]);
    }
    getWebViewIds(replyId) {
        this.reply(replyId, Array.from(this.webViews.keys()));
    }
    registerWebView(webView) {
        this.webViews.set(webView.id, webView);
    }
}
exports["default"] = WebViewsHost;


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const WebViewsHost_1 = __webpack_require__(/*! ./WebViewsHost */ "./src/WebViewsHost.ts");
window.__webViewsHost__ = new WebViewsHost_1.default();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViVmlld3NIb3N0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE1BQXFCLFlBQVk7SUFBakM7UUFDSSxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW1CO0lBYXpDLENBQUM7SUFYRyxLQUFLLENBQUMsT0FBZSxFQUFFLElBQVM7UUFDM0IsTUFBYyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRU0sYUFBYSxDQUFDLE9BQWU7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVNLGVBQWUsQ0FBQyxPQUFnQjtRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQztJQUMxQyxDQUFDO0NBQ0o7QUFkRCxrQ0FjQzs7Ozs7OztVQ2hCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7QUN0QkEsMEZBQXlDO0FBRXhDLE1BQWMsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLHNCQUFZLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ac2t5cmltLXdlYnVpL3dlYlZpZXdzSG9zdC8uL3NyYy9XZWJWaWV3c0hvc3QudHMiLCJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS93ZWJWaWV3c0hvc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS93ZWJWaWV3c0hvc3QvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYlZpZXcgZnJvbSAnLi9XZWJWaWV3J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViVmlld3NIb3N0IHtcclxuICAgIHdlYlZpZXdzID0gbmV3IE1hcDxzdHJpbmcsIFdlYlZpZXc+KClcclxuXHJcbiAgICByZXBseShyZXBseUlkOiBzdHJpbmcsIGRhdGE6IGFueSkge1xyXG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5za3lyaW1QbGF0Zm9ybS5zZW5kTWVzc2FnZShbJ1dlYlVJJywgJ1JlcGx5JywgcmVwbHlJZCwgZGF0YV0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFdlYlZpZXdJZHMocmVwbHlJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZXBseShyZXBseUlkLCBBcnJheS5mcm9tKHRoaXMud2ViVmlld3Mua2V5cygpKSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJXZWJWaWV3KHdlYlZpZXc6IFdlYlZpZXcpIHtcclxuICAgICAgICB0aGlzLndlYlZpZXdzLnNldCh3ZWJWaWV3LmlkLCB3ZWJWaWV3KVxyXG4gICAgfVxyXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCBXZWJWaWV3c0hvc3QgZnJvbSAnLi9XZWJWaWV3c0hvc3QnXHJcblxyXG4od2luZG93IGFzIGFueSkuX193ZWJWaWV3c0hvc3RfXyA9IG5ldyBXZWJWaWV3c0hvc3QoKVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=