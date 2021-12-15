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
    getWebViewIds(replyId) {
        this.reply(replyId, Array.from(this.webViews.keys()));
    }
    registerWebView(webView) {
        this.webViews.set(webView.id, webView);
    }
    unregisterWebView(id) {
        // TODO remove from the UI if present
        this.webViews.delete(id);
    }
    getWebView(replyId, id) {
        this.reply(replyId, this.webViews.get(id));
    }
    addToUI(id) {
        const webView = this.webViews.get(id);
        if (webView) {
            const iframe = document.createElement('iframe');
            iframe.src = webView.url;
            document.body.appendChild(iframe);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViVmlld3NIb3N0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE1BQXFCLFlBQVk7SUFBakM7UUFDSSxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW1CO0lBK0J6QyxDQUFDO0lBN0JVLGFBQWEsQ0FBQyxPQUFlO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSxlQUFlLENBQUMsT0FBZ0I7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUM7SUFDMUMsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEVBQVU7UUFDL0IscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sVUFBVSxDQUFDLE9BQWUsRUFBRSxFQUFVO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxPQUFPLENBQUMsRUFBVTtRQUNyQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDckMsSUFBSSxPQUFPLEVBQUU7WUFDVCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUMvQyxNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHO1lBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBZSxFQUFFLElBQVM7UUFDM0IsTUFBYyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRixDQUFDO0NBQ0o7QUFoQ0Qsa0NBZ0NDOzs7Ozs7O1VDbENEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQSwwRkFBeUM7QUFFeEMsTUFBYyxDQUFDLGdCQUFnQixHQUFHLElBQUksc0JBQVksRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS93ZWJWaWV3c0hvc3QvLi9zcmMvV2ViVmlld3NIb3N0LnRzIiwid2VicGFjazovL0Bza3lyaW0td2VidWkvd2ViVmlld3NIb3N0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0Bza3lyaW0td2VidWkvd2ViVmlld3NIb3N0Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWJWaWV3IGZyb20gJy4vV2ViVmlldydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlZpZXdzSG9zdCB7XHJcbiAgICB3ZWJWaWV3cyA9IG5ldyBNYXA8c3RyaW5nLCBXZWJWaWV3PigpXHJcblxyXG4gICAgcHVibGljIGdldFdlYlZpZXdJZHMocmVwbHlJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZXBseShyZXBseUlkLCBBcnJheS5mcm9tKHRoaXMud2ViVmlld3Mua2V5cygpKSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJXZWJWaWV3KHdlYlZpZXc6IFdlYlZpZXcpIHtcclxuICAgICAgICB0aGlzLndlYlZpZXdzLnNldCh3ZWJWaWV3LmlkLCB3ZWJWaWV3KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgdW5yZWdpc3RlcldlYlZpZXcoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIC8vIFRPRE8gcmVtb3ZlIGZyb20gdGhlIFVJIGlmIHByZXNlbnRcclxuICAgICAgICB0aGlzLndlYlZpZXdzLmRlbGV0ZShpZClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2ViVmlldyhyZXBseUlkOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJlcGx5KHJlcGx5SWQsIHRoaXMud2ViVmlld3MuZ2V0KGlkKSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkVG9VSShpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3Qgd2ViVmlldyA9IHRoaXMud2ViVmlld3MuZ2V0KGlkKVxyXG4gICAgICAgIGlmICh3ZWJWaWV3KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpXHJcbiAgICAgICAgICAgIGlmcmFtZS5zcmMgPSB3ZWJWaWV3LnVybFxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVwbHkocmVwbHlJZDogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICAod2luZG93IGFzIGFueSkuc2t5cmltUGxhdGZvcm0uc2VuZE1lc3NhZ2UoWydXZWJVSScsICdSZXBseScsIHJlcGx5SWQsIGRhdGFdKVxyXG4gICAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJpbXBvcnQgV2ViVmlld3NIb3N0IGZyb20gJy4vV2ViVmlld3NIb3N0J1xyXG5cclxuKHdpbmRvdyBhcyBhbnkpLl9fd2ViVmlld3NIb3N0X18gPSBuZXcgV2ViVmlld3NIb3N0KCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9