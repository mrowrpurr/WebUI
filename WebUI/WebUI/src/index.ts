import SkyrimAPI from './SkyrimAPI'
import WebViewHost from './WebViewHost'

(window as any).__webViewHost = WebViewHost;
(window as any).getWebView = (id: string) => WebViewHost.getView(id);
(window as any).skyrim = SkyrimAPI

window.addEventListener('load', () => {
    (window as any).skyrimPlatform.sendMessage('WebUI', { messageType: 'webviewhostloaded' })
})
