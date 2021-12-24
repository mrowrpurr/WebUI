import BrowserEnvironment from './BrowserEnvironment';
var browserEnvironment = new BrowserEnvironment(window);
window.browserEnv = browserEnvironment;
import WebViewsHost from './WebViewsHost';
browserEnvironment.register(new WebViewsHost());
window.foo = "Hello?";
