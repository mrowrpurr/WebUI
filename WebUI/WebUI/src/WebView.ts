/*
 * HTML Web Frontend
 */

import { WebViewMessage, WebViewEvent, WebViewRequest, WebViewResponse } from './WebViewEvents'
import { WebViewHost, webViewHostInstance } from './WebViewHost'

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
    id: string
    url: string
    position: WebViewScreenPosition
    visible: boolean
    webViewHost: WebViewHost

    constructor(properties: WebViewProps, webViewHost: WebViewHost | undefined = undefined) {
        this.id = properties.id
        this.url = properties.url
        this.position = properties.position
        this.visible = properties.visible
        if (!webViewHost)
            webViewHost = webViewHostInstance
        this.webViewHost = webViewHost!
    }

    public on(messageType: 'event', callback: (message: WebViewEvent) => void): void
    public on(messageType: 'request', callback: (message: WebViewRequest) => void): void
    public on(messageType: 'message', callback: (message: WebViewMessage) => void): void
    public on(messageType: string, callback: (message: any) => void): void
    public on(messageType: string, callback: (message: any) => void): void {
        this.webViewHost.on(messageType, this.id, callback)
    }

    public async send(messageType: 'event', message: WebViewEvent): Promise<any>
    public async send(messageType: 'request', message: WebViewRequest): Promise<WebViewResponse>
    public async send(messageType: 'message', message: WebViewMessage): Promise<any>
    public async send(messageType: 'load', message: WebViewMessage): Promise<any>
    public async send(messageType: string, message: any): Promise<any>
    public async send(messageType: string, message: any): Promise<any> {
        return this.webViewHost.send(messageType, this.id, message)
    }

    public reply(request: WebViewRequest, response: WebViewResponse) {
        this.webViewHost.reply(request, this.id, response)
    }
}
