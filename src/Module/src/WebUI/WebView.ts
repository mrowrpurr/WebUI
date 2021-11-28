/*
 * Skyrim Platform Backend
 */

import WebViewHost from './WebViewHost'
import { WebViewMessage, WebViewEvent, WebViewRequest, WebViewResponse, WebViewLoadedEvent } from './WebViewEvents'

export interface WebViewScreenPosition {
    x: number,
    y: number,
    width: number,
    height: number
}

export interface WebViewProps {
    id: string,
    url: string,
    position: WebViewScreenPosition,
    visible: boolean
}

export default class WebView {
    static components = new Map<string, WebView>()
    id: string
    url: string
    position: WebViewScreenPosition
    visible: boolean

    // like client side, allow providing a webhost to the constructor - for unit testing etc
    constructor(properties: WebViewProps) {
        this.id = properties.id
        this.url = properties.url
        this.position = properties.position
        this.visible = properties.visible
        WebViewHost.initialize()
        WebView.components.set(properties.id, this)
        if (this.visible)
            WebViewHost.addToUI(this)
    }

    public addToUI() {
        WebViewHost.addToUI(this)
    }

    public removeFromUI() {
        WebViewHost.removeFromUI(this)
    }

    public on(messageType: 'load', callback: (message: WebViewLoadedEvent) => void): void
    public on(messageType: 'message', callback: (message: WebViewMessage) => void): void
    public on(messageType: 'event', callback: (message: WebViewEvent) => void): void
    public on(messageType: 'request', callback: (message: WebViewRequest) => void): void
    public on(messageType: string, callback: (message: any) => void): void
    public on(messageType: string, callback: (message: any) => void): void {
        WebViewHost.on(messageType, this.id, callback)
    }

    public async send(messageType: 'message', message: WebViewMessage): Promise<any>
    public async send(messageType: 'event', message: WebViewEvent): Promise<any>
    public async send(messageType: 'request', message: WebViewRequest): Promise<WebViewResponse>
    public async send(messageType: string, message: any): Promise<any>
    public async send(messageType: string, message: any): Promise<any> {
        if (!message.target)
            message.target = this.id
        if (!message.source)
            message.source = this.id
        return WebViewHost.send(messageType, this.id, message)
    }

    public reply(request: WebViewRequest, response: WebViewResponse) {
        WebViewHost.reply(request, this.id, response)
    }
}
