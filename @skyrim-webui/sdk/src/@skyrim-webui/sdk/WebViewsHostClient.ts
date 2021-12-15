import { Debug } from 'skyrimPlatform'
import WebView from './WebView'

export interface WebViewsHostJavaScriptExecutor {
    (script: string): void
}

export default class WebViewsHostClient {
    private executeJS: WebViewsHostJavaScriptExecutor
    private replyCallbacks = new Map<string, (response: any) => void>()

    constructor(javascriptExecutor: WebViewsHostJavaScriptExecutor) {
        this.executeJS = javascriptExecutor
    }

    onBrowserMessage(messageArguments: unknown[]) {
        // ['WebUI', 'Reply', replyId, ['MyCoolWebView']]
        if (messageArguments && messageArguments.length == 4 && messageArguments[0] == 'WebUI' && messageArguments[1] == 'Reply') {
            const replyId = messageArguments[2] as string
            const response = messageArguments[3] as any
            if (this.replyCallbacks.has(replyId)) {
                this.replyCallbacks.get(replyId)!(response)
                this.replyCallbacks.delete(replyId)
            }
        }
    }

    async getWebViewIds() {
        return this.getResponse('getWebViewIds')
    }

    registerWebView(webView: WebView) {
        this.sendRequest('registerWebView', webView)
    }

    addToUI(id: string) {
        this.sendRequest('addToUI', id)
    }

    async getResponse(functionName: string, ...args: any[]) {
        return new Promise<any>(resolve => {
            const replyId = this.getReplyId()
            this.replyCallbacks.set(replyId, resolve)
            this.sendRequest(functionName, replyId, ...args)
        })
    }

    sendRequest(functionName: string, ...args: any[]) {
        Debug.messageBox(`SEND REQUEST ${functionName} ${JSON.stringify(args)}`)
        this.executeJS(`__webViewsHost__.${functionName}(${args.map(arg => JSON.stringify(arg)).join(', ')})`)
    }

    private getReplyId() {
        return `${Math.random()}_${Math.random()}`
    }
}