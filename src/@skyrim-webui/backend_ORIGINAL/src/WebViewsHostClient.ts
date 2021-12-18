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

    registerWebView(webView: WebView) {
        this.sendRequest('registerWebView', webView)
    }

    unregisterWebView(id: string) {
        this.sendRequest('unregisterWebView', id)
    }

    async getWebViewIds(): Promise<Array<number>> {
        return this.getResponse('getWebViewIds')
    }

    async getWebView(id: string): Promise<WebView | null> {
        return this.getResponse('getWebView', id)
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
        this.executeJS(`__webViewsHost__.${functionName}(${args.map(arg => JSON.stringify(arg)).join(', ')})`)
    }

    private getReplyId() {
        return `${Math.random()}_${Math.random()}`
    }
}