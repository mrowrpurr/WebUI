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
        await page.goto(`file://${__dirname}/../../../WebUI/__WebUI__/webViewsHost.html`)
        await page.addScriptTag({ url: `file://${__dirname}/../../testFixtures/delegateSkyrimPlatformMessagesToPuppeteer.js` })
    })

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
        await page.evaluate(() => { (window as any).__webViewsHost__.registerWebView({ id: 'MyFirstWebView', url: 'file:///index.html' }) })
        await page.evaluate(() => { (window as any).__webViewsHost__.registerWebView({ id: 'MySecondWebView', url: 'file:///index.html' }) })

        // Returns Ids of Registered WebViews
        replyId = getReplyId()
        await page.evaluate((replyId) => { (window as any).__webViewsHost__.getWebViewIds(replyId) }, replyId)
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

        await page.evaluate((webViewInfo) => { (window as any).__webViewsHost__.registerWebView(webViewInfo)}, webViewInfo)

        const replyId = getReplyId()
        await page.evaluate((replyId) => { (window as any).__webViewsHost__.getWebView(replyId, 'MyCoolWebView') }, replyId)
        expect(browserMessages).toHaveLength(1)
        expect(browserMessages[0]).toEqual(
            ['WebUI', 'Reply', replyId, webViewInfo]
        )
    })

    it('can unregisterWebView', async () => {
        // Register
        await page.evaluate((widget1URL) => { (window as any).__webViewsHost__.registerWebView({ id: 'MyCoolWebView', url: widget1URL }) }, widget1URL)

        // ID returned
        let replyId = getReplyId()
        await page.evaluate((replyId) => { (window as any).__webViewsHost__.getWebViewIds(replyId) }, replyId)
        expect(browserMessages).toHaveLength(1)
        expect(browserMessages[0]).toEqual(
            ['WebUI', 'Reply', replyId, ['MyCoolWebView']]
        )

        // Unregister
        await page.evaluate(() => { (window as any).__webViewsHost__.unregisterWebView('MyCoolWebView') })

        // ID no longer returned
        replyId = getReplyId()
        await page.evaluate((replyId) => { (window as any).__webViewsHost__.getWebViewIds(replyId) }, replyId)
        expect(browserMessages[1]).toEqual(
            ['WebUI', 'Reply', replyId, []]
        )
    })

    it('can add web view to the UI - addToUI', async () => {
        await page.evaluate((widget1URL) => { (window as any).__webViewsHost__.registerWebView({ id: 'MyCoolWebView', url: widget1URL }) }, widget1URL)

        expect(await page.evaluate(() => document.querySelectorAll('iframe').length)).toEqual(0)

        await page.evaluate(() => { (window as any).__webViewsHost__.addToUI('MyCoolWebView') })

        expect(await page.evaluate(() => document.querySelectorAll('iframe').length)).toEqual(1)
        expect(await page.evaluate(() => document.querySelector('iframe')?.getAttribute('src'))).toEqual(widget1URL)
        const iframe = await page.waitForSelector('iframe')
        const frame = await iframe!.contentFrame();
        const iframeHtml = await frame?.evaluate(() => document.querySelector('*')?.outerHTML)
        expect(iframeHtml).toContain('I am widget 1')
    })

    test.todo('cannot add multiple web views with the same identifier')
    test.todo('web views added to UI are put into the properly style positions')
    test.todo('can reposition web view currently added to UI')

    test.todo('can remove web view from the UI - removeFromUI')

    test.todo('can hide web view in the UI - hide')

    test.todo('can unhide web view in the UI - show')
    
    test.todo('can toggle web view in the UI - toggle')
})