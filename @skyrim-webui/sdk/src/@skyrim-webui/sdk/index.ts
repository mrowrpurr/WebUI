import { printConsole, browser } from 'skyrimPlatform'

export function addTestIframe(url: string) {
    browser.executeJavaScript(`__webViewsHost__.registerWebView({"id":"wassup","url":${JSON.stringify(url)}})`)
    browser.executeJavaScript(`__webViewsHost__.addToUI("wassup")`)
}
