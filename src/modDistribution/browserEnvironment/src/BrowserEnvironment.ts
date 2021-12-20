import { IBrowserEnvironment, IWebViewsHost } from '@skyrim-webui/types'
import WebViewsHost from './WebViewsHost';

export default class BrowserEnvironment implements IBrowserEnvironment {
    WebViewsHost: IWebViewsHost

    constructor(webViewHost: IWebViewsHost) {
        this.WebViewsHost = webViewHost
    }
}