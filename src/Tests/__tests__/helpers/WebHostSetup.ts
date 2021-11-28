import { JSDOM } from 'jsdom'
import * as fs from 'fs'
import WebView from 'WebUI/WebView'

const webViewHostJs = fs.readFileSync('../UI/build/WebUI_WebViewHost.js').toString()

export function createWebHost() {

}

export interface SkyrimPlatformWebMessage {
    arguments: unknown[]
}

// Update this to return a Promise and return once the script is ready, perhaps?
export function getWebEnvironment(callback: (message: SkyrimPlatformWebMessage) => void): JSDOM {
    const jsdom = new JSDOM('', { runScripts: 'dangerously', resources: 'usable', url: `file://${__dirname}/index.html` })
    const script = jsdom.window.document.createElement('script')
    script.textContent = webViewHostJs
    jsdom.window.document.documentElement.appendChild(script)
    jsdom.window.skyrimPlatform = {
        sendMessage: (...args: unknown[]) => {
            callback({ arguments: args })
        }
    }
    return jsdom
}
