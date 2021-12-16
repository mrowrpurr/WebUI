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
    // TODO --> getIds
    getWebViewIds(replyId) {
        this.reply(replyId, Array.from(this.webViews.keys()));
    }
    // TODO --> register
    registerWebView(webView) {
        this.webViews.set(webView.id, webView);
    }
    // TODO --> unregister
    unregisterWebView(id) {
        this.removeFromUI(id);
        this.webViews.delete(id);
    }
    // TODO --> get()
    getWebView(replyId, id) {
        this.reply(replyId, this.webViews.get(id));
    }
    // update() {
    // }
    addToUI(id) {
        const webView = this.webViews.get(id);
        if (webView && !this.iframes.has(webView.id)) {
            const iframe = document.createElement('iframe');
            this.iframes.set(id, iframe);
            iframe.src = webView.url;
            iframe.dataset.webviewId = id;
            this.setIframePosition(iframe, webView);
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
    move(id, { positionType, x, y, width, height }) {
        const iframe = this.iframes.get(id);
        if (iframe) {
            const webView = this.webViews.get(id);
            if (webView) {
                // TODO --> use update
                if (positionType)
                    webView.positionType = positionType;
                if (x)
                    webView.x = x;
                if (y)
                    webView.y = y;
                if (width)
                    webView.width = width;
                if (height)
                    webView.height = height;
                this.setIframePosition(iframe, webView);
            }
        }
    }
    getScreenDimensions(replyId) {
        this.reply(replyId, [window.innerHeight, window.innerWidth]);
    }
    reply(replyId, data) {
        window.skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data]);
    }
    setIframePosition(iframe, webView) {
        if (webView.positionType == 'absolute') {
            iframe.style.width = webView.width.toString();
            iframe.style.height = webView.height.toString();
            iframe.style.left = webView.x.toString();
            iframe.style.top = webView.y.toString();
        }
        else {
            iframe.style.width = `${window.innerWidth * (webView.width / 100)}px`;
            iframe.style.height = `${window.innerHeight * (webView.height / 100)}px`;
            iframe.style.left = `${window.innerWidth * (webView.x / 100)}px`;
            iframe.style.top = `${window.innerHeight * (webView.y / 100)}px`;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJO1lBQ3JFLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUk7WUFDeEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSTtZQUNoRSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJO1NBQ25FO0lBQ0wsQ0FBQztDQUNKO0FBekZELGtDQXlGQzs7Ozs7OztVQzNGRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7Ozs7QUN0QkEsMEZBQXlDO0FBRXhDLE1BQWMsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLHNCQUFZLEVBQUUsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0Bza3lyaW0td2VidWkvd2ViVmlld3NIb3N0Ly4vc3JjL1dlYlZpZXdzSG9zdC50cyIsIndlYnBhY2s6Ly9Ac2t5cmltLXdlYnVpL3dlYlZpZXdzSG9zdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Ac2t5cmltLXdlYnVpL3dlYlZpZXdzSG9zdC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgV2ViVmlldyBmcm9tICcuL1dlYlZpZXcnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJWaWV3c0hvc3Qge1xyXG4gICAgcHJpdmF0ZSB3ZWJWaWV3cyA9IG5ldyBNYXA8c3RyaW5nLCBXZWJWaWV3PigpXHJcbiAgICBwcml2YXRlIGlmcmFtZXMgPSBuZXcgTWFwPHN0cmluZywgSFRNTElGcmFtZUVsZW1lbnQ+KClcclxuXHJcbiAgICAvLyBUT0RPIC0tPiBnZXRJZHNcclxuICAgIGdldFdlYlZpZXdJZHMocmVwbHlJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZXBseShyZXBseUlkLCBBcnJheS5mcm9tKHRoaXMud2ViVmlld3Mua2V5cygpKSlcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPIC0tPiByZWdpc3RlclxyXG4gICAgcmVnaXN0ZXJXZWJWaWV3KHdlYlZpZXc6IFdlYlZpZXcpIHtcclxuICAgICAgICB0aGlzLndlYlZpZXdzLnNldCh3ZWJWaWV3LmlkLCB3ZWJWaWV3KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE8gLS0+IHVucmVnaXN0ZXJcclxuICAgIHVucmVnaXN0ZXJXZWJWaWV3KGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUZyb21VSShpZClcclxuICAgICAgICB0aGlzLndlYlZpZXdzLmRlbGV0ZShpZClcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPIC0tPiBnZXQoKVxyXG4gICAgZ2V0V2ViVmlldyhyZXBseUlkOiBzdHJpbmcsIGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJlcGx5KHJlcGx5SWQsIHRoaXMud2ViVmlld3MuZ2V0KGlkKSlcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUoKSB7XHJcblxyXG4gICAgLy8gfVxyXG5cclxuICAgIGFkZFRvVUkoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHdlYlZpZXcgPSB0aGlzLndlYlZpZXdzLmdldChpZClcclxuICAgICAgICBpZiAod2ViVmlldyAmJiAhIHRoaXMuaWZyYW1lcy5oYXMod2ViVmlldy5pZCkpIHtcclxuICAgICAgICAgICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJylcclxuICAgICAgICAgICAgdGhpcy5pZnJhbWVzLnNldChpZCwgaWZyYW1lKVxyXG4gICAgICAgICAgICBpZnJhbWUuc3JjID0gd2ViVmlldy51cmxcclxuICAgICAgICAgICAgaWZyYW1lLmRhdGFzZXQud2Vidmlld0lkID0gaWRcclxuICAgICAgICAgICAgdGhpcy5zZXRJZnJhbWVQb3NpdGlvbihpZnJhbWUsIHdlYlZpZXcpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVGcm9tVUkoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmlmcmFtZXMuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuaWZyYW1lcy5nZXQoaWQpISlcclxuICAgICAgICAgICAgdGhpcy5pZnJhbWVzLmRlbGV0ZShpZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaXNJblVJKHJlcGx5SWQ6IHN0cmluZywgaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVwbHkocmVwbHlJZCwgdGhpcy5pZnJhbWVzLmhhcyhpZCkpXHJcbiAgICB9XHJcblxyXG4gICAgbW92ZShpZDogc3RyaW5nLCB7IHBvc2l0aW9uVHlwZSwgeCwgeSwgd2lkdGgsIGhlaWdodCB9IDogeyBwb3NpdGlvblR5cGU/OiBzdHJpbmcsIHg/OiBudW1iZXIsIHk/OiBudW1iZXIsIHdpZHRoPzogbnVtYmVyLCBoZWlnaHQ/OiBudW1iZXIgfSkge1xyXG4gICAgICAgIGNvbnN0IGlmcmFtZSA9IHRoaXMuaWZyYW1lcy5nZXQoaWQpXHJcbiAgICAgICAgaWYgKGlmcmFtZSkge1xyXG4gICAgICAgICAgICBjb25zdCB3ZWJWaWV3ID0gdGhpcy53ZWJWaWV3cy5nZXQoaWQpXHJcbiAgICAgICAgICAgIGlmICh3ZWJWaWV3KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPIC0tPiB1c2UgdXBkYXRlXHJcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb25UeXBlKSB3ZWJWaWV3LnBvc2l0aW9uVHlwZSA9IHBvc2l0aW9uVHlwZVxyXG4gICAgICAgICAgICAgICAgaWYgKHgpIHdlYlZpZXcueCA9IHhcclxuICAgICAgICAgICAgICAgIGlmICh5KSB3ZWJWaWV3LnkgPSB5XHJcbiAgICAgICAgICAgICAgICBpZiAod2lkdGgpIHdlYlZpZXcud2lkdGggPSB3aWR0aFxyXG4gICAgICAgICAgICAgICAgaWYgKGhlaWdodCkgd2ViVmlldy5oZWlnaHQgPSBoZWlnaHRcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SWZyYW1lUG9zaXRpb24oaWZyYW1lLCB3ZWJWaWV3KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFNjcmVlbkRpbWVuc2lvbnMocmVwbHlJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZXBseShyZXBseUlkLCBbd2luZG93LmlubmVySGVpZ2h0LCB3aW5kb3cuaW5uZXJXaWR0aF0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXBseShyZXBseUlkOiBzdHJpbmcsIGRhdGE6IGFueSkge1xyXG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5za3lyaW1QbGF0Zm9ybS5zZW5kTWVzc2FnZShbJ1dlYlVJJywgJ1JlcGx5JywgcmVwbHlJZCwgZGF0YV0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRJZnJhbWVQb3NpdGlvbihpZnJhbWU6IEhUTUxJRnJhbWVFbGVtZW50LCB3ZWJWaWV3OiBXZWJWaWV3KSB7XHJcbiAgICAgICAgaWYgKHdlYlZpZXcucG9zaXRpb25UeXBlID09ICdhYnNvbHV0ZScpIHtcclxuICAgICAgICAgICAgaWZyYW1lLnN0eWxlLndpZHRoID0gd2ViVmlldy53aWR0aC50b1N0cmluZygpXHJcbiAgICAgICAgICAgIGlmcmFtZS5zdHlsZS5oZWlnaHQgPSB3ZWJWaWV3LmhlaWdodC50b1N0cmluZygpXHJcbiAgICAgICAgICAgIGlmcmFtZS5zdHlsZS5sZWZ0ID0gd2ViVmlldy54LnRvU3RyaW5nKClcclxuICAgICAgICAgICAgaWZyYW1lLnN0eWxlLnRvcCA9IHdlYlZpZXcueS50b1N0cmluZygpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWZyYW1lLnN0eWxlLndpZHRoID0gYCR7d2luZG93LmlubmVyV2lkdGggKiAod2ViVmlldy53aWR0aCAvIDEwMCl9cHhgXHJcbiAgICAgICAgICAgIGlmcmFtZS5zdHlsZS5oZWlnaHQgPSBgJHt3aW5kb3cuaW5uZXJIZWlnaHQgKiAod2ViVmlldy5oZWlnaHQgLyAxMDApfXB4YFxyXG4gICAgICAgICAgICBpZnJhbWUuc3R5bGUubGVmdCA9IGAke3dpbmRvdy5pbm5lcldpZHRoICogKHdlYlZpZXcueCAvIDEwMCl9cHhgXHJcbiAgICAgICAgICAgIGlmcmFtZS5zdHlsZS50b3AgPSBgJHt3aW5kb3cuaW5uZXJIZWlnaHQgKiAod2ViVmlldy55IC8gMTAwKX1weGBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImltcG9ydCBXZWJWaWV3c0hvc3QgZnJvbSAnLi9XZWJWaWV3c0hvc3QnXHJcblxyXG4od2luZG93IGFzIGFueSkuX193ZWJWaWV3c0hvc3RfXyA9IG5ldyBXZWJWaWV3c0hvc3QoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=