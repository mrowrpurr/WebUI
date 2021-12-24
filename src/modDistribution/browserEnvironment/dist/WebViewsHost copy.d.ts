import { IWebViewsHost, IWebView } from '@skyrim-webui/types';
export default class WebViewsHost implements IWebViewsHost {
    private _window;
    id: string;
    scripts: never[];
    register(webView: IWebView): Promise<boolean>;
    unregister(id: string): Promise<boolean>;
    getWebViewIds(): Promise<Array<string>>;
    getWebViews(): Promise<Array<IWebView>>;
    getWebView(id: string): Promise<IWebView | undefined>;
    hasWebView(id: string): Promise<boolean>;
    onRegister(window: Window): Promise<boolean>;
    onUnregister(): Promise<boolean>;
    private addScriptsAndWaitForLoad;
}
