import { IWebViewsHost, IWebView } from '@skyrim-webui/types';
export default class WebViewsHost implements IWebViewsHost {
    id: string;
    scripts: string[];
    register(webView: IWebView): Promise<boolean>;
    unregister(id: string): Promise<boolean>;
    getWebViewIds(): Promise<Array<string>>;
    getWebViews(): Promise<Array<IWebView>>;
    getWebView(id: string): Promise<IWebView | undefined>;
    hasWebView(id: string): Promise<boolean>;
    onRegister(): Promise<boolean>;
    onUnregister(): Promise<boolean>;
}
