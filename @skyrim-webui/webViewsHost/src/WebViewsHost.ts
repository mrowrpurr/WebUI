import WebView from './WebView'

export default class WebViewsHost {
    webViews = new Map<string, WebView>()

    public getWebViewIds(replyId: string) {
        this.reply(replyId, Array.from(this.webViews.keys()))
    }

    public registerWebView(webView: WebView) {
        this.webViews.set(webView.id, webView)
    }
    
    public unregisterWebView(id: string) {
        // TODO remove from the UI if present
        this.webViews.delete(id)
    }

    public getWebView(replyId: string, id: string) {
        this.reply(replyId, this.webViews.get(id))
    }

    public addToUI(id: string) {
        const webView = this.webViews.get(id)
        if (webView) {
            const iframe = document.createElement('iframe')
            iframe.src = webView.url
            document.body.appendChild(iframe)
        }
    }

    reply(replyId: string, data: any) {
        (window as any).skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data])
    }
}
