import IBrowserExtension from './IBrowserExtension';
import IWebView from './IWebView';
export default interface IWebViewsHost extends IBrowserExtension {
    register(webView: IWebView): Promise<boolean>;
    unregister(id: string): Promise<boolean>;
    getWebViews(): Promise<Array<IWebView>>;
    getWebViewIds(): Promise<Array<string>>;
    getWebView(id: string): Promise<IWebView | undefined>;
    hasWebView(id: string): Promise<boolean>;
}
