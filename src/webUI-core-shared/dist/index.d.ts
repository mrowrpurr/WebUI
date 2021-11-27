export interface WebView {
    id: string;
    url: string;
    position: WebViewPosition;
    visible: boolean;
}
export interface WebViewPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}
