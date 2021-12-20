import { IBrowserEnvironment, IWebViewsHost } from '@skyrim-webui/types';
export default class BrowserEnvironment implements IBrowserEnvironment {
    WebViewsHost: IWebViewsHost;
    constructor(webViewHost: IWebViewsHost);
}
