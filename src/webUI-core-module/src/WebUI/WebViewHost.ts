/*
 * Skyrim Platform Backend
 */

import { browser, on, once, BrowserMessageEvent, Debug, Message } from 'skyrimPlatform'
import WebView from './WebView'
import MessageBox from './MessageBox'
import { WebViewBrowserMessage, WebViewMessage, WebViewEvent, WebViewRequest, WebViewResponse } from './WebViewEvents'

interface WebViewEventCallback {
    viewId: string,
    callback: (message: any) => any
}

export class WebViewHost {
    public rootUrl: string
    initialized = false
    isReady = false
    eventCallbacks = new Map<string, Array<WebViewEventCallback>>()
    jsToInvokeWhenReady = new Array<[string, any]>()

    constructor(rootUrl: string = 'file:///Data/WebUI/WebUI/index.html') {
        this.rootUrl = rootUrl
    }

    public initialize() {
        if (!this.initialized) {
            this.initialized = true
            browser.loadUrl(this.rootUrl)
            browser.setVisible(true)
            on('browserMessage', message => this._handleBrowserMessage(message))
        }
    }

    public addToUI(component: WebView) {
        this.invokeViewFunction('add', component)
    }

    public removeFromUI(component: WebView) {
        MessageBox("TODO - remove WebView from UI")
    }

    // public on(messageType: 'load', viewId: string, callback: (message: WebViewRequest) => void): void
    public on(messageType: 'message', viewId: string, callback: (message: WebViewMessage) => void): void
    public on(messageType: 'event', viewId: string, callback: (message: WebViewEvent) => void): void
    public on(messageType: 'request', viewId: string, callback: (message: WebViewRequest) => void): void
    public on(messageType: string, viewId: string, callback: (message: any) => void): void
    public on(messageType: string, viewId: string, callback: (message: any) => void) {
        const callbacks = this.eventCallbacks.get(messageType)
        if (callbacks)
            callbacks.push({ viewId, callback })
    }

    public async send(messageType: 'message', viewId: string, message: WebViewMessage): Promise<any>
    public async send(messageType: 'event', viewId: string, message: WebViewEvent): Promise<any>
    public async send(messageType: 'request', viewId: string, message: WebViewMessage): Promise<WebViewResponse>
    public async send(messageType: string, viewId: string, message: any): Promise<any>
    public async send(messageType: string, viewId: string, message: any): Promise<any> {
        // Invoke JS
        MessageBox(`TODO: send(${messageType})`)
    }

    public invokeViewFunction(functionName: string, parameters: any) {
        if (this.isReady)
            browser.executeJavaScript(`window.__webViewHost.${functionName}(${JSON.stringify(parameters)});`)
        else
            this.jsToInvokeWhenReady.push([functionName, parameters])
    }

    _handleBrowserMessage(message: BrowserMessageEvent) {
        once('update', () => {
            if (message.arguments.length && message.arguments[0] == "WebUI") {
                const browserMessage = message.arguments[1] as WebViewBrowserMessage
                if (browserMessage.messageType == 'webviewhostloaded') {
                    this.isReady = true
                    this.jsToInvokeWhenReady.forEach(jsToInvoke => {
                        this.invokeViewFunction(jsToInvoke[0], jsToInvoke[1])
                    })
                } else {
                    const callbacks = this.eventCallbacks.get(browserMessage.messageType)
                    if (callbacks) {
                        callbacks.forEach(callback => {
                            if ((!callback.viewId) || callback.viewId == browserMessage.target)
                                callback.callback(browserMessage.message)
                        })
                    }
                }
            }
        })
    }
}

const defaultInstance = new WebViewHost()

export default defaultInstance
