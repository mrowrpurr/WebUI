import { browser, on, Debug, printConsole } from "skyrimPlatform";

/**
* TODO
*/
export function initUI() {
    browser.loadUrl("file:///Data/WebUI/index.html")
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
export function addUI(id: string, url: string, x: number, y: number, height: number, width: number, visible: boolean, isMenu: boolean) {
    browser.executeJavaScript(`addUI(${JSON.stringify(id)}, ${JSON.stringify(url)}, ${JSON.stringify(x)}, ${JSON.stringify(y)}, ${JSON.stringify(height)}, ${JSON.stringify(width)}, ${JSON.stringify(visible)}, ${JSON.stringify(isMenu)});`)
}

/**
* TODO
*/
export function postMessage(id: string, message: any) {
    browser.executeJavaScript(`sendMessageToComponent(${JSON.stringify(id)}, ${JSON.stringify(message)});`)
}

export function toggleComponent(id: string) {
    browser.executeJavaScript(`toggleComponent(${JSON.stringify(id)});`)
}

/**
* TODO
*/
export function localFilePath(relativeToSkyrimFolder: string, WebUIUiFolder: string = "/Data/WebUI") : string {
    if (! relativeToSkyrimFolder.startsWith("/"))
        relativeToSkyrimFolder = "/" + relativeToSkyrimFolder

    if (relativeToSkyrimFolder.startsWith(WebUIUiFolder))
        return relativeToSkyrimFolder.replace(WebUIUiFolder, ".")

    const dotDots = WebUIUiFolder.split(/[\\/]/).map(_ => "..").join("/")
    return dotDots + "/" + relativeToSkyrimFolder
}

/**
* TODO
*/
export function onWebMessage(id: string, callback: (event: string, data: string) => void) {
    on("browserMessage", message => {
        if (message.arguments.length == 4 && message.arguments[0] == "WebUI") {
            const event: string = message.arguments[1] as string
            const actualId: string = message.arguments[2] as string
            if (id == actualId) {
                const data = message.arguments[3] as string
                callback(event, data)
            }
        }
    })    
}

/**
* TODO
*/
export function onAnyWebMessage(callback: (event: string, id: string, data: string) => void) {
    on("browserMessage", message => {
        Debug.messageBox(`Browser Message: ${JSON.stringify(message)}`)
        printConsole(`Browser Message: ${JSON.stringify(message)}`)
        if (message.arguments.length == 4 && message.arguments[0] == "WebUI") {
            unfocusUI()
            const event: string = message.arguments[1] as string
            const id: string = message.arguments[2] as string
            const data = message.arguments[3] as string
            callback(event, id, data)
        }
    })    
}
