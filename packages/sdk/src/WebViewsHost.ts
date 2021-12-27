import { printConsole } from '@skyrim-platform/skyrim-platform'
import { IWebView, IWebViewsHost, WebViewPosition, ScreenDimensions } from '@skyrim-webui/types'
// import { BrowserMessageEvent } from '@skyrim-platform/skyrim-platform'

export default class WebViewsHost implements IWebViewsHost {
    id = 'WebViewHostExtension'
    scripts = [] // WebViewsHost uniquely has no scripts because it is bundled with WebUI.BrowserEnvironment

    // private onBrowserMessage: (callback: (message: BrowserMessageEvent) => void) => void
    private executeJavaScript: (javaScript: string) => void

    constructor(params: { executeJavaScript: (javaScript: string) => void }) {
        this.executeJavaScript = params.executeJavaScript
    }

    // constructor(onBrowserMessage: (callback: (message: BrowserMessageEvent) => void) => void) {
    //     this.onBrowserMessage = onBrowserMessage
    // }

    // listen() {
    //     this.onBrowserMessage(message => {
    //         // TODO
    //     })
    // }

    async onRegister(window: Window): Promise<boolean> {
        return true
    }

    async onUnregister(): Promise<boolean> {
        return true
    }

    async registerWebView(webView: IWebView): Promise<boolean> {
        printConsole('registering web view...')
        printConsole(`REGISTER WEB VIEW ${JSON.stringify(webView)}`)
        return true
    }

    async unregisterWebView(id: string): Promise<boolean> {
        return true
    }

    async updateWebView(webView: IWebView): Promise<boolean> {
        return true
    }

    async getWebViewIds(): Promise<Array<string>> {
        return []
    }

    async getWebViews(): Promise<Array<IWebView>> {
        return new Array<IWebView>()
    }

    async getWebView(id: string): Promise<IWebView | undefined> {
        return
    }

    async hasWebView(id: string): Promise<boolean> {
        return false
    }

    async addWebViewToUI(id: string): Promise<boolean> {
        return false
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

    async getScreenDimensions(): Promise<ScreenDimensions> {
        return { width: window.innerWidth, height: window.innerHeight }
    }

    async moveWebView(id: string, position: WebViewPosition): Promise<boolean> {
        return false
    }

    async redirectWebViewUrl(id: string, url: string): Promise<boolean> {
        return false
    }

    private invokeAPI() {

    }

    // private makeRequest(): Promise<something> {

    // }
}