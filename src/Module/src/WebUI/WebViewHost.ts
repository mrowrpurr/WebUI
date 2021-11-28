/*
 * Skyrim Platform Backend
 */

import WebView from './WebView'
import { WebViewBrowserMessage, WebViewMessage, WebViewEvent, WebViewRequest, WebViewResponse, WebViewLoadedEvent } from './WebViewEvents'
import { IOnEvent, IOnceEvent, IBrowser, IBrowserMessageEvent } from './ISkyrimPlatform'

export interface WebViewHostParams {
    browser: IBrowser,
    on: IOnEvent,
    once: IOnceEvent,
    rootUrl?: string
}

interface WebViewEventCallback {
    viewId: string,
    callback: (message: any) => any
}

export class WebViewHost {
    public rootUrl: string
    _browser: IBrowser
    _on: IOnEvent
    _once: IOnceEvent
    initialized = false
    isReady = false
    messageCallbacks = new Map<string, Array<WebViewEventCallback>>()
    jsToInvokeWhenReady = new Array<[string, any]>()
    messageResponsePromises = new Map<string, (response: WebViewResponse) => void>()

    constructor(params: WebViewHostParams) {
        if (!params.rootUrl)
            params.rootUrl = 'file:///Data/WebUI/WebUI/index.html'
        this._browser = params.browser
        this._on = params.on
        this._once = params.once
        this.rootUrl = params.rootUrl
    }

    public initialize() {
        if (!this.initialized) {
            this.initialized = true
            this._browser.loadUrl(this.rootUrl)
            this._browser.setVisible(true)
            this._on('browserMessage', message => this._handleBrowserMessage(message))
        }
    }

    public addToUI(component: WebView) {
        this.invokeViewFunction('addFromProps', component)
    }

    public removeFromUI(component: WebView) {
        this.invokeViewFunction('remove', component.id)
    }

    public on(messageType: 'load', viewId: string, callback: (message: WebViewLoadedEvent) => void): void
    public on(messageType: 'message', viewId: string, callback: (message: WebViewMessage) => void): void
    public on(messageType: 'event', viewId: string, callback: (message: WebViewEvent) => void): void
    public on(messageType: 'request', viewId: string, callback: (message: WebViewRequest) => void): void
    public on(messageType: string, viewId: string, callback: (message: any) => void): void
    public on(messageType: string, viewId: string, callback: (message: any) => void) {
        if (!this.messageCallbacks.has(messageType))
            this.messageCallbacks.set(messageType, Array<WebViewEventCallback>())
        const callbacks = this.messageCallbacks.get(messageType)
        if (callbacks)
            callbacks.push({ viewId, callback })
    }

    public async send(messageType: 'message', viewId: string, message: WebViewMessage): Promise<undefined>
    public async send(messageType: 'event', viewId: string, message: WebViewEvent): Promise<undefined>
    public async send(messageType: 'request', viewId: string, message: WebViewRequest): Promise<WebViewResponse>
    public async send(messageType: string, viewId: string, message: any): Promise<undefined>
    public async send(messageType: string, viewId: string, message: any): Promise<any> {
        if (messageType == 'request') {
            if (!message.replyId) message.replyId = this.getUniqueReplyId()
            return new Promise<WebViewResponse>(resolve => {
                this.invokeViewFunction('invokeMessage', { messageType, message, viewId, })
                this.messageResponsePromises.set(message.replyId, resolve)
            })
        } else {
            return new Promise<undefined>(resolve => {
                this.invokeViewFunction('invokeMessage', { messageType, message, viewId, })
                resolve(undefined)
            })
        }
    }

    public reply(request: WebViewRequest, viewId: string, response: WebViewResponse) {
        this.invokeViewFunction('onReply', { replyId: request.replyId, ...response })
    }

    public invokeViewFunction(functionName: string, parameters: any) {
        if (this.isReady)
            this._browser.executeJavaScript(`window.__webViewHost.${functionName}(${JSON.stringify(parameters)});`)
        else
            this.jsToInvokeWhenReady.push([functionName, parameters])
    }

    public getUniqueReplyId() {
        return `${Math.random()}_${Math.random()}`
    }

    _handleBrowserMessage(message: IBrowserMessageEvent) {
        this._once('update', () => {
            if (message.arguments.length && message.arguments[0] == "WebUI") {
                const browserMessage = message.arguments[1] as WebViewBrowserMessage
                if (browserMessage.messageType == 'webviewhostloaded') {
                    this.isReady = true
                    this.jsToInvokeWhenReady.forEach(jsToInvoke => {
                        this.invokeViewFunction(jsToInvoke[0], jsToInvoke[1])
                    })
                } else if (browserMessage.messageType == 'response') {
                    const replyId = browserMessage.message.replyId
                    if (replyId && this.messageResponsePromises.has(replyId)) {
                        this.messageResponsePromises.get(replyId)!(browserMessage.message.response)
                        this.messageResponsePromises.delete(replyId)
                    }
                } else {
                    const callbacks = this.messageCallbacks.get(browserMessage.messageType)
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
