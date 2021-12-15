import WebViewsHostClient from './WebViewsHostClient'
import { browser, on } from 'skyrimPlatform'

const webViewsHostClient = new WebViewsHostClient((script: string) => { browser.executeJavaScript(script) })

on('browserMessage', message => {
    webViewsHostClient.onBrowserMessage(message.arguments)
})

export function getWebViewsHostClient() {
    return webViewsHostClient
}
