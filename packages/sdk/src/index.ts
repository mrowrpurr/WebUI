import { browser } from '@skyrim-platform/skyrim-platform'
import { IWebView } from '@skyrim-webui/types'

export function makeWidgetAppear(url: string) {
    browser.loadUrl(url)
    browser.setVisible(true)
}

export function registerWebView(webView: IWebView): IWebView {
    
}
