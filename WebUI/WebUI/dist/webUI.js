"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class WebUIMod {
    constructor(modName) {
        this.modName = modName;
    }
    request(query, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                window.postMessage({ event: "THIS IS A MESSAGE" });
                resolve('HMM TODO');
            });
        });
    }
}
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
// TODO: make this __webUI so it's clear that it's a private API
window.webUI = new WebUIComponentHost();
window.skyrim = new WebUISkyrimAPI();
window.getMod = (modName) => new WebUIMod(modName);
// window.addEventListener('message', message => {
//     alert(`TypeScript caught this message: ${JSON.stringify(message.data)}`)
// })
//# sourceMappingURL=webUI.js.map