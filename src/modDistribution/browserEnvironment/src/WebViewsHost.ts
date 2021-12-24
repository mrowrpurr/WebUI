import { IWebViewsHost, IWebView } from '@skyrim-webui/types'

export default class WebViewsHost implements IWebViewsHost {
    private _window: Window | undefined

    id = 'WebViewHostExtension'

    scripts = [] // WebViewsHost uniquely has no scripts because it is bundled with WebUI.BrowserEnvironment

    async register(webView: IWebView): Promise<boolean> {
        return true
    }

    async unregister(id: string): Promise<boolean> {
        return true
    }

    async getWebViewIds(): Promise<Array<string>> {
        return new Array<string>()   
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
        this._window = window;

        (window as any).webViewsHost = 'WASSSSUP!?'
        
        return true
    }

    async onUnregister(): Promise<boolean> {
        return true
    }

    private async addScriptsAndWaitForLoad(scripts: Array<string>) {

    } 
}
