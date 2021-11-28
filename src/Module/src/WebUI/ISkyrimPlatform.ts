export interface IOnEvent {
    (eventType: string, callback: (event: any) => void): void
}

export interface IOnceEvent {
    (eventType: string, callback: (event: any) => void): void
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
