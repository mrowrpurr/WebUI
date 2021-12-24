import { IWebViewsHost, IWebView } from '@skyrim-webui/types';
export default class WebViewsHost implements IWebViewsHost {
    private _window;
    private _webViews;
    private _iframes;
    id: string;
    scripts: never[];
    onRegister(window: Window): Promise<boolean>;
    onUnregister(): Promise<boolean>;
    registerWebView(webView: IWebView): Promise<boolean>;
    unregisterWebView(id: string): Promise<boolean>;
    updateWebView(webView: IWebView): Promise<boolean>;
    getWebViewIds(): Promise<Array<string>>;
    getWebViews(): Promise<Array<IWebView>>;
    getWebView(id: string): Promise<IWebView | undefined>;
    hasWebView(id: string): Promise<boolean>;
    addWebViewToUI(id: string): Promise<boolean>;
    removeWebViewFromUI(id: string): Promise<boolean>;
    showWebView(id: string): Promise<boolean>;
    hideWebView(id: string): Promise<boolean>;
    setWebViewMenuMode(id: string, menuMode: boolean): Promise<boolean>;
    private addScriptsAndWaitForLoad;
}
