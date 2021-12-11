// import { getWebViewsHostBrowserEnvironment, WebViewsHostBrowserEnvironment } from '@skyrim-webui/testUtils'

import * as puppeteer from 'puppeteer'

describe('Web Views', () => {
    // let env: WebViewsHostBrowserEnvironment

    // beforeEach(async () => {
    //     env = await getWebViewsHostBrowserEnvironment('build/webViewsHost.js')
    // })

    it('has no webviews by default', async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(`file://${__dirname}/../../../WebUI/__WebUI__/webViewsHost.html`)

        const iframe = await page.waitForSelector('iframe');
        const frame = await iframe!.contentFrame();

        console.log('THE IFRAME TEXT MOTHERFUCKERS!', await frame?.evaluate(() => document.querySelector('*')?.outerHTML))

        // await frame.waitForSelector('[ng-model="vm.username"]');
        // const username = await frame.$('[ng-model="vm.username"]');

        // console.log("DOC CONTENT", await page.evaluate(() => document!.querySelector('iframe')!.contentWindow?.document.body.outerHTML))

        // puppeteer./

        // env.runWebViewsHostFunction()
        // env.runWebViewsBrowserFunction('registerWebView', {
        //     id: 'foo',
        //     url: 'http://localhost:8080/@skyrim-webui/testFixtures/html/widget1.html' // use a utility to get the path
        // })
        // const iframes = env.querySelectorAll('iframe')
        // expect(iframes).toHaveLength(1)
        // expect(iframes![0].getAttribute('src')).toEqual('?? http something ??')

        browser.close()
    })

    // it('has no iframes by default', () => {
    //     expect(env.querySelectorAll('iframe')).toHaveLength(0)
    // })

    // it('registerWebView', () => {
    // })

    test.todo('getWebView')
    test.todo('getWebViews')
    test.todo('addToUI')
    test.todo('removeFromUI')
    test.todo('hide')
    test.todo('show')
    test.todo('setPosition')
    test.todo('getPosition')
    test.todo('unregisterWebView')
})

        // env.runWebViewsBrowserFunction('registerWebView', {
        //     id: 'foo',
        //     url: 'http://localhost:8080/@skyrim-webui/testFixtures/html/widget1.html' // use a utility to get the path
        // })
        // const iframes = env.querySelectorAll('iframe')
        // expect(iframes).toHaveLength(1)
        // expect(iframes![0].getAttribute('src')).toEqual('?? http something ??')