import { browser, on, Message } from "skyrimPlatform";

/**
* TODO
*/
export function initUI() {
    browser.loadUrl("file:///UI/WebPlatform/index.html")
}

/**
* TODO
*/
export function showUI() {
    browser.setVisible(true)
}

/**
* TODO
*/
export function hideUI() {
    browser.setVisible(false)
}

/**
* TODO
*/
export function setVisible(visible: boolean) {
    browser.setVisible(visible)
}

/**
* TODO
*/
export function setFocused(focused: boolean) {
    browser.setFocused(focused)
}

/**
* TODO
*/
export function focusUI() {
    browser.setFocused(true)
}

/**
* TODO
*/
export function unfocusUI() {
    browser.setFocused(false)
}

/**
* TODO
*
* @param x - TODO
* @param y - TODO
* @returns The arithmetic mean of `x` and `y`
*/
export function addUI(id: string, url: string, x: number, y: number, height: number, width: number, visible: boolean) {
    browser.executeJavaScript(`addUI(${JSON.stringify(id)}, ${JSON.stringify(url)}, ${JSON.stringify(x)}, ${JSON.stringify(y)}, ${JSON.stringify(height)}, ${JSON.stringify(width)}, ${JSON.stringify(visible)});`)
}

/**
* TODO
*/
export function postMessage(id: string, message: string) {
    browser.executeJavaScript(`sendMessage(${JSON.stringify(message)});`)
}

/**
* TODO
*/
export function localFilePath(relativeToSkyrimFolder: string, webPlatformUiFolder: string = "UI/WebPlatform") : string {
    const dotDots = webPlatformUiFolder.split(/[\\/]/).map(_ => "..").join("/")
    return dotDots + "/" + relativeToSkyrimFolder
}

/**
* TODO
*/
export function onWebMessage(id: string, callback: (data: string) => void) {
    on("browserMessage", event => {
        if (event.arguments.length == 3 && event.arguments[0] == "WebPlatform") {
            const actualId: string = event.arguments[1] as string
            if (id == actualId) {
                const data = event.arguments[2] as string
                callback(data)
            }
        }
    })    
}

/**
* TODO
*/
export function onAnyWebMessage(callback: (id: string, data: string) => void) {
    on("browserMessage", event => {
        if (event.arguments.length == 3 && event.arguments[0] == "WebPlatform") {
            const id: string = event.arguments[1] as string
            const data = event.arguments[2] as string
            callback(id, data)
        }
    })    
}
