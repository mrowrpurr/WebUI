import { Browser, Page } from 'puppeteer'
import * as puppeteer from 'puppeteer'
import WebViewsHostClient from '../src/@skyrim-webui/sdk/WebViewsHostClient'

describe('WebViewsHostClient SDK for Skyrim Platform', () => {

    const widget1URL = `file://${__dirname}/../../../fixtures/html/widget1.html`
    const widget2URL = `file://${__dirname}/../../../fixtures/html/widget1.html`

    let client: WebViewsHostClient
    let browser: Browser
    let page: Page

    beforeAll(async () => { browser = await puppeteer.launch() })
    afterAll(async () => { await browser.close() })

    beforeEach(async () => {
        page = await browser.newPage()
        client = new WebViewsHostClient((script: string) => { page.evaluate(script) })
        await page.exposeFunction('onSkyrimPlatformMessage', (args: any) => { client.onBrowserMessage(args) })
        await page.exposeFunction('consoleLogToTests', (...args: any[]) => { console.log(args) })
        await page.goto(`file://${__dirname}/../../../../WebUI/__WebUI__/browserEnvironment.html`)
        await page.addScriptTag({ url: `file://${__dirname}/../../../fixtures/delegateSkyrimPlatformMessagesToPuppeteer.js` })
        await page.addScriptTag({ url: `file://${__dirname}/../../../fixtures/delegateConsoleLogToTest.js` })
    })

    /*
     * Tests for the API interface provided by WebViewsHost for Skyrim Platform (using the SDK Client)
     */

    /*
     * Skyrim Platform ---> executeJavascript window.__webViewsHost__.[API FUNCTION]
     * WebViewsHost    ---> window.skyrimPlatform.sendMessage
     */

    it('can registerWebView', async () => {
        expect(await client.getWebViewIds()).toHaveLength(0)

        client.registerWebView({ id: 'widget1', url: widget1URL })

        expect(await client.getWebViewIds()).toEqual(['widget1'])
    })

    it('can getWebViewIds', async () => {
        expect(await client.getWebViewIds()).toEqual([])

        client.registerWebView({ id: 'widget1', url: widget1URL })
        expect(await client.getWebViewIds()).toEqual(['widget1'])

        client.registerWebView({ id: 'widget2', url: widget2URL })
        expect(await client.getWebViewIds()).toEqual(['widget1', 'widget2'])
    })

    it('can getWebView', async () => {
        expect(await client.getWebView('widget1')).toEqual(null)
        expect(await client.getWebView('widget2')).toEqual(null)

        expect(await client.getWebViewIds()).toEqual([])
        client.registerWebView({ id: 'widget1', url: widget1URL })
        expect(await client.getWebViewIds()).toEqual(['widget1'])

        expect(await client.getWebView('widget1')).not.toEqual(null)
        let webView = await client.getWebView('widget1')
        expect(webView!.id).toEqual('widget1')
        expect(webView!.url).toEqual(widget1URL)
        expect(await client.getWebView('widget2')).toEqual(null)

        client.registerWebView({ id: 'widget2', url: widget2URL })

        expect(await client.getWebView('widget2')).not.toEqual(null)
        webView = await client.getWebView('widget2')
        expect(webView!.id).toEqual('widget2')
        expect(webView!.url).toEqual(widget2URL)
    })

    it('can unregisterWebView', async () => {
        client.registerWebView({ id: 'widget1', url: widget1URL })
        client.registerWebView({ id: 'widget2', url: widget1URL })
        expect(await client.getWebViewIds()).toEqual(['widget1', 'widget2'])

        client.unregisterWebView('widget1')
        expect(await client.getWebViewIds()).toEqual(['widget2'])

        client.unregisterWebView('widget2')
        expect(await client.getWebViewIds()).toEqual([])
    })

    it('can addToUI', async () => {
        expect((await page.$$('iframe')).length).toEqual(0)

        client.registerWebView({ id: 'widget1', url: widget1URL })
        client.addToUI('widget1')

        expect((await page.$$('iframe')).length).toEqual(1)
        const iframeHandle = await page.$('iframe')
        expect(await iframeHandle!.evaluate(iframe => iframe.getAttribute('src'))).toEqual(widget1URL)
    })

    // it('can unregisterWebView', async () => {
    // it('can add web view to the UI - addToUI', async () => {
    // test.todo('cannot add multiple web views with the same identifier')
    // test.todo('web views added to UI are put into the properly style positions')
    // test.todo('can reposition web view currently added to UI')
    // test.todo('can remove web view from the UI - removeFromUI')
    // test.todo('can hide web view in the UI - hide')
    // test.todo('can unhide web view in the UI - show')
    // test.todo('can toggle web view in the UI - toggle')
})