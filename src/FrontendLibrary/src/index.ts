export interface WebViewEvent {
    eventName: string,
    data?: any
}

export interface WebViewRequest {
    query: string,
    data?: any
}

export interface WebViewReply {
    replyId: string,
    data: any
}

export class WebView {
    public id: string | undefined

    eventCallbacks = new Array<(event: WebViewEvent) => void>()
    requestCallbacks = new Array<[(event: WebViewRequest) => void, (data: any) => void]>()

    public onEvent(callback: (event: WebViewEvent) => void) {
        this.eventCallbacks.push(callback)
    }

    public onRequest(callback: (event: WebViewRequest) => void, reply: (data: any) => void) {
        this.requestCallbacks.push([callback, reply])
    }

    public send() {
        // postMessage
    }

    public async request() {
        // postMessage and store promise which onReply will deal with
    }

    onReply() {
        // run promise stored by request()
    }
}

const webView = new WebView()

export function getWebView(id: string) {
    webView.id = id
    return webView
}

interface WebViewPostedMessage {
    messageType: 'event' | 'request' | 'reply',
    data: any
}

window.addEventListener('message', event => {
    if (event.data.messageType) {
        switch (event.data.messageType) {
            case 'event': {
                webView.eventCallbacks.forEach(callback => callback(event.data.data))
                break
            }
            case 'request': {

                break
            }
            case 'reply': {

                break
            }
        }
    }
})