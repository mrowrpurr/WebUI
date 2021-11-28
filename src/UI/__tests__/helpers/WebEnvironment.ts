import { JSDOM } from 'jsdom'
import * as fs from 'fs'

const webViewHostJs = fs.readFileSync('./build/WebUI_WebViewHost.js').toString()

export interface SkyrimPlatformWebMessage {
    arguments: unknown[]
}

export default function getWebEnvironment(callback: (message: SkyrimPlatformWebMessage) => void): JSDOM {
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
