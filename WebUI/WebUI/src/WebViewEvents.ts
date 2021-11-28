/*
 * HTML Web Frontend
 */

export interface WebViewEvent {
    target: string,
    source: string,
    eventName: string,
    data: any
}

export interface WebViewLoadedEvent {
    viewId: string
}

export interface WebViewMessage {
    target: string,
    source: string,
    text: string
}

export interface WebViewRequest {
    target: string,
    source: string,
    query: string,
    parameters: any,
    replyId: string
}

export interface WebViewResponse {
    data: any
}
