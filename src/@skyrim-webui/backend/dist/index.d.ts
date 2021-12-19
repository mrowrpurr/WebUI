import WebView from './WebView';
import WebViewsHostClient from './WebViewsHostClient';
export declare function getWebViewsHostClient(): WebViewsHostClient;
export declare function registerWebView(webView: WebView): void;
export declare function getWebViewIds(): Promise<number[]>;
