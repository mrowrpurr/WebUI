import WebView from './WebView'

export default class WebViewsHost {
    webViews = new Map<string, WebView>()

    reply(replyId: string, data: any) {
        (window as any).skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data])
    }

    public getWebViewIds(replyId: string) {
        this.reply(replyId, Array.from(this.webViews.keys()))
    }
}