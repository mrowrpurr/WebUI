"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebUISkyrimAPI {
    hello() {
        alert('HELLO THERE');
    }
}
class WebUIComponentHost {
    constructor() {
        this.components = new Map();
        this.iframes = new Map();
    }
    remove(id) {
        this.components.delete(id);
        const iframe = this.iframes.get(id);
        document.documentElement.removeChild(iframe);
        this.iframes.delete(id);
    }
    add(component) {
        if (this.components.has(component.id))
            this.remove(component.id);
        else
            this.components.set(component.id, component);
        const iframe = document.createElement('iframe');
        this.iframes.set(component.id, iframe);
        iframe.style.left = (window.innerWidth * (component.position.x / 100)).toFixed() + 'px';
        iframe.style.top = (window.innerHeight * (component.position.y / 100)).toFixed() + 'px';
        iframe.style.height = (window.innerHeight * (component.position.height / 100)).toFixed() + 'px';
        iframe.style.width = (window.innerWidth * (component.position.width / 100)).toFixed() + 'px';
        iframe.frameBorder = '0';
        iframe.scrolling = 'false';
        iframe.src = component.url;
        document.documentElement.appendChild(iframe);
        if (iframe.contentWindow)
            iframe.contentWindow.onerror = function (msg, url, linenumber) {
                alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
                return true;
            };
    }
}
window.webUI = new WebUIComponentHost();
window.skyrim = new WebUISkyrimAPI();
//# sourceMappingURL=webUI.js.map