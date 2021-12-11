import { getWebViewsHostBrowserEnvironment, WebViewsHostBrowserEnvironment } from '@skyrim-webui/testUtils'

describe('Web Views', () => {
    let env: WebViewsHostBrowserEnvironment

    beforeEach(async () => {
        env = await getWebViewsHostBrowserEnvironment('build/webViewsHost.js')
    })

    it('has no webviews by default', () => {
        // env.runWebViewsHostFunction()
        // env.runWebViewsBrowserFunction('registerWebView', {
        //     id: 'foo',
        //     url: 'http://localhost:8080/@skyrim-webui/testFixtures/html/widget1.html' // use a utility to get the path
        // })
        const iframes = env.querySelectorAll('iframe')
        expect(iframes).toHaveLength(1)
        expect(iframes![0].getAttribute('src')).toEqual('?? http something ??')
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