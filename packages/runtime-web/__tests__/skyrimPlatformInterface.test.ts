import { Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer'
import * as fs from 'fs'

describe('WebViewsHost interface for Skyrim Platform', () => {

    const widget1URL = `file://${__dirname}/../../../testFixtures/html/widget1.html`
    const widget2URL = `file://${__dirname}/../../../testFixtures/html/widget1.html`

    let browser: Browser
    let page: Page
    let apiResponseCallbacks: Map<string, (response: any) => void>

    // beforeAll(async () => { browser = await puppeteer.launch({ devtools: true }) })
    beforeAll(async () => { browser = await puppeteer.launch() })
    afterAll(async () => { await browser.close() })

    beforeEach(async () => {
        apiResponseCallbacks = new Map<string, (data: any) => void>()

        page = await browser.newPage()
        
        await page.exposeFunction('onSkyrimPlatformMessage', (args: any) => {
            if (args && args.length == 4 && args[0] == 'WebUI' && args[1] == 'Reply') {
                const replyId = args[2]
                const response = args[3]
                if (apiResponseCallbacks.has(replyId)) {
                    apiResponseCallbacks.get(replyId)!(response)
                    apiResponseCallbacks.delete(replyId)
                }
            }
        })

        await page.exposeFunction('consoleLogToTests', (...args: any[]) => { console.log(args) })
        await page.goto(`file://${__dirname}/../../../../WebUI/__WebUI__/WebUI.html`)
        await page.addScriptTag({ url: `file://${__dirname}/../../../testFixtures/delegateSkyrimPlatformMessagesToPuppeteer.js` })
        await page.addScriptTag({ url: `file://${__dirname}/../../../testFixtures/delegateConsoleLogToTest.js` })
    })

    async function invokeAPI(functionName: string, ...args: any[]) {
        await page.evaluate((functionName, args) => { (window as any)['__webViewsHost__SkyrimPlatformAPI'][functionName](...args) }, functionName, args)
    }

    async function getFromAPI(functionName: string, ...args: any[]) {
        return new Promise<any>(resolve => {
            const replyId = getReplyId()
            apiResponseCallbacks.set(replyId, resolve)
            invokeAPI(functionName, replyId, ...args)
        })
    }

    async function getElementPosition(selector: string): Promise<[number, number, number, number]> {
        const [width, height, x, y] = await page.evaluate((selector) => {
            const element = document.querySelector(selector)
            return [element.style.width, element.style.height, element.style.left, element.style.top]
        }, selector)
        return [width, height, x, y]
    }

    const getReplyId = () => `${Math.random()}_${Math.random()}`

    test.todo('returns responses via a browser message: WebUI, Reply, [ReplyID], Response')

    // it('does literally anything', async () => {
    //     // page.eval
    //     const webViewsFoo = await page.evaluate(() => { return (window as any).id })
    //     expect(webViewsFoo).toEqual('What is the ID of the window.webViewsHost?')
    // })

    it('can getWebViewIds', async () => {
        expect(await getFromAPI('getWebViewIds')).toEqual([])

        await invokeAPI('registerWebView', { id: 'MyFirstWebView', url: 'file:///index.html' })
        expect(await getFromAPI('getWebViewIds')).toEqual(['MyFirstWebView'])
        
        await invokeAPI('registerWebView', { id: 'MySecondWebView', url: 'file:///index.html' })
        expect(await getFromAPI('getWebViewIds')).toEqual(['MyFirstWebView', 'MySecondWebView'])
    })

    it('can getWebView', async () => {
        const webViewInfo = { id: 'MyCoolWebView', url: widget1URL, x: 69, y: 420 }

        expect(await getFromAPI('getWebView', 'MyCoolWebView')).toEqual(null)

        await invokeAPI('registerWebView', webViewInfo)

        expect(await getFromAPI('getWebView', 'MyCoolWebView')).toEqual(webViewInfo)
    })

    it('can unregisterWebView', async () => {
        await invokeAPI('registerWebView', { id: 'MyCoolWebView1', url: widget1URL })
        await invokeAPI('registerWebView', { id: 'MyCoolWebView2', url: widget2URL })
        expect(await getFromAPI('getWebViewIds')).toEqual(['MyCoolWebView1', 'MyCoolWebView2'])

        await invokeAPI('unregisterWebView', 'MyCoolWebView1')

        expect(await getFromAPI('getWebViewIds')).toEqual(['MyCoolWebView2'])

        await invokeAPI('unregisterWebView', 'MyCoolWebView2')

        expect(await getFromAPI('getWebViewIds')).toEqual([])
    })

    // TODO use a 'isAddedToUI' call in here
    it('can add web view to the UI (addWebViewToUI)', async () => {
        await invokeAPI('registerWebView', { id: 'MyCoolWebView', url: widget1URL })

        expect(await page.evaluate(() => document.querySelectorAll('iframe').length)).toEqual(0)

        await invokeAPI('addWebViewToUI', 'MyCoolWebView')

        expect(await page.evaluate(() => document.querySelectorAll('iframe').length)).toEqual(1)
        expect(await page.evaluate(() => document.querySelector('iframe')?.getAttribute('src'))).toEqual(widget1URL)
        const iframe = await page.waitForSelector('iframe')
        const frame = await iframe!.contentFrame();
        const iframeHtml = await frame?.evaluate(() => document.querySelector('*')?.outerHTML)
        expect(iframeHtml).toContain('I am widget 1')
    })

    it('can remove web view from the UI (removeFromUI)', async () => {
        await invokeAPI('registerWebView', { id: 'MyCoolWebView', url: widget1URL })
        await invokeAPI('addWebViewToUI', 'MyCoolWebView')

        expect(await page.evaluate(() => document.querySelectorAll('iframe').length)).toEqual(1)

        await invokeAPI('removeWebViewFromUI', 'MyCoolWebView')

        expect(await page.evaluate(() => document.querySelectorAll('iframe').length)).toEqual(0)
    })

    // it('web view is removed from UI when unregistered', async () => {
    //     await invokeAPI('registerWebView', { id: 'MyCoolWebView', url: widget1URL })
    //     await invokeAPI('addWebViewToUI', 'MyCoolWebView')
    //     expect((await page.$$('iframe')).length).toEqual(1)

    //     await invokeAPI('unregisterWebView', 'MyCoolWebView')

    //     expect((await page.$$('iframe')).length).toEqual(0)
    // })

    // it('cannot add multiple web views with the same identifier', async () => {
    //     expect((await page.$$('iframe')).length).toEqual(0)
    //     await invokeAPI('registerWebView', { id: 'MyCoolWebView', url: widget1URL })
    //     await invokeAPI('addWebViewToUI', 'MyCoolWebView')

    //     expect((await page.$$('iframe')).length).toEqual(1)

    //     await invokeAPI('addWebViewToUI', 'MyCoolWebView')

    //     expect((await page.$$('iframe')).length).toEqual(1) // There should still be only 1 iframe!
    // })

    // it('gives iframes a custom attribute containing the WebView ID', async() => {
    //     await invokeAPI('registerWebView', { id: 'MyCoolWebView1', url: widget1URL })
    //     await invokeAPI('registerWebView', { id: 'MyCoolWebView2', url: widget2URL })

    //     expect((await page.$$('iframe[data-webview-id=MyCoolWebView1]')).length).toEqual(0)
    //     expect((await page.$$('iframe[data-webview-id=MyCoolWebView2]')).length).toEqual(0)

    //     await invokeAPI('addWebViewToUI', 'MyCoolWebView1')

    //     expect((await page.$$('iframe[data-webview-id=MyCoolWebView1]')).length).toEqual(1)
    //     expect((await page.$$('iframe[data-webview-id=MyCoolWebView2]')).length).toEqual(0)

    //     await invokeAPI('addWebViewToUI', 'MyCoolWebView2')

    //     expect((await page.$$('iframe[data-webview-id=MyCoolWebView1]')).length).toEqual(1)
    //     expect((await page.$$('iframe[data-webview-id=MyCoolWebView2]')).length).toEqual(1)
    // })

    // //
    // test.todo('can reload web view')

    // test.todo('can redirect webview to a different URL')

    it('can get browser/screen dimensions', async () => {
        const actualHeight = await page.evaluate(() => window.innerHeight)
        const actualWidth = await page.evaluate(() => window.innerWidth)

        const dimensions = await getFromAPI('getScreenDimensions')

        expect(dimensions.height).toEqual(actualHeight)
        expect(dimensions.width).toEqual(actualWidth)
    })

    it('can specify absolute positioning', async () => {
        await invokeAPI('registerWebView', {
            id: 'MyCoolWebView',
            url: widget1URL,
            position: {
                type: 'absolute',
                info: { width: 11, height: 22, x: 33, y: 44 }
            }
        })
        await invokeAPI('addWebViewToUI', 'MyCoolWebView')

        const [width, height, x, y] = await getElementPosition('iframe')

        expect(width).toEqual('11px')
        expect(height).toEqual('22px')
        expect(x).toEqual('33px')
        expect(y).toEqual('44px')
    })

    // it('can specify percentage positioning', async () => {
    //     await invokeAPI('registerWebView', {
    //         id: 'MyCoolWebView',
    //         url: widget1URL,
    //         positionType: 'percentage',
    //         width: 80,
    //         height: 25,
    //         x: 10,
    //         y: 20
    //     })
    //     await invokeAPI('addWebViewToUI', 'MyCoolWebView')

    //     const windowHeight = await page.evaluate(() => window.innerHeight)
    //     const windowWidth = await page.evaluate(() => window.innerWidth)
    //     const [width, height, x, y] = await getElementPosition('iframe')

    //     expect(width).toEqual(`${windowWidth * (80/100)}px`)
    //     expect(height).toEqual(`${windowHeight * (25/100)}px`)
    //     expect(x).toEqual(`${windowWidth * (10 / 100)}px`)
    //     expect(y).toEqual(`${windowHeight * (20 / 100)}px`)
    // })

    // it('defaults to using percentage positioning', async () => {
    //     await invokeAPI('registerWebView', {
    //         id: 'MyCoolWebView',
    //         url: widget1URL,
    //         positionType: 'percentage',
    //         width: 80,
    //         height: 25,
    //         x: 10,
    //         y: 20
    //     })
    //     await invokeAPI('addWebViewToUI', 'MyCoolWebView')

    //     const windowHeight = await page.evaluate(() => window.innerHeight)
    //     const windowWidth = await page.evaluate(() => window.innerWidth)
    //     const [width, height, x, y] = await getElementPosition('iframe')

    //     expect(width).toEqual(`${windowWidth * (80/100)}px`)
    //     expect(height).toEqual(`${windowHeight * (25/100)}px`)
    //     expect(x).toEqual(`${windowWidth * (10 / 100)}px`)
    //     expect(y).toEqual(`${windowHeight * (20 / 100)}px`)
    // })

    // test.todo('can set the z-index of web views')

    // it('can reposition web view currently added to UI (move)', async () => {
    //     await invokeAPI('registerWebView', {
    //         id: 'MyCoolWebView',
    //         url: widget1URL,
    //         positionType: 'absolute',
    //         width: 11,
    //         height: 22,
    //         x: 33,
    //         y: 44
    //     })
    //     await invokeAPI('addWebViewToUI', 'MyCoolWebView')

    //     let [width, height, x, y] = await getElementPosition('iframe')

    //     expect(width).toEqual('11px')
    //     expect(height).toEqual('22px')
    //     expect(x).toEqual('33px')
    //     expect(y).toEqual('44px')

    //     await invokeAPI('move', 'MyCoolWebView', { x: 123, width: 420 });

    //     ([width, height, x, y] = await getElementPosition('iframe'))

    //     expect(width).toEqual('420px') // <--- updated
    //     expect(height).toEqual('22px')
    //     expect(x).toEqual('123px') // <--- updated
    //     expect(y).toEqual('44px')
    // })

    // test.todo('can hide web view in the UI - hide')

    // test.todo('can unhide web view in the UI - show')
    
    // test.todo('can toggle web view in the UI - toggle')

    // test.todo('can RESIZE web views!!!!')

    // test.todo('can DRAG & DROP to move web views!!!!')

})

// it('can check if a web view has been added to the UI (isInUI)', async () => {
//     await invokeAPI('registerWebView', { id: 'MyCoolWebView', url: widget1URL })
//     expect(await getFromAPI('isInUI', 'MyCoolWebView')).toEqual(false)

//     await invokeAPI('addWebViewToUI', 'MyCoolWebView')

//     expect(await getFromAPI('isInUI', 'MyCoolWebView')).toEqual(true)
// })

// it('can update web view values', async () => {
//     await invokeAPI('registerWebView', { id: 'HelloWidget', x: 420, y: 69, url: widget1URL })
//     await invokeAPI('addWebViewToUI', 'HelloWidget')

//     let webView = await getFromAPI('getWebView', 'HelloWidget')

//     expect(webView.id).toEqual('HelloWidget')
//     expect(webView.x).toEqual(420)
//     expect(webView.y).toEqual(69)
//     expect(webView.url).toEqual(widget1URL)

//     // Check the iframe URL
//     expect(await page.evaluate(() => document.querySelector('iframe')!.src)).toContain('widget1.html')

//     await invokeAPI('updateWebView', { id: 'HelloWidget', x: 123, url: widget2URL })

//     webView = await getFromAPI('getWebView', 'HelloWidget')

//     expect(webView.id).toEqual('HelloWidget')
//     expect(webView.x).toEqual(123) // <--- changed!
//     expect(webView.y).toEqual(69) // Y becomes the defaeult again
//     expect(webView.url).toEqual(widget2URL) // <--- changed!

//     // // URL should *STILL* be the original URl
//     // // Update does *NOT* move or redirect (use move() and redirect() for those)
//     // expect(await page.evaluate(() => document.querySelector('iframe')!.src)).toContain('widget1.html')
// })