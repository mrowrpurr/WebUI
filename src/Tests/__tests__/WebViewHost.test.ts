import { getBrowserEnvironment, MockBrowser, MockSkyrimPlatform, SkyrimPlatformBrowserEnvironment } from './helpers/SkyrimPlatformBrowserEnvironment'
import { getWebViewHost, registerWebView, setWebViewHost } from '@Modules/WebUI'
import WebViewHost from 'WebUI/WebViewHost'
import { BrowserMessageEvent } from 'skyrimPlatform'

describe('WebViewHost', () => {

    let env: SkyrimPlatformBrowserEnvironment

    beforeEach(() => {
        env = getBrowserEnvironment()
    })

    it('add component to UI', () => {
        const callbacks = new Array<(event: BrowserMessageEvent) => void>()
        const webViewHost = setWebViewHost(new WebViewHost({
            skyrimPlatform: new MockSkyrimPlatform({
                on: (eventName: 'browserMessage', callback: (event: BrowserMessageEvent) => void) => {
                    // Need to actually take browser messages from skyrimPlatform.sendMessage and delegate them here                  
                    console.log("PUSHING A CALLBACK FOR BROWSER EVENTS!!!")
                    callbacks.push(callback)
                },
                once: (eventName: 'update', callback: () => void) => {
                    // Call once immediately
                    callback()
                },
                browser: new MockBrowser(env.dom)
            })
        }))
        env.onSendMessage(message => {
            console.log("GOT MESSAGE!!!!", message)
            callbacks.forEach(callback => callback(message))
        })
        const webView = registerWebView({
            id: 'Hello', url: 'file:///index.html'
        })

        expect(webViewHost.getWebViews()).toHaveLength(0)
        expect(env.querySelectorAll('iframe')).toHaveLength(0)

        webViewHost.addToUI(webView)

        expect(webViewHost.getWebViews()).toHaveLength(1)
        expect(env.querySelectorAll('iframe')).toHaveLength(1)
    })

    test.todo('remove component from UI')

    test.todo('send message to specific WebView')

    test.todo('send messages to different WebViews')

    test.todo('listen for all messages, regardless of WebView target')

})