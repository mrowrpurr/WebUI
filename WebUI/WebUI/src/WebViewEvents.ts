/*
 * HTML Web Frontend
 */

export interface WebViewEvent {
    target: string,
    source: string,
    eventName: string,
    data: any
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

}
