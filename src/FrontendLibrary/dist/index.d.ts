export interface WebViewEvent {
    eventName: string;
    data?: any;
}
export interface WebViewRequest {
    query: string;
    data?: any;
}
export interface WebViewReply {
    replyId: string;
    data: any;
}
export declare class WebView {
    id: string | undefined;
    eventCallbacks: ((event: WebViewEvent) => void)[];
    requestCallbacks: [(event: WebViewRequest) => void, (data: any) => void][];
    onEvent(callback: (event: WebViewEvent) => void): void;
    onRequest(callback: (event: WebViewRequest) => void, reply: (data: any) => void): void;
    send(): void;
    request(): Promise<void>;
    onReply(): void;
}
export declare function getWebView(id: string): WebView;
