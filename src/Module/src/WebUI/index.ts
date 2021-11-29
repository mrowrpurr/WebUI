import { browser, BrowserMessageEvent, Debug, on, once } from 'skyrimPlatform'
import WebView, { WebViewScreenPosition } from './WebView'
import WebViewHost from './WebViewHost'

let _currentWebViewHost: WebViewHost | undefined = undefined

export function getWebViewHost(): WebViewHost {
    if (!_currentWebViewHost) setWebViewHost(defaultWebViewHost())
    return _currentWebViewHost!
}

export function setWebViewHost(host: WebViewHost) {
    _currentWebViewHost = host
}

export function defaultWebViewHost(): WebViewHost {
    return new WebViewHost({ skyrimPlatform: {
        browser,
        // onBrowserMessage: on,
        onBrowserMessage: (eventName: 'browserMessage', callback: (event: BrowserMessageEvent) => void) => {
            on('browserMessage', message => {
                once('update', () => {
                    callback(message)
                })
            })
        },
        onceUpdate: (eventName: 'update', callback: () => void) => {
            once('update', () => {
                callback()
            })
        }
    }})
}

export function getWebView(id: string) {
    return getWebViewHost().getWebView(id)
}

export interface RegisterWebViewParams {
    id: string,
    url: string,
    position?: WebViewScreenPosition,
}

export function registerWebView(params: RegisterWebViewParams): WebView {
    once('update', () => {
        Debug.messageBox(`REGISTERING WEB VIEW`)
    })
    return new WebView({ host: getWebViewHost(), ...params })
}
