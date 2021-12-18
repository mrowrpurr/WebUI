import WebView from './WebView';
export interface WebViewsHostJavaScriptExecutor {
    (script: string): void;
}
export default class WebViewsHostClient {
    private executeJS;
    private replyCallbacks;
    constructor(javascriptExecutor: WebViewsHostJavaScriptExecutor);
    onBrowserMessage(messageArguments: unknown[]): void;
    registerWebView(webView: WebView): void;
    unregisterWebView(id: string): void;
    getWebViewIds(): Promise<Array<number>>;
    getWebView(id: string): Promise<WebView | null>;
    addToUI(id: string): void;
    getResponse(functionName: string, ...args: any[]): Promise<any>;
    sendRequest(functionName: string, ...args: any[]): void;
    private getReplyId;
}
