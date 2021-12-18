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
const puppeteer = require("puppeteer");
const WebViewsHostClient_1 = require("../src/@skyrim-webui/sdk/WebViewsHostClient");
describe('WebViewsHostClient SDK for Skyrim Platform', () => {
    const widget1URL = `file://${__dirname}/../../../testFixtures/html/widget1.html`;
    const widget2URL = `file://${__dirname}/../../../testFixtures/html/widget1.html`;
    let client;
    let browser;
    let page;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () { browser = yield puppeteer.launch(); }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () { yield browser.close(); }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        page = yield browser.newPage();
        client = new WebViewsHostClient_1.default((script) => { page.evaluate(script); });
        yield page.exposeFunction('onSkyrimPlatformMessage', (args) => { client.onBrowserMessage(args); });
        yield page.exposeFunction('consoleLogToTests', (...args) => { console.log(args); });
        yield page.goto(`file://${__dirname}/../../../../WebUI/__WebUI__/browserEnvironment.html`);
        yield page.addScriptTag({ url: `file://${__dirname}/../../../testFixtures/delegateSkyrimPlatformMessagesToPuppeteer.js` });
        yield page.addScriptTag({ url: `file://${__dirname}/../../../testFixtures/delegateConsoleLogToTest.js` });
    }));
    /*
     * Tests for the API interface provided by WebViewsHost for Skyrim Platform (using the SDK Client)
     */
    /*
     * Skyrim Platform ---> executeJavascript window.__webViewsHost__.[API FUNCTION]
     * WebViewsHost    ---> window.skyrimPlatform.sendMessage
     */
    it('can registerWebView', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield client.getWebViewIds()).toHaveLength(0);
        client.registerWebView({ id: 'widget1', url: widget1URL });
        expect(yield client.getWebViewIds()).toEqual(['widget1']);
    }));
    it('can getWebViewIds', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield client.getWebViewIds()).toEqual([]);
        client.registerWebView({ id: 'widget1', url: widget1URL });
        expect(yield client.getWebViewIds()).toEqual(['widget1']);
        client.registerWebView({ id: 'widget2', url: widget2URL });
        expect(yield client.getWebViewIds()).toEqual(['widget1', 'widget2']);
    }));
    it('can getWebView', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield client.getWebView('widget1')).toEqual(null);
        expect(yield client.getWebView('widget2')).toEqual(null);
        expect(yield client.getWebViewIds()).toEqual([]);
        client.registerWebView({ id: 'widget1', url: widget1URL });
        expect(yield client.getWebViewIds()).toEqual(['widget1']);
        expect(yield client.getWebView('widget1')).not.toEqual(null);
        let webView = yield client.getWebView('widget1');
        expect(webView.id).toEqual('widget1');
        expect(webView.url).toEqual(widget1URL);
        expect(yield client.getWebView('widget2')).toEqual(null);
        client.registerWebView({ id: 'widget2', url: widget2URL });
        expect(yield client.getWebView('widget2')).not.toEqual(null);
        webView = yield client.getWebView('widget2');
        expect(webView.id).toEqual('widget2');
        expect(webView.url).toEqual(widget2URL);
    }));
    it('can unregisterWebView', () => __awaiter(void 0, void 0, void 0, function* () {
        client.registerWebView({ id: 'widget1', url: widget1URL });
        client.registerWebView({ id: 'widget2', url: widget1URL });
        expect(yield client.getWebViewIds()).toEqual(['widget1', 'widget2']);
        client.unregisterWebView('widget1');
        expect(yield client.getWebViewIds()).toEqual(['widget2']);
        client.unregisterWebView('widget2');
        expect(yield client.getWebViewIds()).toEqual([]);
    }));
    it('can addToUI', () => __awaiter(void 0, void 0, void 0, function* () {
        expect((yield page.$$('iframe')).length).toEqual(0);
        client.registerWebView({ id: 'widget1', url: widget1URL });
        client.addToUI('widget1');
        expect((yield page.$$('iframe')).length).toEqual(1);
        const iframeHandle = yield page.$('iframe');
        expect(yield iframeHandle.evaluate(iframe => iframe.getAttribute('src'))).toEqual(widget1URL);
    }));
    // it('can unregisterWebView', async () => {
    // it('can add web view to the UI - addToUI', async () => {
    // test.todo('cannot add multiple web views with the same identifier')
    // test.todo('web views added to UI are put into the properly style positions')
    // test.todo('can reposition web view currently added to UI')
    // test.todo('can remove web view from the UI - removeFromUI')
    // test.todo('can hide web view in the UI - hide')
    // test.todo('can unhide web view in the UI - show')
    // test.todo('can toggle web view in the UI - toggle')
});
