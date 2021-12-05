import { JSDOM } from 'jsdom'
import * as fs from 'fs'
import { ISkyrimPlatform, IBrowser, OnBrowserMessage, OnceUpdate } from 'WebUI/ISkyrimPlatform'

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

    public getMockBrowser(): IBrowser {
        return new MockBrowser(this.dom)
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

export interface MockSkyrimPlatformParams {
    on: OnBrowserMessage, once: OnceUpdate, browser: IBrowser
}

export class MockSkyrimPlatform implements ISkyrimPlatform {
    public onBrowserMessage: OnBrowserMessage
    public onceUpdate: OnceUpdate
    public browser: IBrowser

    constructor(params: MockSkyrimPlatformParams) {
        this.onBrowserMessage = params.on
        this.onceUpdate = params.once
        this.browser = params.browser
    }
}

export class MockBrowser implements IBrowser {
    jsdom: JSDOM
    public mockBrowserIsVisible = false
    public mockBrowserIsFocused = false
    public mockBrowserLoadedURL = ''

    constructor(jsdom: JSDOM) {
        this.jsdom = jsdom
    }

    public setVisible(toggle: boolean) {
        this.mockBrowserIsVisible = toggle
    }

    public setFocused(toggle: boolean) {
        this.mockBrowserIsFocused = toggle
    }

    public loadUrl(url: string) {
        this.mockBrowserLoadedURL = url
    }

    public executeJavaScript(javaScriptCode: string) {
        const script = this.jsdom.window.document.createElement('script')
        script.textContent = javaScriptCode
        this.jsdom.window.document.documentElement.appendChild(script)
    }
}

