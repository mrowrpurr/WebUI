"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebUIComponentHost = /** @class */ (function () {
    function WebUIComponentHost() {
    }
    WebUIComponentHost.prototype.show = function (component) {
        var iframe = document.createElement('iframe');
        // iframe.style.display = 'none'
        // iframe.contentWindow!.onload = () => {
        //     iframe.style.display = 'block'
        //     // call some callback on the SP side
        // }
        iframe.style.width = '500px';
        iframe.style.height = '500px';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.src = component.url;
        document.documentElement.appendChild(iframe);
        alert("Added ".concat(component.url));
    };
    return WebUIComponentHost;
}());
window.webUI = new WebUIComponentHost();
//# sourceMappingURL=webUI.js.map