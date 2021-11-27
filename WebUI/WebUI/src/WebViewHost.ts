/*
 * HTML Web Frontend
 */

import WebView, { WebViewProps } from './WebView'
import { WebViewMessage, WebViewEvent, WebViewRequest, WebViewResponse } from './WebViewEvents'

export class WebViewHost {
    webViews = new Map<string, WebView>()
    iframesByName = new Map<string, HTMLIFrameElement>()
    requestResultPromises = new Map<string, (data: any) => void>()

    public getView(id: string) {
        alert(`Getting view ${id} from ${this.webViews}`)
        const theView = this.webViews.get(id)
        alert(`THE VIEW TO RETURN FROM getView: ${theView}`)
        return this.webViews.get(id)
    }

    public add(webViewProps: WebViewProps) {
        const webView = new WebView(webViewProps)
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
        }
    }

    public remove(id: string) {
        this.webViews.delete(id)
        const iframe = this.iframesByName.get(id)
        document.documentElement.removeChild(iframe!)
        this.iframesByName.delete(id)
    }

    public async send(messageType: 'message', viewId: string, message: WebViewMessage): Promise<any>
    public async send(messageType: 'event', viewId: string, message: WebViewEvent): Promise<any>
    public async send(messageType: 'request', viewId: string, message: WebViewMessage): Promise<WebViewResponse>
    public async send(messageType: string, viewId: string, message: any): Promise<any>
    public async send(messageType: string, viewId: string, message: any): Promise<any> {
        // Invoke JS
        if (!message.source)
            message.source = viewId
        if (!message.target)
            message.target = viewId;
        (window as any).skyrimPlatform.sendMessage('WebUI', {
            messageType, message, target: viewId
        })
    }
}

export const webViewHostInstance = new WebViewHost()

export default webViewHostInstance
