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
            this.iframes.set(id, iframe);
            iframe.src = webView.url;
            document.body.appendChild(iframe);
        }
    }
    removeFromUI(id) {
        // replace this with new predicate method: isInUI()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViVmlld3NIb3N0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE1BQXFCLFlBQVk7SUFBakM7UUFDWSxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW1CO1FBQ3JDLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBNkI7SUE0QzFELENBQUM7SUExQ0csYUFBYSxDQUFDLE9BQWU7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFnQjtRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQztJQUMxQyxDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBVTtRQUN4QixxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxVQUFVLENBQUMsT0FBZSxFQUFFLEVBQVU7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELE9BQU8sQ0FBQyxFQUFVO1FBQ2QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ3JDLElBQUksT0FBTyxFQUFFO1lBQ1QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQztZQUM1QixNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHO1lBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsRUFBVTtRQUNuQixtREFBbUQ7UUFDbkQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUUsQ0FBQztZQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQWUsRUFBRSxFQUFVO1FBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTyxLQUFLLENBQUMsT0FBZSxFQUFFLElBQVM7UUFDbkMsTUFBYyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRixDQUFDO0NBQ0o7QUE5Q0Qsa0NBOENDOzs7Ozs7O1VDaEREO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQSwwRkFBeUM7QUFFeEMsTUFBYyxDQUFDLGdCQUFnQixHQUFHLElBQUksc0JBQVksRUFBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS93ZWJWaWV3c0hvc3QvLi9zcmMvV2ViVmlld3NIb3N0LnRzIiwid2VicGFjazovL0Bza3lyaW0td2VidWkvd2ViVmlld3NIb3N0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0Bza3lyaW0td2VidWkvd2ViVmlld3NIb3N0Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXZWJWaWV3IGZyb20gJy4vV2ViVmlldydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlZpZXdzSG9zdCB7XHJcbiAgICBwcml2YXRlIHdlYlZpZXdzID0gbmV3IE1hcDxzdHJpbmcsIFdlYlZpZXc+KClcclxuICAgIHByaXZhdGUgaWZyYW1lcyA9IG5ldyBNYXA8c3RyaW5nLCBIVE1MSUZyYW1lRWxlbWVudD4oKVxyXG5cclxuICAgIGdldFdlYlZpZXdJZHMocmVwbHlJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZXBseShyZXBseUlkLCBBcnJheS5mcm9tKHRoaXMud2ViVmlld3Mua2V5cygpKSlcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RlcldlYlZpZXcod2ViVmlldzogV2ViVmlldykge1xyXG4gICAgICAgIHRoaXMud2ViVmlld3Muc2V0KHdlYlZpZXcuaWQsIHdlYlZpZXcpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVucmVnaXN0ZXJXZWJWaWV3KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBUT0RPIHJlbW92ZSBmcm9tIHRoZSBVSSBpZiBwcmVzZW50XHJcbiAgICAgICAgdGhpcy53ZWJWaWV3cy5kZWxldGUoaWQpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0V2ViVmlldyhyZXBseUlkOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJlcGx5KHJlcGx5SWQsIHRoaXMud2ViVmlld3MuZ2V0KGlkKSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRUb1VJKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCB3ZWJWaWV3ID0gdGhpcy53ZWJWaWV3cy5nZXQoaWQpXHJcbiAgICAgICAgaWYgKHdlYlZpZXcpIHtcclxuICAgICAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJylcclxuICAgICAgICAgICAgdGhpcy5pZnJhbWVzLnNldChpZCwgaWZyYW1lKVxyXG4gICAgICAgICAgICBpZnJhbWUuc3JjID0gd2ViVmlldy51cmxcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUZyb21VSShpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gcmVwbGFjZSB0aGlzIHdpdGggbmV3IHByZWRpY2F0ZSBtZXRob2Q6IGlzSW5VSSgpXHJcbiAgICAgICAgaWYgKHRoaXMuaWZyYW1lcy5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5pZnJhbWVzLmdldChpZCkhKVxyXG4gICAgICAgICAgICB0aGlzLmlmcmFtZXMuZGVsZXRlKGlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpc0luVUkocmVwbHlJZDogc3RyaW5nLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZXBseShyZXBseUlkLCB0aGlzLmlmcmFtZXMuaGFzKGlkKSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlcGx5KHJlcGx5SWQ6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLnNreXJpbVBsYXRmb3JtLnNlbmRNZXNzYWdlKFsnV2ViVUknLCAnUmVwbHknLCByZXBseUlkLCBkYXRhXSlcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IFdlYlZpZXdzSG9zdCBmcm9tICcuL1dlYlZpZXdzSG9zdCdcclxuXHJcbih3aW5kb3cgYXMgYW55KS5fX3dlYlZpZXdzSG9zdF9fID0gbmV3IFdlYlZpZXdzSG9zdCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==