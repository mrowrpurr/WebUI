/*
 * HTML Web Frontend
 */

import { WebViewMessage } from './WebViewEvents'

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

    constructor(properties: WebViewProps) {
        this.id = properties.id
        this.url = properties.url
        this.position = properties.position
        this.visible = properties.visible
    }

    // public on(messageType: 'load', callback: (message: WebViewLoad) => void): void
    // public on(messageType: 'event', callback: (message: WebViewEvent) => void): void
    // public on(messageType: 'request', callback: (message: WebViewRequest) => void): void
    public on(messageType: 'message', callback: (message: WebViewMessage) => void): void
    public on(messageType: string, callback: (message: any) => void): void
    public on(messageType: string, callback: (message: any) => void): void {

    }

    // public async send(messageType: 'event', message: WebViewEvent): Promise<any>
    // public async send(messageType: 'request', message: WebViewRequest): Promise<WebViewResponse>
    public async send(messageType: 'message', message: WebViewMessage): Promise<any>
    public async send(messageType: string, message: any): Promise<any>
    public async send(messageType: string, message: any): Promise<any> {

    }
}
