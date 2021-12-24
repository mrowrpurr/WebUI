import { IWebView, WebViewPosition } from '@skyrim-webui/types'

export default class WebView implements IWebView {
    readonly id: string
    readonly url: string
    
    isMenu = false
    position = {
        type: 'absolute',
        info: { x: 0, y: 0, width: 100, height: 100 }
    }

    constructor(id: string, url: string) {
        this.id = id
        this.url = url
    }

    async addToUI(): Promise<boolean> {
        return true
    }

    async removeFromUI(): Promise<boolean> {
        return true
    }

    async show(): Promise<boolean> {
        return true
    }

    async hide(): Promise<boolean> {
        return true
    }

    async setMenuMode(enabled = true): Promise<boolean> {
        return true
    }

    async onRegister(): Promise<boolean> {
        return true
    }

    async onUnregister(): Promise<boolean> {
        return true
    }
}
