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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViVmlld3NIb3N0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE1BQXFCLFlBQVk7SUFBakM7UUFDWSxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW1CO1FBQ3JDLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBNkI7SUEyQzFELENBQUM7SUF6Q0csYUFBYSxDQUFDLE9BQWU7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFnQjtRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQztJQUMxQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBVTtRQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxPQUFlLEVBQUUsRUFBVTtRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsT0FBTyxDQUFDLEVBQVU7UUFDZCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDckMsSUFBSSxPQUFPLElBQUksQ0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDM0MsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQztZQUM1QixNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHO1lBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsRUFBVTtRQUNuQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBRSxDQUFDO1lBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBZSxFQUFFLEVBQVU7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLEtBQUssQ0FBQyxPQUFlLEVBQUUsSUFBUztRQUNuQyxNQUFjLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pGLENBQUM7Q0FDSjtBQTdDRCxrQ0E2Q0M7Ozs7Ozs7VUMvQ0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7O0FDdEJBLDBGQUF5QztBQUV4QyxNQUFjLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxzQkFBWSxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ac2t5cmltLXdlYnVpL3dlYlZpZXdzSG9zdC8uL3NyYy9XZWJWaWV3c0hvc3QudHMiLCJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS93ZWJWaWV3c0hvc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS93ZWJWaWV3c0hvc3QvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdlYlZpZXcgZnJvbSAnLi9XZWJWaWV3J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViVmlld3NIb3N0IHtcclxuICAgIHByaXZhdGUgd2ViVmlld3MgPSBuZXcgTWFwPHN0cmluZywgV2ViVmlldz4oKVxyXG4gICAgcHJpdmF0ZSBpZnJhbWVzID0gbmV3IE1hcDxzdHJpbmcsIEhUTUxJRnJhbWVFbGVtZW50PigpXHJcblxyXG4gICAgZ2V0V2ViVmlld0lkcyhyZXBseUlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJlcGx5KHJlcGx5SWQsIEFycmF5LmZyb20odGhpcy53ZWJWaWV3cy5rZXlzKCkpKVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyV2ViVmlldyh3ZWJWaWV3OiBXZWJWaWV3KSB7XHJcbiAgICAgICAgdGhpcy53ZWJWaWV3cy5zZXQod2ViVmlldy5pZCwgd2ViVmlldylcclxuICAgIH1cclxuICAgIFxyXG4gICAgdW5yZWdpc3RlcldlYlZpZXcoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVVJKGlkKVxyXG4gICAgICAgIHRoaXMud2ViVmlld3MuZGVsZXRlKGlkKVxyXG4gICAgfVxyXG5cclxuICAgIGdldFdlYlZpZXcocmVwbHlJZDogc3RyaW5nLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZXBseShyZXBseUlkLCB0aGlzLndlYlZpZXdzLmdldChpZCkpXHJcbiAgICB9XHJcblxyXG4gICAgYWRkVG9VSShpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgd2ViVmlldyA9IHRoaXMud2ViVmlld3MuZ2V0KGlkKVxyXG4gICAgICAgIGlmICh3ZWJWaWV3ICYmICEgdGhpcy5pZnJhbWVzLmhhcyh3ZWJWaWV3LmlkKSkge1xyXG4gICAgICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKVxyXG4gICAgICAgICAgICB0aGlzLmlmcmFtZXMuc2V0KGlkLCBpZnJhbWUpXHJcbiAgICAgICAgICAgIGlmcmFtZS5zcmMgPSB3ZWJWaWV3LnVybFxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlRnJvbVVJKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5pZnJhbWVzLmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLmlmcmFtZXMuZ2V0KGlkKSEpXHJcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lcy5kZWxldGUoaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzSW5VSShyZXBseUlkOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJlcGx5KHJlcGx5SWQsIHRoaXMuaWZyYW1lcy5oYXMoaWQpKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVwbHkocmVwbHlJZDogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICAod2luZG93IGFzIGFueSkuc2t5cmltUGxhdGZvcm0uc2VuZE1lc3NhZ2UoWydXZWJVSScsICdSZXBseScsIHJlcGx5SWQsIGRhdGFdKVxyXG4gICAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgV2ViVmlld3NIb3N0IGZyb20gJy4vV2ViVmlld3NIb3N0J1xyXG5cclxuKHdpbmRvdyBhcyBhbnkpLl9fd2ViVmlld3NIb3N0X18gPSBuZXcgV2ViVmlld3NIb3N0KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9