import { IWebViewsHost, IWebView } from '@skyrim-webui/types'

export default class WebViewsHost implements IWebViewsHost {
    id = 'WebViewHostExtension'
    scripts = ['TODO']

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

    async onRegister(): Promise<boolean> {
        return true
    }

    async onUnregister(): Promise<boolean> {
        return true
    }
}
