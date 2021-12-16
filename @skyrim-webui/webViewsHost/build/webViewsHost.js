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
        this.iframes = new Map();
    }
    getWebViewIds(replyId) {
        this.reply(replyId, Array.from(this.webViews.keys()));
    }
    registerWebView(webView) {
        this.webViews.set(webView.id, webView);
    }
    unregisterWebView(id) {
        this.removeFromUI(id);
        this.webViews.delete(id);
    }
    getWebView(replyId, id) {
        this.reply(replyId, this.webViews.get(id));
    }
    addToUI(id) {
        const webView = this.webViews.get(id);
        if (webView && !this.iframes.has(webView.id)) {
            const iframe = document.createElement('iframe');
            this.iframes.set(id, iframe);
            iframe.src = webView.url;
            iframe.dataset.webviewId = id;
            document.body.appendChild(iframe);
        }
    }
    removeFromUI(id) {
        if (this.iframes.has(id)) {
            document.body.removeChild(this.iframes.get(id));
            this.iframes.delete(id);
        }
    }
    isInUI(replyId, id) {
        this.reply(replyId, this.iframes.has(id));
    }
    reply(replyId, data) {
        window.skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViVmlld3NIb3N0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE1BQXFCLFlBQVk7SUFBakM7UUFDWSxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW1CO1FBQ3JDLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBNkI7SUE0QzFELENBQUM7SUExQ0csYUFBYSxDQUFDLE9BQWU7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFnQjtRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQztJQUMxQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBVTtRQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUFlLEVBQUUsRUFBVTtRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsT0FBTyxDQUFDLEVBQVU7UUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDckMsSUFBSSxPQUFPLElBQUksQ0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDM0MsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQztZQUM1QixNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHO1lBQ3hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEVBQUU7WUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxFQUFVO1FBQ25CLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDdEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFlLEVBQUUsRUFBVTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU8sS0FBSyxDQUFDLE9BQWUsRUFBRSxJQUFTO1FBQ25DLE1BQWMsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDakYsQ0FBQztDQUNKO0FBOUNELGtDQThDQzs7Ozs7OztVQ2hERDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7QUN0QkEsMEZBQXlDO0FBRXhDLE1BQWMsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLHNCQUFZLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0Bza3lyaW0td2VidWkvd2ViVmlld3NIb3N0Ly4vc3JjL1dlYlZpZXdzSG9zdC50cyIsIndlYnBhY2s6Ly9Ac2t5cmltLXdlYnVpL3dlYlZpZXdzSG9zdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Ac2t5cmltLXdlYnVpL3dlYlZpZXdzSG9zdC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViVmlldyBmcm9tICcuL1dlYlZpZXcnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJWaWV3c0hvc3Qge1xyXG4gICAgcHJpdmF0ZSB3ZWJWaWV3cyA9IG5ldyBNYXA8c3RyaW5nLCBXZWJWaWV3PigpXHJcbiAgICBwcml2YXRlIGlmcmFtZXMgPSBuZXcgTWFwPHN0cmluZywgSFRNTElGcmFtZUVsZW1lbnQ+KClcclxuXHJcbiAgICBnZXRXZWJWaWV3SWRzKHJlcGx5SWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVwbHkocmVwbHlJZCwgQXJyYXkuZnJvbSh0aGlzLndlYlZpZXdzLmtleXMoKSkpXHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJXZWJWaWV3KHdlYlZpZXc6IFdlYlZpZXcpIHtcclxuICAgICAgICB0aGlzLndlYlZpZXdzLnNldCh3ZWJWaWV3LmlkLCB3ZWJWaWV3KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1bnJlZ2lzdGVyV2ViVmlldyhpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tVUkoaWQpXHJcbiAgICAgICAgdGhpcy53ZWJWaWV3cy5kZWxldGUoaWQpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0V2ViVmlldyhyZXBseUlkOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJlcGx5KHJlcGx5SWQsIHRoaXMud2ViVmlld3MuZ2V0KGlkKSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb1VJKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCB3ZWJWaWV3ID0gdGhpcy53ZWJWaWV3cy5nZXQoaWQpXHJcbiAgICAgICAgaWYgKHdlYlZpZXcgJiYgISB0aGlzLmlmcmFtZXMuaGFzKHdlYlZpZXcuaWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpXHJcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lcy5zZXQoaWQsIGlmcmFtZSlcclxuICAgICAgICAgICAgaWZyYW1lLnNyYyA9IHdlYlZpZXcudXJsXHJcbiAgICAgICAgICAgIGlmcmFtZS5kYXRhc2V0LndlYnZpZXdJZCA9IGlkXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVGcm9tVUkoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmlmcmFtZXMuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuaWZyYW1lcy5nZXQoaWQpISlcclxuICAgICAgICAgICAgdGhpcy5pZnJhbWVzLmRlbGV0ZShpZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNJblVJKHJlcGx5SWQ6IHN0cmluZywgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVwbHkocmVwbHlJZCwgdGhpcy5pZnJhbWVzLmhhcyhpZCkpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXBseShyZXBseUlkOiBzdHJpbmcsIGRhdGE6IGFueSkge1xyXG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5za3lyaW1QbGF0Zm9ybS5zZW5kTWVzc2FnZShbJ1dlYlVJJywgJ1JlcGx5JywgcmVwbHlJZCwgZGF0YV0pXHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCBXZWJWaWV3c0hvc3QgZnJvbSAnLi9XZWJWaWV3c0hvc3QnXHJcblxyXG4od2luZG93IGFzIGFueSkuX193ZWJWaWV3c0hvc3RfXyA9IG5ldyBXZWJWaWV3c0hvc3QoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=