"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebUIComponentHost = /** @class */ (function () {
    function WebUIComponentHost() {
    }
    WebUIComponentHost.prototype.show = function (component) {
        alert("SHOW: ".concat(JSON.stringify(component)));
    };
    return WebUIComponentHost;
}());
window.webUI = new WebUIComponentHost();
//# sourceMappingURL=webUI.js.map