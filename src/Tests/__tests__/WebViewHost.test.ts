import { getBrowserEnvironment, MockBrowser, MockSkyrimPlatform, SkyrimPlatformBrowserEnvironment } from './helpers/SkyrimPlatformBrowserEnvironment'
import { getWebViewHost, registerWebView, setWebViewHost } from '@Modules/WebUI'
import WebViewHost from 'WebUI/WebViewHost'
import { BrowserMessageEvent } from 'skyrimPlatform'

describe('WebViewHost', () => {

    let env: SkyrimPlatformBrowserEnvironment

    beforeEach(() => {
        env = getBrowserEnvironment()
    })

    it('add component to UI', async () => {
        const callbacks = new Array<(event: BrowserMessageEvent) => void>()
        console.log('HELLO')
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
        console.log(`WEB VIEW HOST ${webViewHost}`)
        env.onSendMessage(message => {
            console.log(`GOT MESSAGE!!!! callbacks: ${callbacks.length}`, message)
            callbacks.forEach(callback => callback(message))
        })
        const webView = registerWebView({
            id: 'Hello', url: `file://${__dirname.replace('C:', 'XXX')}/FOO.html` // Dunno why this avoids getting an ENOENT error, but it does
        })

        expect(webViewHost.getWebViews()).toHaveLength(0)
        expect(env.querySelectorAll('iframe')).toHaveLength(0)

        webViewHost.addToUI(webView)

        await webViewHost.waitForLoad()

        expect(webViewHost.getWebViews()).toHaveLength(1)
        expect(env.querySelectorAll('iframe')).toHaveLength(1)
        expect(env.querySelector('iframe')?.getAttribute('src')).toEqual("????")
    })

    test.todo('remove component from UI')

    test.todo('send message to specific WebView')

    test.todo('send messages to different WebViews')

    test.todo('listen for all messages, regardless of WebView target')

})