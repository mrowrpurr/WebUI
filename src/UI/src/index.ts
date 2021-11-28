import SkyrimAPI from './SkyrimAPI'
import WebViewHost from './WebViewHost'
import WebView from './WebView'

(window as any).__webViewHost = WebViewHost;
(window as any).getWebView = (id: string) => WebViewHost.getWebView(id);
(window as any).skyrim = SkyrimAPI;
(window as any).WebView = WebView

window.addEventListener('load', () => {
    (window as any).skyrimPlatform.sendMessage('WebUI', { messageType: 'webviewhostloaded' })
})

const h1 = document.createElement('h1')
h1.textContent = 'THIS WORKS'
document.body.appendChild(h1)
