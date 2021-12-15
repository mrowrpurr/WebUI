export interface WebViewsHostJavaScriptExecutor {
    (script: string): void
}

export default class WebViewsHostClient {
    private executeJS: WebViewsHostJavaScriptExecutor

    constructor(javascriptExecutor: WebViewsHostJavaScriptExecutor) {
        this.executeJS = javascriptExecutor
    }

    onBrowserMessage(messsage: unknown[]) {

    }
}