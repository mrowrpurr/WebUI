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

export class WebViewHost {
    webViews = new Map<string, WebView>()
    iframesByName = new Map<string, HTMLIFrameElement>()
    requestResultPromises = new Map<string, (data: any) => void>()
    messageCallbacks = new Map<string, Array<WebViewEventCallback>>()

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
        (window as any).alert(`frontend ON ${messageType}`)
        if (!this.messageCallbacks.has(messageType))
            this.messageCallbacks.set(messageType, Array<WebViewEventCallback>())
        const callbacks = this.messageCallbacks.get(messageType)
        if (callbacks)
            callbacks.push({ viewId, callback })
    }

    public async send(messageType: 'message', viewId: string, message: WebViewMessage): Promise<any>
    public async send(messageType: 'event', viewId: string, message: WebViewEvent): Promise<any>
    public async send(messageType: 'request', viewId: string, message: WebViewMessage): Promise<WebViewResponse>
    public async send(messageType: 'load', viewId: string, message: WebViewMessage): Promise<any>
    public async send(messageType: string, viewId: string, message: any): Promise<any>
    public async send(messageType: string, viewId: string, message: any): Promise<any> {
        // Invoke JS
        if (!message.source) message.source = viewId
        if (!message.target) message.target = viewId;
        (window as any).alert(`Sending Message from Frontend to Backend: ${messageType} ${JSON.stringify(message)}`);
        (window as any).skyrimPlatform.sendMessage('WebUI', {
            messageType, message, target: viewId
        })
        // TODO return Promise
    }

    // TODO: refactor the viewId / target inconsistencies
    public invokeMessage(properties: InvokeMessageProps) {
        (window as any).alert(`frontend INVOKE ${properties.messageType}`)
        const callbacks = this.messageCallbacks.get(properties.messageType);
        (window as any).alert(`[Frontend] invokeMessage received from Backend: ${JSON.stringify(properties)} --> ${callbacks!.length}`)
        if (callbacks)
            callbacks.forEach(callback => {
                (window as any).alert(`CALLBACK: ${callback}`)
                if ((!callback.viewId) || callback.viewId == properties.viewId)
                    callback.callback(properties.message)
            })
    }
}

export const webViewHostInstance = new WebViewHost()

export default webViewHostInstance
