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

export interface WebViewParams {
    id: string,
    url: string,
    position?: WebViewScreenPosition,
    host: WebViewHost,
    isMenu: boolean
}

export default class WebView {
    id: string
    url: string
    position: WebViewScreenPosition
    host: WebViewHost
    isMenu: boolean

    // like client side, allow providing a webhost to the constructor - for unit testing etc
    constructor(params: WebViewParams) {
        this.id = params.id.toLowerCase()
        this.url = params.url
        this.host = params.host
        this.isMenu = params.isMenu
        if (params.position)
            this.position = params.position
        else
            this.position = { x: 0, y: 0, width: 100, height: 100 } // full screen
    }

    public addToUI() {
        this.host.addToUI(this)
    }

    public removeFromUI() {
        this.host.removeFromUI(this.id)
    }

    public toggleUI() {
        this.host.toggleUI(this)
    }

    public on(messageType: 'load', callback: (message: WebViewLoadedEvent) => void): void
    public on(messageType: 'message', callback: (message: WebViewMessage) => void): void
    public on(messageType: 'event', callback: (message: WebViewEvent) => void): void
    public on(messageType: 'request', callback: (message: WebViewRequest) => void): void
    public on(messageType: string, callback: (message: any) => void): void
    public on(messageType: string, callback: (message: any) => void): void {
        this.host.on(messageType, this.id, callback)
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
        return this.host.send(messageType, this.id, message)
    }

    public reply(request: WebViewRequest, response: WebViewResponse) {
        this.host.reply(request, this.id, response)
    }
}
