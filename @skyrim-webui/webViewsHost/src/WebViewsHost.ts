import WebView from './WebView'

export default class WebViewsHost {
    private webViews = new Map<string, WebView>()
    private iframes = new Map<string, HTMLIFrameElement>()

    getWebViewIds(replyId: string) {
        this.reply(replyId, Array.from(this.webViews.keys()))
    }

    registerWebView(webView: WebView) {
        this.webViews.set(webView.id, webView)
    }
    
    unregisterWebView(id: string) {
        this.removeFromUI(id)
        this.webViews.delete(id)
    }

    getWebView(replyId: string, id: string) {
        this.reply(replyId, this.webViews.get(id))
    }

    addToUI(id: string) {
        const webView = this.webViews.get(id)
        if (webView && ! this.iframes.has(webView.id)) {
            const iframe = document.createElement('iframe')
            this.iframes.set(id, iframe)
            iframe.src = webView.url
            iframe.dataset.webviewId = id
            this.setIframePosition(iframe, webView)
            document.body.appendChild(iframe)
        }
    }

    removeFromUI(id: string) {
        if (this.iframes.has(id)) {
            document.body.removeChild(this.iframes.get(id)!)
            this.iframes.delete(id)
        }
    }

    isInUI(replyId: string, id: string) {
        this.reply(replyId, this.iframes.has(id))
    }

    getScreenDimensions(replyId: string) {
        this.reply(replyId, [window.innerHeight, window.innerWidth])
    }

    private reply(replyId: string, data: any) {
        (window as any).skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data])
    }

    private setIframePosition(iframe: HTMLIFrameElement, webView: WebView) {
        if (webView.positionType == 'absolute') {
            iframe.style.width = webView.width.toString()
            iframe.style.height = webView.height.toString()
            iframe.style.left = webView.x.toString()
            iframe.style.top = webView.y.toString()
        } else {
            iframe.style.width = `${window.innerWidth * (webView.width / 100)}px`
            iframe.style.height = `${window.innerHeight * (webView.height / 100)}px`
            iframe.style.left = `${window.innerWidth * (webView.x / 100)}px`
            iframe.style.top = `${window.innerHeight * (webView.y / 100)}px`
        }
    }
}
