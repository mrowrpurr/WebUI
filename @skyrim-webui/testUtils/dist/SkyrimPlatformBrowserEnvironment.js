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
exports.SkyrimPlatformBrowserEnvironment = void 0;
const jsdom_1 = require("jsdom");
class SkyrimPlatformBrowserEnvironment {
    constructor() {
        this.dom = new jsdom_1.JSDOM('', { runScripts: 'dangerously', resources: 'usable', url: 'file:///index.html' });
        this.window = this.dom.window;
        this.document = this.dom.window.document;
    }
    querySelector(selector) {
        var _a;
        return (_a = this.document) === null || _a === void 0 ? void 0 : _a.querySelector(selector);
    }
    querySelectorAll(selector) {
        var _a;
        return (_a = this.document) === null || _a === void 0 ? void 0 : _a.querySelectorAll(selector);
    }
    getElementById(id) {
        var _a;
        return (_a = this.document) === null || _a === void 0 ? void 0 : _a.getElementById(id);
    }
    runJavaScript(js) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.document) {
                const script = this.document.createElement('script');
                script.textContent = js;
                return new Promise(resolve => {
                    script.onload = () => { resolve(); };
                    this.document.body.appendChild(script);
                });
            }
            else {
                return new Promise(resolve => { resolve(); });
            }
        });
    }
    runFunction(functionName, ...args) {
        return this.runJavaScript(`${functionName}(${args.map(arg => JSON.stringify(arg)).join(', ')})`);
    }
}
exports.SkyrimPlatformBrowserEnvironment = SkyrimPlatformBrowserEnvironment;
//# sourceMappingURL=SkyrimPlatformBrowserEnvironment.js.map