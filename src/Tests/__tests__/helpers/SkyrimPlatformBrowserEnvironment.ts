import { JSDOM } from 'jsdom'
import * as fs from 'fs'

const webViewHostJs = fs.readFileSync('../UI/build/WebUI_WebViewHost.js').toString()

export function getBrowserEnvironment(initialized: boolean = true): SkyrimPlatformBrowserEnvironment {
    return new SkyrimPlatformBrowserEnvironment(initialized)
}

export interface SkyrimPlatformSendMessage {
    arguments: any[]
}

export class SkyrimPlatformBrowserEnvironment {
    public dom: JSDOM

    sendMessageCallbacks = new Array<(message: SkyrimPlatformSendMessage) => void>()

    constructor(initializeEnvironment: boolean = true) {
        if (initializeEnvironment)
            this.dom = this.newEnvironment()
        else
            this.dom = new JSDOM('')
    }

    public reset() {
        this.sendMessageCallbacks = new Array<(message: SkyrimPlatformSendMessage) => void>()
        this.dom = this.newEnvironment()
    }

    public initialize() {
        this.reset()
    }

    public onSendMessage(callback: (message: SkyrimPlatformSendMessage) => void) {
        this.sendMessageCallbacks.push(callback)
    }

    public sendMessage(...args: any[]) {
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
            sendMessage: (...args: any[]) => {
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

