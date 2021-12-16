import { Browser, Page } from 'puppeteer'
import * as puppeteer from 'puppeteer'

describe('WebViewsHost interface for Skyrim Platform', () => {

    const widget1URL = `file://${__dirname}/../../testFixtures/html/widget1.html`
    const widget2URL = `file://${__dirname}/../../testFixtures/html/widget1.html`

    let browser: Browser
    let page: Page
    let browserMessages: Array<any>

    beforeAll(async () => { browser = await puppeteer.launch() })
    afterAll(async () => { await browser.close() })

    // Setup
    beforeEach(async () => {
        browserMessages = new Array<any>()
        page = await browser.newPage()
        await page.exposeFunction('onSkyrimPlatformMessage', (args: any) => { browserMessages.push(args) })
        await page.exposeFunction('consoleLogToTests', (...args: any[]) => { console.log(args) })
        await page.goto(`file://${__dirname}/../../../WebUI/__WebUI__/webViewsHost.html`)
        await page.addScriptTag({ url: `file://${__dirname}/../../testFixtures/delegateSkyrimPlatformMessagesToPuppeteer.js` })
        await page.addScriptTag({ url: `file://${__dirname}/../../testFixtures/delegateConsoleLogToTest.js` })
    })

    async function invokeAPI(functionName: string, ...args: any[]) {
        await page.evaluate((functionName, args) => { (window as any).__webViewsHost__[functionName](...args) }, functionName, args)
    }

    const getReplyId = () => `${Math.random()}_${Math.random()}`

    /*
     * Tests for the API interface provided by WebViewsHost for Skyrim Platform
     */

    /*
     * Skyrim Platform ---> executeJavascript window.__webViewsHost__.[API FUNCTION]
     * WebViewsHost    ---> window.skyrimPlatform.sendMessage
     */

    it('can getWebViewIds', async () => {
        // Is Empty By Default
        let replyId = getReplyId()
        await page.evaluate((replyId) => { (window as any).__webViewsHost__.getWebViewIds(replyId) }, replyId)
        expect(browserMessages[0]).toEqual(
            ['WebUI', 'Reply', replyId, []]
        )

        // Register WebViews
        await invokeAPI('registerWebView', { id: 'MyFirstWebView', url: 'file:///index.html' })
        await invokeAPI('registerWebView', { id: 'MySecondWebView', url: 'file:///index.html' })

        // Returns Ids of Registered WebViews
        replyId = getReplyId()
        await invokeAPI('getWebViewIds', replyId)
        expect(browserMessages[1]).toEqual(
            ['WebUI', 'Reply', replyId, ['MyFirstWebView', 'MySecondWebView']]
        )
    })

    it('can registerWebView', async () => {
        await page.evaluate((widget1URL) => { (window as any).__webViewsHost__.registerWebView({ id: 'MyCoolWebView', url: widget1URL }) }, widget1URL)

        const replyId = getReplyId()
        await page.evaluate((replyId) => { (window as any).__webViewsHost__.getWebViewIds(replyId) }, replyId)
        expect(browserMessages).toHaveLength(1)
        expect(browserMessages[0]).toEqual(
            ['WebUI', 'Reply', replyId, ['MyCoolWebView']]
        )
    })

    it('can getWebView', async () => {
        const webViewInfo = {
            id: 'MyCoolWebView',
            url: widget1URL,
            x: 69,
            y: 420
        }

        await invokeAPI('registerWebView', webViewInfo)

        const replyId = getReplyId()
        await invokeAPI('getWebView', replyId, 'MyCoolWebView')
        expect(browserMessages).toHaveLength(1)
        expect(browserMessages[0]).toEqual(
            ['WebUI', 'Reply', replyId, webViewInfo]
        )
    })

    it('can unregisterWebView', async () => {
        // Register
        await invokeAPI('registerWebView', { id: 'MyCoolWebView', url: widget1URL })

        // ID returned
        let replyId = getReplyId()
        await invokeAPI('getWebViewIds', replyId)
        expect(browserMessages).toHaveLength(1)
        expect(browserMessages[0]).toEqual(
            ['WebUI', 'Reply', replyId, ['MyCoolWebView']]
        )

        // Unregister
        await invokeAPI('unregisterWebView', 'MyCoolWebView')

        // ID no longer returned
        replyId = getReplyId()
        await invokeAPI('getWebViewIds', replyId)
        expect(browserMessages[1]).toEqual(
            ['WebUI', 'Reply', replyId, []]
        )
    })

    // TODO use a 'isAddedToUI' call in here
    it('can add web view to the UI - addToUI', async () => {
        await invokeAPI('registerWebView', { id: 'MyCoolWebView', url: widget1URL })

        expect(await page.evaluate(() => document.querySelectorAll('iframe').length)).toEqual(0)

        await invokeAPI('addToUI', 'MyCoolWebView')

        expect(await page.evaluate(() => document.querySelectorAll('iframe').length)).toEqual(1)
        expect(await page.evaluate(() => document.querySelector('iframe')?.getAttribute('src'))).toEqual(widget1URL)
        const iframe = await page.waitForSelector('iframe')
        const frame = await iframe!.contentFrame();
        const iframeHtml = await frame?.evaluate(() => document.querySelector('*')?.outerHTML)
        expect(iframeHtml).toContain('I am widget 1')
    })

    it('can remove web view from the UI - removeFromUI', async () => {
        await invokeAPI('registerWebView', { id: 'MyCoolWebView', url: widget1URL })
        await invokeAPI('addToUI', 'MyCoolWebView')

        expect(await page.evaluate(() => document.querySelectorAll('iframe').length)).toEqual(1)

        await invokeAPI('removeFromUI', 'MyCoolWebView')

        expect(await page.evaluate(() => document.querySelectorAll('iframe').length)).toEqual(0)
    })

    test.todo('web view is removed from UI when unregistered')

    // it('cannot add multiple web views with the same identifier', async () => {
    //     await page.evaluate((widget1URL) => { (window as any).__webViewsHost__.registerWebView({ id: 'MyCoolWebView', url: widget1URL }) }, widget1URL)
    //     await page.evaluate(() => { (window as any).__webViewsHost__.addToUI('MyCoolWebView') })

    //     expect(await page.evaluate(() => document.querySelectorAll('iframe').length)).toEqual(1)

    //     await page.evaluate(() => { (window as any).__webViewsHost__.addToUI('MyCoolWebView') })

    //     // There should still be only 1 iframe!
    //     expect(await page.evaluate(() => document.querySelectorAll('iframe').length)).toEqual(1)
    // })

    test.todo('can check if a web view is currently added to the UI')

    test.todo('gives iframes a custom attribute containing the WebView ID')

    test.todo('web views added to UI are put into the properly style positions')
    test.todo('can reposition web view currently added to UI')

    test.todo('can remove web view from the UI - removeFromUI')

    test.todo('can hide web view in the UI - hide')

    test.todo('can unhide web view in the UI - show')
    
    test.todo('can toggle web view in the UI - toggle')
})