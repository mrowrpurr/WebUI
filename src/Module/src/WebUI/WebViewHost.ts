/*
 * Skyrim Platform Backend
 */

import WebView from './WebView'
import { WebViewBrowserMessage, WebViewMessage, WebViewEvent, WebViewRequest, WebViewResponse, WebViewLoadedEvent } from './WebViewEvents'
import { ISkyrimPlatform, IBrowser, IBrowserMessageEvent, OnBrowserMessage, OnceUpdate } from './ISkyrimPlatform'
import { Debug, once } from 'skyrimPlatform'

export interface WebViewHostParams {
    skyrimPlatform: ISkyrimPlatform,
    rootUrl?: string
}

interface WebViewEventCallback {
    viewId: string,
    callback: (message: any) => any
}

export default class WebViewHost {
    public rootUrl: string
    browser: IBrowser
    onBrowserMessage: OnBrowserMessage
    onceUpdate: OnceUpdate
    initialized = false
    isReady = false
    messageCallbacks = new Map<string, Array<WebViewEventCallback>>()
    jsToInvokeWhenReady = new Array<[string, any]>()
    messageResponsePromises = new Map<string, (response: WebViewResponse) => void>()
    webViews = new Map<string, WebView>()
    webViewsCurrentlyInUI = new Map<string, boolean>()
    onloadCallbacks = new Array<(arg: undefined) => void>()

    constructor(params: WebViewHostParams) {
        if (!params.rootUrl)
            params.rootUrl = 'file:///Data/WebUI/WebUI/index.html'
        this.browser = params.skyrimPlatform.browser
        this.onBrowserMessage = params.skyrimPlatform.onBrowserMessage
        this.onceUpdate = params.skyrimPlatform.onceUpdate
        this.rootUrl = params.rootUrl
        this.initialize()
    }

    public initialize() {
        if (!this.initialized) {
            this.initialized = true
            this.browser.loadUrl(this.rootUrl)
            this.browser.setVisible(true)
            this.onBrowserMessage('browserMessage', message => this._handleBrowserMessage(message))
        }
    }

    public addWebView(webView: WebView) {
        this.webViews.set(webView.id, webView)
        this.webViewsCurrentlyInUI.set(webView.id, false)
    }

    public removeWebView(id: string) {
        this.webViews.delete(id)
        this.webViewsCurrentlyInUI.delete(id)
    }

    public addToUI(webView: WebView) {
        this.addWebView(webView)
        this.webViewsCurrentlyInUI.set(webView.id, true)
        this.invokeViewFunction('addFromProps', {
            id: webView.id,
            url: webView.url,
            position: webView.position
        })
    }

    public removeFromUI(id: string) {
        this.invokeViewFunction('remove', id)
        this.webViewsCurrentlyInUI.set(id, false)
    }

    public toggleUI(webView: WebView) {
        if (this.webViewsCurrentlyInUI.has(webView.id) && this.webViewsCurrentlyInUI.get(webView.id))
            this.removeFromUI(webView.id)
        else
            this.addToUI(webView)
    }

    public getWebView(id: string) {
        return this.webViews.get(id)
    }

    public getWebViews() {
        return Array.from(this.webViews.values())
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
            this.browser.executeJavaScript(`window.__webViewHost.${functionName}(${JSON.stringify(parameters)});`)
        else
            this.jsToInvokeWhenReady.push([functionName, parameters])
    }

    public getUniqueReplyId() {
        return `${Math.random()}_${Math.random()}`
    }

    public async waitForLoad() {
        return new Promise<undefined>(resolve => {
            if (this.isReady)
                resolve(undefined)
            else
                this.onloadCallbacks.push(resolve)
        })
    }

    _handleBrowserMessage(message: IBrowserMessageEvent) {
        this.onceUpdate('update', () => {
            if (message.arguments.length && message.arguments[0] == "WebUI") {
                const browserMessage = message.arguments[1] as WebViewBrowserMessage
                if (browserMessage.messageType == 'webviewhostloaded') {
                    this.isReady = true
                    this.jsToInvokeWhenReady.forEach(jsToInvoke => {
                        this.invokeViewFunction(jsToInvoke[0], jsToInvoke[1])
                    })
                    this.onloadCallbacks.forEach(callback => callback(undefined))
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
