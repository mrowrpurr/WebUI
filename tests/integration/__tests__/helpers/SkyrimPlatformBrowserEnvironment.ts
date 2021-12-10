import { JSDOM, DOMWindow } from 'jsdom'

export class SkyrimPlatformBrowserEnvironment {
    public dom: JSDOM | undefined
    public document: Document | undefined
    public window: DOMWindow | undefined

    constructor() {
        this.dom = new JSDOM('', { runScripts: 'dangerously', resources: 'usable' })
        this.window = this.dom.window
        this.document = this.dom.window.document
    }

    public querySelector(selector: string) {
        return this.document?.querySelector(selector)
    }

    public querySelectorAll(selector: string) {
        return this.document?.querySelectorAll(selector)
    }

    public getElementById(id: string) {
        return this.document?.getElementById(id)
    }

    public runJavaScript(js: string) {
        if (this.document) {
            const script = this.document.createElement('script')
            script.textContent = js
            this.document.documentElement.appendChild(script)
        }
    }
}

export function getBrowserEnvironment() {
    return new SkyrimPlatformBrowserEnvironment()
}