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

    it('getWebViewIds is empty by default', async () => {
        const replyId = getReplyId()
        await page.evaluate((replyId) => { (window as any).__webViewsHost__.getWebViewIds(replyId) }, replyId)
        expect(browserMessages).toHaveLength(1)
        expect(browserMessages[0]).toEqual(
            ['WebUI', 'Reply', replyId, []]
        )
    })

    it('can registerWebView', async () => {
        await page.evaluate(() => { (window as any).__webViewsHost__.registerWebView({ id: 'MyCoolWebView' }) })

        const replyId = getReplyId()
        await page.evaluate((replyId) => { (window as any).__webViewsHost__.getWebViewIds(replyId) }, replyId)
        expect(browserMessages).toHaveLength(1)
        expect(browserMessages[0]).toEqual(
            ['WebUI', 'Reply', replyId, ['MyCoolWebView']]
        )
    })

    test.todo('can getWebViewInfo')
    test.todo('can registerWebView')
})