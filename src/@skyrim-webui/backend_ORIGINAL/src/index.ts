import WebView from './WebView'
import WebViewsHostClient from './WebViewsHostClient'
import { browser, on } from 'skyrimPlatform'

const webViewsHostClient = new WebViewsHostClient((script: string) => { browser.executeJavaScript(script) })

on('browserMessage', message => {
    webViewsHostClient.onBrowserMessage(message.arguments)
})

export function getWebViewsHostClient() {
    return webViewsHostClient
}

export function registerWebView(webView: WebView) {
    getWebViewsHostClient().registerWebView(webView)
}

export async function getWebViewIds() {
    return getWebViewsHostClient().getWebViewIds()
}

// export function addToUI(id: string) {
//     getWebViewsHostClient().addToUI(id)
// }
