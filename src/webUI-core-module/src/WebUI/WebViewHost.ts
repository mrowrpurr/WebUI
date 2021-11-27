import { browser, on, once, BrowserMessageEvent, Debug } from 'skyrimPlatform'
import WebView from './WebView'
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
        Debug.messageBox('INITIALIZING')
        if (!this.initialized) {
            this.initialized = true
            browser.loadUrl(this.rootUrl)
            browser.setVisible(true)
            on('browserMessage', message => this._handleBrowserMessage(message))
        }
    }

    public addToUI(component: WebView) {
        this.invokeViewFunction('add', component)
        Debug.messageBox(`Added ${component.id} to UI`)
    }

    public removeFromUI(component: WebView) {
        Debug.messageBox("TODO - remove WebView from UI")
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
        Debug.messageBox(`TODO: send(${messageType})`)
    }

    public invokeViewFunction(functionName: string, parameters: any) {
        Debug.messageBox(`INVOKE JS: window.webUI.${functionName}(${JSON.stringify(parameters)}); => Ready: ${this.isReady}`)
        if (this.isReady)
            browser.executeJavaScript(`window.webUI.${functionName}(${JSON.stringify(parameters)});`)
        else
            this.jsToInvokeWhenReady.push([functionName, parameters])
    }

    _handleBrowserMessage(message: BrowserMessageEvent) {
        once('update', () => {
            Debug.messageBox(`INCOMING BROWSER MESSAGE ${JSON.stringify(message)}`)
            if (message.arguments.length && message.arguments[0] == "WebUI") {
                const browserMessage = message.arguments[1] as WebViewBrowserMessage
                Debug.messageBox(`AS BROWSER MESSAGE: ${JSON.stringify(browserMessage)}`)
                if (browserMessage.messageType == 'webviewhostloaded') {
                    Debug.messageBox("IF!")
                    Debug.messageBox(`It loaded! Now to run ${this.jsToInvokeWhenReady.length} JS functions!`)
                    this.isReady = true
                    this.jsToInvokeWhenReady.forEach(jsToInvoke => {
                        this.invokeViewFunction(jsToInvoke[0], jsToInvoke[1])
                    })
                } else {
                    Debug.messageBox("ELSE!")
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