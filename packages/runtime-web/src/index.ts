import BrowserEnvironment from './BrowserEnvironment'
const browserEnvironment = new BrowserEnvironment(window);
(window as any).browserEnv = browserEnvironment;

// WebViewsHostExtension is part of the core WebUI product
// so we add the extension here (so we don't have to wait
// for the runtime plugin to add this extension)
import WebViewsHost from './WebViewsHost'
browserEnvironment.register(new WebViewsHost());

// ...
// FOR TESTIN...
(window as any).foo = "Hello?"
