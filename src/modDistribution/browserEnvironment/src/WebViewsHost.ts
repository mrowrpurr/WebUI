import { IWebViewsHost, IWebView } from '@skyrim-webui/types'
import WebViewsHostSkyrimPlatformAPI from './WebViewsHostSkyrimPlatformAPI'

export default class WebViewsHost implements IWebViewsHost {
    private _window: Window | undefined
    private _webViews = new Map<string, IWebView>()

    id = 'WebViewHostExtension'

    scripts = [] // WebViewsHost uniquely has no scripts because it is bundled with WebUI.BrowserEnvironment

    async registerWebView(webView: IWebView): Promise<boolean> {
        if (this._webViews.has(webView.id))
            return false
        else {
            this._webViews.set(webView.id, webView)
            return true
        }
    }

    async unregisterWebView(id: string): Promise<boolean> {
        return true
    }

    async getWebViewIds(): Promise<Array<string>> {
        return Array.from(this._webViews.keys())
    }

    async getWebViews(): Promise<Array<IWebView>> {
        return new Array<IWebView>()
    }

    async getWebView(id: string): Promise<IWebView | undefined> {
        return
    }

    async hasWebView(id: string): Promise<boolean> {
        return true
    }

    async onRegister(window: Window): Promise<boolean> {
        this._window = window; // <--- TODO USE THIS
        (window as any).__webViewsHost__SkyrimPlatformAPI = new WebViewsHostSkyrimPlatformAPI(this)
        return true
    }

    async onUnregister(): Promise<boolean> {
        return true
    }

    private async addScriptsAndWaitForLoad(scripts: Array<string>) {

    } 
}
