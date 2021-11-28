import { JSDOM } from 'jsdom'
import * as fs from 'fs'

const webViewHostJs = fs.readFileSync('../UI/build/WebUI_WebViewHost.js').toString()

export function getBrowserEnvironment(): SkyrimPlatformBrowserEnvironment {
    return new SkyrimPlatformBrowserEnvironment()
}

export interface SkyrimPlatformSendMessage {
    arguments: unknown[]
}

export class SkyrimPlatformBrowserEnvironment {
    public dom: JSDOM

    sendMessageCallbacks = new Array<(message: SkyrimPlatformSendMessage) => void>()

    constructor() {
        this.dom = this.newEnvironment()
    }

    public reset() {
        this.sendMessageCallbacks = new Array<(message: SkyrimPlatformSendMessage) => void>()
        this.dom = this.newEnvironment()
    }

    public onSendMessage(callback: (message: SkyrimPlatformSendMessage) => void) {
        this.sendMessageCallbacks.push(callback)
    }

    public sendMessage(...args: unknown[]) {
        this.dom.window.skyrimPlatform.sendMessage(...args) // <--- send using our mocked window.skyrimPlatform
    }

    public getWindow() {
        return this.dom.window
    }

    public getDocument() {
        return this.dom.window.document
    }

    public getElementById(id: string) {
        return this.dom.window.document.getElementById(id)
    }

    public querySelector(selector: string) {
        return this.dom.window.document.querySelector(selector)
    }

    public querySelectorAll(selector: string) {
        return this.dom.window.document.querySelectorAll(selector)
    }

    newEnvironment() {
        const jsdom = new JSDOM('', { runScripts: 'dangerously', resources: 'usable', url: `file://${__dirname}/index.html` })
        jsdom.window.skyrimPlatform = {
            sendMessage: (...args: unknown[]) => {
                this.sendMessageCallbacks.forEach(callback => {
                    callback({ arguments: args })
                })
            }
        }
        const script = jsdom.window.document.createElement('script')
        script.textContent = webViewHostJs
        jsdom.window.document.documentElement.appendChild(script)
        return jsdom
    }
}

