export interface OnBrowserMessage {
    (eventType: 'browserMessage', callback: (event: any) => void): void
}

export interface OnceUpdate{
    (eventType: 'update', callback: () => void): void
}

export interface IBrowser {
    executeJavaScript: (src: string) => void,
    setVisible: (toggle: boolean) => void,
    setFocused: (toggle: boolean) => void,
    loadUrl: (url: string) => void
}

export interface IBrowserMessageEvent {
    arguments: unknown[]
}

export interface ISkyrimPlatform {
    onBrowserMessage: OnBrowserMessage,
    onceUpdate: OnceUpdate,
    browser: IBrowser
}
