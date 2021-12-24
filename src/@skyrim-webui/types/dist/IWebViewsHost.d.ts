import IBrowserExtension from './IBrowserExtension';
import IWebView from './IWebView';
export default interface IWebViewsHost extends IBrowserExtension {
    registerWebView(webView: IWebView): Promise<boolean>;
    unregisterWebView(id: string): Promise<boolean>;
    getWebViews(): Promise<Array<IWebView>>;
    getWebViewIds(): Promise<Array<string>>;
    getWebView(id: string): Promise<IWebView | undefined>;
    hasWebView(id: string): Promise<boolean>;
}
