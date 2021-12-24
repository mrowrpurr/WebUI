import { IWebViewsHost, IWebView } from '@skyrim-webui/types'
import WebViewsHostSkyrimPlatformAPI from './WebViewsHostSkyrimPlatformAPI'

export default class WebViewsHost implements IWebViewsHost {
    private _window: Window | undefined
    private _webViews = new Map<string, IWebView>()
    private _iframes = new Map<string, HTMLIFrameElement>()

    id = 'WebViewHostExtension'

    scripts = [] // WebViewsHost uniquely has no scripts because it is bundled with WebUI.BrowserEnvironment

    async onRegister(window: Window): Promise<boolean> {
        this._window = window; // <--- TODO USE THIS
        (window as any).__webViewsHost__SkyrimPlatformAPI = new WebViewsHostSkyrimPlatformAPI(this)
        return true
    }

    async onUnregister(): Promise<boolean> {
        return true
    }

    async registerWebView(webView: IWebView): Promise<boolean> {
        if (this._webViews.has(webView.id))
            return false
        else {
            this._webViews.set(webView.id, webView)
            return true
        }
    }

    async unregisterWebView(id: string): Promise<boolean> {
        if (this._webViews.has(id)) {
            // this.removeFromUI(id)
            this._webViews.delete(id)
            return true
        } else
            return false
    }

    async updateWebView(webView: IWebView): Promise<boolean> {
        console.log(`UPDATING WEB VIEW`, webView)
        if (this._webViews.has(webView.id)) {
            // REPOSITION!
            // REDIRECT URL IF CHANGED!
            this._webViews.set(webView.id, webView)
            console.log("UPDATED THE WEB VIEW", webView.id)
            return true
        } else
            return false
    }

    async getWebViewIds(): Promise<Array<string>> {
        return Array.from(this._webViews.keys())
    }

    async getWebViews(): Promise<Array<IWebView>> {
        // TODO TEST ME
        return new Array<IWebView>()
    }

    async getWebView(id: string): Promise<IWebView | undefined> {
        return this._webViews.get(id)
    }

    async hasWebView(id: string): Promise<boolean> {
        return true
    }

    async addWebViewToUI(id: string): Promise<boolean> {
        if (! this._webViews.has(id) || this._iframes.has(id))
            return false

        const webView = this._webViews.get(id)!

        const iframe = document.createElement('iframe')
        this._iframes.set(id, iframe)
        iframe.src = webView.url
        iframe.dataset.webviewId = id
        // this.setIframePosition(iframe, webView)
        return new Promise<boolean>(resolve => {
            iframe.onload = (e) => resolve(true)
            document.body.appendChild(iframe)
        })
    }

    async removeWebViewFromUI(id: string): Promise<boolean> {
        return false
    }
    
    async showWebView(id: string): Promise<boolean> {
        return false
    }
    
    async hideWebView(id: string): Promise<boolean> {
        return false
    }
    
    async setWebViewMenuMode(id: string, menuMode: boolean): Promise<boolean> {
        return false
    }

    private async addScriptsAndWaitForLoad(scripts: Array<string>) {

    } 
}
