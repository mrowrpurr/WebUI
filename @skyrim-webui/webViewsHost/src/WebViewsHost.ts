import WebView from './WebView'

export default class WebViewsHost {
    webViews = new Map<string, WebView>()

    reply(replyId: string, data: any) {
        (window as any).skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data])
    }

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
}