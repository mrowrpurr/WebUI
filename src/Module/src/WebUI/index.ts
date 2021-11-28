import { browser, on, once } from 'skyrimPlatform'
import WebView, { WebViewParams, WebViewScreenPosition } from './WebView'
import { WebViewHost } from './WebViewHost'

let _currentWebViewHost: WebViewHost | undefined = undefined

export function getWebViewHost(): WebViewHost {
    if (!_currentWebViewHost) setWebViewHost(defaultWebViewHost())
    return _currentWebViewHost!
}

export function setWebViewHost(host: WebViewHost) {
    _currentWebViewHost = host
}

export function defaultWebViewHost(): WebViewHost {
    return new WebViewHost({ browser, on, once })
}

export function getWebView(id: string): WebView | undefined {
    return undefined
}

export interface RegisterWebViewParams {
    id: string,
    url: string,
    position: WebViewScreenPosition,
    visible: boolean,
}

export function registerWebView(params: RegisterWebViewParams): WebView {
    return new WebView({ host: getWebViewHost(), ...params })
}
