import { IWebView } from '@skyrim-webui/types';
import { IWebViewsHost } from '@skyrim-webui/types';
export default class WebViewsHostSkyrimPlatformAPI {
    private _webViewsHost;
    constructor(webViewsHost: IWebViewsHost);
    private reply;
    getWebViewIds(replyId: string): Promise<void>;
    registerWebView(webView: IWebView): void;
    unregisterWebView(id: string): void;
    updateWebView(webView: IWebView): void;
    getWebView(replyId: string, id: string): Promise<void>;
    addWebViewToUI(id: string): void;
    removeWebViewFromUI(id: string): void;
    getScreenDimensions(replyId: string): Promise<void>;
}
