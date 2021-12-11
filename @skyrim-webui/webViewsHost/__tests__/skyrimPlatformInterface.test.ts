import { Browser, Page } from 'puppeteer'
import * as puppeteer from 'puppeteer'

describe('WebViewsHost interface for Skyrim Platform', () => {

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
        await page.evaluate(() => { (window as any).__webViewsHost__.registerWebView({ id: 'MyCoolWebView', url: 'file:///index.html' }) })

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
            url: 'file:///index.html',
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
        await page.evaluate(() => { (window as any).__webViewsHost__.registerWebView({ id: 'MyCoolWebView', url: 'file:///index.html' }) })

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
})