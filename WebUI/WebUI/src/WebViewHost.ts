/*
 * HTML Web Frontend
 */

import WebView, { WebViewProps } from './WebView'
import { WebViewMessage, WebViewEvent, WebViewRequest, WebViewResponse } from './WebViewEvents'

interface WebViewEventCallback {
    viewId: string,
    callback: (message: any) => any
}

interface InvokeMessageProps {
    messageType: string, viewId: string, message: any
}

interface OnReplyProps extends WebViewResponse {
    replyId: string
}

export class WebViewHost {
    webViews = new Map<string, WebView>()
    iframesByName = new Map<string, HTMLIFrameElement>()
    requestResultPromises = new Map<string, (data: any) => void>()
    messageCallbacks = new Map<string, Array<WebViewEventCallback>>()
    messageResponsePromises = new Map<string, (response: WebViewResponse) => void>()

    public getWebView(id: string) {
        return this.webViews.get(id)
    }

    public addFromProps(webViewProps: WebViewProps) {
        this.add(new WebView(webViewProps))
    }

    public add(webView: WebView) {
        if (this.webViews.has(webView.id))
            this.remove(webView.id)
        else
            this.webViews.set(webView.id, webView)
        const iframe = document.createElement('iframe')
        this.iframesByName.set(webView.id, iframe)
        iframe.style.left = (window.innerWidth * (webView.position.x / 100)).toFixed() + 'px'
        iframe.style.top = (window.innerHeight * (webView.position.y / 100)).toFixed() + 'px'
        iframe.style.height = (window.innerHeight * (webView.position.height / 100)).toFixed() + 'px'
        iframe.style.width = (window.innerWidth * (webView.position.width / 100)).toFixed() + 'px'
        iframe.frameBorder = '0'
        iframe.scrolling = 'false'
        iframe.src = webView.url
        document.documentElement.appendChild(iframe)
        if (iframe.contentWindow) {
            iframe.contentWindow.onerror = function(msg, url, linenumber) {
                alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber)
                return true
            }
            iframe.contentWindow.addEventListener('load', () => {
                this.send('load', webView.id, {
                    viewId: webView.id
                })
            })
        }
    }

    public remove(id: string) {
        this.webViews.delete(id)
        const iframe = this.iframesByName.get(id)
        document.documentElement.removeChild(iframe!)
        this.iframesByName.delete(id)
    }

    public on(messageType: 'event', viewId: string, callback: (message: WebViewEvent) => void): void
    public on(messageType: 'request', viewId: string, callback: (message: WebViewRequest) => void): void
    public on(messageType: 'message', viewId: string, callback: (message: WebViewMessage) => void): void
    public on(messageType: string, viewId: string, callback: (message: any) => void): void
    public on(messageType: string, viewId: string, callback: (message: any) => void): void {
        if (!this.messageCallbacks.has(messageType))
            this.messageCallbacks.set(messageType, Array<WebViewEventCallback>())
        const callbacks = this.messageCallbacks.get(messageType)
        if (callbacks)
            callbacks.push({ viewId, callback })
    }

    public async send(messageType: 'message', viewId: string, message: WebViewMessage): Promise<undefined>
    public async send(messageType: 'event', viewId: string, message: WebViewEvent): Promise<undefined>
    public async send(messageType: 'request', viewId: string, message: WebViewRequest): Promise<WebViewResponse>
    public async send(messageType: 'load', viewId: string, message: WebViewMessage): Promise<undefined>
    public async send(messageType: string, viewId: string, message: any): Promise<undefined>
    public async send(messageType: string, viewId: string, message: any): Promise<any> {
        if (!message.source) message.source = viewId
        if (!message.target) message.target = viewId
        if (messageType == 'request') {
            if (!message.replyId) message.replyId = this.getUniqueReplyId()
            return new Promise<WebViewResponse>(resolve => {
                (window as any).skyrimPlatform.sendMessage('WebUI', { messageType, message, target: viewId })
                this.messageResponsePromises.set(message.replyId, resolve)
            })
        } else {
            return new Promise<undefined>(resolve => {
                (window as any).skyrimPlatform.sendMessage('WebUI', { messageType, message, target: viewId })
                resolve(undefined)
            })
        }
    }

    // TODO: abstract window.skyrimPlatform with an object we can provide to the webviewhost

    public reply(request: WebViewRequest, viewId: string, response: WebViewResponse) {
        (window as any).skyrimPlatform.sendMessage('WebUI', {
            target: viewId,
            messageType: 'response',
            message: { replyId: request.replyId, response: response }
        })
    }

    public onReply(properties: OnReplyProps) {
        if (this.messageResponsePromises.has(properties.replyId)) {
            const response = properties as WebViewResponse
            this.messageResponsePromises.get(properties.replyId)!(response)
            this.messageResponsePromises.delete(properties.replyId)
        }
    }

    // TODO: refactor the viewId / target inconsistencies
    public invokeMessage(properties: InvokeMessageProps) {
        const callbacks = this.messageCallbacks.get(properties.messageType)
        if (callbacks)
            callbacks.forEach(callback => {
                if ((!callback.viewId) || callback.viewId == properties.viewId)
                    callback.callback(properties.message)
            })
    }

    public getUniqueReplyId() {
        return `${Math.random()}_${Math.random()}`
    }
}

export const webViewHostInstance = new WebViewHost()

export default webViewHostInstance
