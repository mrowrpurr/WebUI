// TODO import something else which dependency injects browser...
import { browser } from 'skyrimPlatform'

export class WebUIRuntime {
    public static run(webViewsHostURI = 'file:///Data/WebUI/__WebUI__/webViewsHost.html') {
        new WebUIRuntime().run(webViewsHostURI)
    } 

    run(webViewsHostURI: string) {
        browser.setVisible(false)

        browser.loadUrl(webViewsHostURI)
        // Wait for load! Via browserMessage

        browser.setVisible(true)
    }
}