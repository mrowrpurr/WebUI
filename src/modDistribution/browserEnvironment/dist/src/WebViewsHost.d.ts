import { IWebViewsHost, IWebView } from '@skyrim-webui/types';
export default class WebViewsHost implements IWebViewsHost {
    private _window;
    private _webViews;
    id: string;
    scripts: never[];
    registerWebView(webView: IWebView): Promise<boolean>;
    unregisterWebView(id: string): Promise<boolean>;
    getWebViewIds(): Promise<Array<string>>;
    getWebViews(): Promise<Array<IWebView>>;
    getWebView(id: string): Promise<IWebView | undefined>;
    hasWebView(id: string): Promise<boolean>;
    onRegister(window: Window): Promise<boolean>;
    onUnregister(): Promise<boolean>;
    private addScriptsAndWaitForLoad;
}
