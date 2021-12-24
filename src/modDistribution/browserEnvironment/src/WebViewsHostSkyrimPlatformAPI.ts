import { IWebView } from '@skyrim-webui/types'
import { IWebViewsHost } from '@skyrim-webui/types'

export default class WebViewsHostSkyrimPlatformAPI {
    private _webViewsHost: IWebViewsHost

    constructor(webViewsHost: IWebViewsHost) {
        this._webViewsHost = webViewsHost
    }

    private reply(replyId: string, data: any) {
        (window as any).skyrimPlatform.sendMessage(['WebUI', 'Reply', replyId, data])
    }

    async getWebViewIds(replyId: string) {
        this.reply(replyId, await this._webViewsHost.getWebViewIds())
    }

    registerWebView(webView: IWebView) {
        this._webViewsHost.registerWebView(webView)
    }

    // private webViews = new Map<string, IWebView>()
    // private iframes = new Map<string, HTMLIFrameElement>()

    // // TODO --> unregister
    // unregisterWebView(id: string) {
    //     this.removeFromUI(id)
    //     this.webViews.delete(id)
    // }

    // // TODO --> get()
    // getWebView(replyId: string, id: string) {
    //     this.reply(replyId, this.webViews.get(id))
    // }

    // update(id: string, { url, positionType, x, y, width, height } : { url?: string, positionType?: string, x?: number, y?: number, width?: number, height?: number }) {
    //     const webView = this.webViews.get(id)
    //     if (webView) {
    //         if (url) webView.url = url
    //         if (positionType) webView.positionType = positionType
    //         if (x) webView.x = x
    //         if (y) webView.y = y
    //         if (width) webView.width = width
    //         if (height) webView.height = height
    //     }
    // }

    // addToUI(id: string) {
    //     const webView = this.webViews.get(id)
    //     if (webView && ! this.iframes.has(webView.id)) {
    //         const iframe = document.createElement('iframe')
    //         this.iframes.set(id, iframe)
    //         iframe.src = webView.url
    //         iframe.dataset.webviewId = id
    //         this.setIframePosition(iframe, webView)
    //         document.body.appendChild(iframe)
    //     }
    // }

    // removeFromUI(id: string) {
    //     if (this.iframes.has(id)) {
    //         document.body.removeChild(this.iframes.get(id)!)
    //         this.iframes.delete(id)
    //     }
    // }

    // isInUI(replyId: string, id: string) {
    //     this.reply(replyId, this.iframes.has(id))
    // }

    // move(id: string, { positionType, x, y, width, height } : { positionType?: string, x?: number, y?: number, width?: number, height?: number }) {
    //     const iframe = this.iframes.get(id)
    //     if (iframe) {
    //         const webView = this.webViews.get(id)
    //         if (webView) {
    //             // TODO --> use update
    //             if (positionType) webView.positionType = positionType
    //             if (x) webView.x = x
    //             if (y) webView.y = y
    //             if (width) webView.width = width
    //             if (height) webView.height = height
    //             this.setIframePosition(iframe, webView)
    //         }
    //     }
    // }

    // getScreenDimensions(replyId: string) {
    //     this.reply(replyId, [window.innerHeight, window.innerWidth])
    // }

    // private setIframePosition(iframe: HTMLIFrameElement, webView: WebView) {
    //     if (webView.positionType == 'absolute') {
    //         iframe.style.width = webView.width.toString()
    //         iframe.style.height = webView.height.toString()
    //         iframe.style.left = webView.x.toString()
    //         iframe.style.top = webView.y.toString()
    //     } else {
    //         iframe.style.width = `${window.innerWidth * (webView.width / 100)}px`
    //         iframe.style.height = `${window.innerHeight * (webView.height / 100)}px`
    //         iframe.style.left = `${window.innerWidth * (webView.x / 100)}px`
    //         iframe.style.top = `${window.innerHeight * (webView.y / 100)}px`
    //     }
    // }
}
