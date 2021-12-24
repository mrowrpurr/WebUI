/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Api.ts":
/*!********************!*\
  !*** ./src/Api.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Api = (function () {
    function Api() {
    }
    return Api;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Api);


/***/ }),

/***/ "./src/BrowserEnvironment.ts":
/*!***********************************!*\
  !*** ./src/BrowserEnvironment.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var BrowserEnvironment = (function () {
    function BrowserEnvironment(webViewHost) {
        this.WebViewsHost = webViewHost;
    }
    return BrowserEnvironment;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BrowserEnvironment);


/***/ }),

/***/ "./src/Connection.ts":
/*!***************************!*\
  !*** ./src/Connection.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Connection = (function () {
    function Connection() {
    }
    return Connection;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Connection);


/***/ }),

/***/ "./src/WebView.ts":
/*!************************!*\
  !*** ./src/WebView.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var WebView = (function () {
    function WebView() {
    }
    return WebView;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebView);


/***/ }),

/***/ "./src/WebViewsHost.ts":
/*!*****************************!*\
  !*** ./src/WebViewsHost.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var WebViewsHost = (function () {
    function WebViewsHost() {
    }
    return WebViewsHost;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WebViewsHost);


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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Api": () => (/* reexport safe */ _Api__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "BrowserEnvironment": () => (/* reexport safe */ _BrowserEnvironment__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "Connection": () => (/* reexport safe */ _Connection__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "WebView": () => (/* reexport safe */ _WebView__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "WebViewsHost": () => (/* reexport safe */ _WebViewsHost__WEBPACK_IMPORTED_MODULE_4__["default"])
/* harmony export */ });
/* harmony import */ var _Api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Api */ "./src/Api.ts");
/* harmony import */ var _BrowserEnvironment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BrowserEnvironment */ "./src/BrowserEnvironment.ts");
/* harmony import */ var _Connection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Connection */ "./src/Connection.ts");
/* harmony import */ var _WebView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WebView */ "./src/WebView.ts");
/* harmony import */ var _WebViewsHost__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./WebViewsHost */ "./src/WebViewsHost.ts");






window.foo = "Hello?";

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2ViVUkuQnJvd3NlckVudmlyb25tZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUVBQWUsR0FBRyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNMbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxpRUFBZSxrQkFBa0IsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDTmxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLFVBQVUsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDTDFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDTHZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLFlBQVksRUFBQzs7Ozs7OztVQ0w1QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOd0I7QUFDOEI7QUFDaEI7QUFDTjtBQUNVO0FBQzRCO0FBQ3RFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS9icm93c2VyLWVudmlyb25tZW50Ly4vc3JjL0FwaS50cyIsIndlYnBhY2s6Ly9Ac2t5cmltLXdlYnVpL2Jyb3dzZXItZW52aXJvbm1lbnQvLi9zcmMvQnJvd3NlckVudmlyb25tZW50LnRzIiwid2VicGFjazovL0Bza3lyaW0td2VidWkvYnJvd3Nlci1lbnZpcm9ubWVudC8uL3NyYy9Db25uZWN0aW9uLnRzIiwid2VicGFjazovL0Bza3lyaW0td2VidWkvYnJvd3Nlci1lbnZpcm9ubWVudC8uL3NyYy9XZWJWaWV3LnRzIiwid2VicGFjazovL0Bza3lyaW0td2VidWkvYnJvd3Nlci1lbnZpcm9ubWVudC8uL3NyYy9XZWJWaWV3c0hvc3QudHMiLCJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS9icm93c2VyLWVudmlyb25tZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0Bza3lyaW0td2VidWkvYnJvd3Nlci1lbnZpcm9ubWVudC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS9icm93c2VyLWVudmlyb25tZW50L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS9icm93c2VyLWVudmlyb25tZW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQHNreXJpbS13ZWJ1aS9icm93c2VyLWVudmlyb25tZW50Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBBcGkgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQXBpKCkge1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIEFwaTtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgQXBpO1xyXG4iLCJ2YXIgQnJvd3NlckVudmlyb25tZW50ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEJyb3dzZXJFbnZpcm9ubWVudCh3ZWJWaWV3SG9zdCkge1xyXG4gICAgICAgIHRoaXMuV2ViVmlld3NIb3N0ID0gd2ViVmlld0hvc3Q7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQnJvd3NlckVudmlyb25tZW50O1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBCcm93c2VyRW52aXJvbm1lbnQ7XHJcbiIsInZhciBDb25uZWN0aW9uID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENvbm5lY3Rpb24oKSB7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQ29ubmVjdGlvbjtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgQ29ubmVjdGlvbjtcclxuIiwidmFyIFdlYlZpZXcgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gV2ViVmlldygpIHtcclxuICAgIH1cclxuICAgIHJldHVybiBXZWJWaWV3O1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBXZWJWaWV3O1xyXG4iLCJ2YXIgV2ViVmlld3NIb3N0ID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFdlYlZpZXdzSG9zdCgpIHtcclxuICAgIH1cclxuICAgIHJldHVybiBXZWJWaWV3c0hvc3Q7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IFdlYlZpZXdzSG9zdDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgQXBpIGZyb20gJy4vQXBpJztcclxuaW1wb3J0IEJyb3dzZXJFbnZpcm9ubWVudCBmcm9tICcuL0Jyb3dzZXJFbnZpcm9ubWVudCc7XHJcbmltcG9ydCBDb25uZWN0aW9uIGZyb20gJy4vQ29ubmVjdGlvbic7XHJcbmltcG9ydCBXZWJWaWV3IGZyb20gJy4vV2ViVmlldyc7XHJcbmltcG9ydCBXZWJWaWV3c0hvc3QgZnJvbSAnLi9XZWJWaWV3c0hvc3QnO1xyXG5leHBvcnQgeyBBcGksIEJyb3dzZXJFbnZpcm9ubWVudCwgQ29ubmVjdGlvbiwgV2ViVmlldywgV2ViVmlld3NIb3N0IH07XHJcbndpbmRvdy5mb28gPSBcIkhlbGxvP1wiO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=