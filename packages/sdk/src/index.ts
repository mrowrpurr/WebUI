import { browser } from '@skyrim-platform/skyrim-platform'
import { IWebView, IWebViewsHost } from '@skyrim-webui/types'
import WebView, { WebViewParams } from './WebView'
import WebViewsHost from './WebViewsHost'

const webViewsHost = new WebViewsHost({
  executeJavaScript: (script) => {
    browser.executeJavaScript(script)
  }
})

export function registerWebView(webViewParams: WebViewParams): IWebView {
  const webView = new WebView(webViewParams)

  // Register it!
  webViewsHost.registerWebView(webView)

  return webView   
}


// const _webViewsHost: IWebViewsHost | undefined = undefined

// function getSkyrimPlatformWebViewsHost(): IWebViewsHost {
  
// }

// export function getWebViewsHost(): IWebViewsHost {
//   if (! _webViewsHost) _webViewsHost = getSkyrimPlatformWebViewsHost()
//   return _webViewsHost
// }

// export function setWebViewsHost(webViewsHost: IWebViewsHost) {
//   _webViewsHost = webViewsHost
// }