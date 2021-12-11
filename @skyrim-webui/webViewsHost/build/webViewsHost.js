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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViVmlld3NIb3N0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE1BQXFCLFlBQVk7SUFBakM7UUFDSSxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQW1CO0lBK0J6QyxDQUFDO0lBN0JVLGFBQWEsQ0FBQyxPQUFlO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFTSxlQUFlLENBQUMsT0FBZ0I7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUM7SUFDMUMsQ0FBQztJQUVNLGlCQUFpQixDQUFDLEVBQVU7UUFDL0IscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sVUFBVSxDQUFDLE9BQWUsRUFBRSxFQUFVO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxPQUFPLENBQUMsRUFBVTtRQUNyQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDckMsSUFBSSxPQUFPLEVBQUU7WUFDVCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUMvQyxNQUFNLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHO1lBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBZSxFQUFFLElBQVM7UUFDM0IsTUFBYyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRixDQUFDO0NBQ0o7QUFoQ0Qsa0NBZ0NDOzs7Ozs7O1VDbENEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7OztBQ3RCQSwwRkFBeUM7QUFFeEMsTUFBYyxDQUFDLGdCQUFnQixHQUFHLElBQUksc0JBQVksRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL0Bza3lyaW0td2VidWkvd2ViVmlld3NIb3N0Ly4vc3JjL1dlYlZpZXdzSG9zdC50cyIsIndlYnBhY2s6Ly9Ac2t5cmltLXdlYnVpL3dlYlZpZXdzSG9zdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Ac2t5cmltLXdlYnVpL3dlYlZpZXdzSG9zdC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViVmlldyBmcm9tICcuL1dlYlZpZXcnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJWaWV3c0hvc3Qge1xyXG4gICAgd2ViVmlld3MgPSBuZXcgTWFwPHN0cmluZywgV2ViVmlldz4oKVxyXG5cclxuICAgIHB1YmxpYyBnZXRXZWJWaWV3SWRzKHJlcGx5SWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVwbHkocmVwbHlJZCwgQXJyYXkuZnJvbSh0aGlzLndlYlZpZXdzLmtleXMoKSkpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyV2ViVmlldyh3ZWJWaWV3OiBXZWJWaWV3KSB7XHJcbiAgICAgICAgdGhpcy53ZWJWaWV3cy5zZXQod2ViVmlldy5pZCwgd2ViVmlldylcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHVucmVnaXN0ZXJXZWJWaWV3KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBUT0RPIHJlbW92ZSBmcm9tIHRoZSBVSSBpZiBwcmVzZW50XHJcbiAgICAgICAgdGhpcy53ZWJWaWV3cy5kZWxldGUoaWQpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFdlYlZpZXcocmVwbHlJZDogc3RyaW5nLCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZXBseShyZXBseUlkLCB0aGlzLndlYlZpZXdzLmdldChpZCkpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFRvVUkoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHdlYlZpZXcgPSB0aGlzLndlYlZpZXdzLmdldChpZClcclxuICAgICAgICBpZiAod2ViVmlldykge1xyXG4gICAgICAgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKVxyXG4gICAgICAgICAgICBpZnJhbWUuc3JjID0gd2ViVmlldy51cmxcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlcGx5KHJlcGx5SWQ6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLnNreXJpbVBsYXRmb3JtLnNlbmRNZXNzYWdlKFsnV2ViVUknLCAnUmVwbHknLCByZXBseUlkLCBkYXRhXSlcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiaW1wb3J0IFdlYlZpZXdzSG9zdCBmcm9tICcuL1dlYlZpZXdzSG9zdCdcclxuXHJcbih3aW5kb3cgYXMgYW55KS5fX3dlYlZpZXdzSG9zdF9fID0gbmV3IFdlYlZpZXdzSG9zdCgpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9