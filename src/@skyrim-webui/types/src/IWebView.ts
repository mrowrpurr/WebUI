export interface WebViewScreenPosition {
    x: number
    y: number
    width: number
    height: number
}

export interface WebViewPosition {
    type: string,
    info: WebViewScreenPosition | any | undefined
}

export default interface IWebView {
    id: string
    position: WebViewPosition
    isMenu: boolean
    addToUI: () => Promise<boolean>
    removeFromUI: () => Promise<boolean>
    show: () => Promise<boolean>
    hide: () => Promise<boolean>
    setMenuMode: (enable: boolean) => Promise<boolean>
    onRegister: () => Promise<boolean>
    onUnregister: () => Promise<boolean>
}
