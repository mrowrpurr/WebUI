import { browser, Debug, once, on, printConsole } from 'skyrimPlatform'

// browser.loadUrl('file:///Data/WebUI/WebUI/index.html')
// browser.setVisible(true)

const components = new Map<string, WebComponent>()
const jsToInvokeWhenReady = new Array<[string, any]>()
let browserIsReady = false

export interface WebComponent {
    id: string,
    url: string,
    position: WebComponentPosition
}

export interface WebComponentPosition {
    x: number,
    y: number,
    width: number,
    height: number
}

export function registerComponent(component: WebComponent) {
    components.set(component.id, component)
}

export function showComponent(id: string) {
    if (components.has(id))
        invokeJS('add', components.get(id))
}

function invokeJS(functionName: string, parameters: any) {
    if (browserIsReady) {
        browser.executeJavaScript(`window.webUI.${functionName}(${JSON.stringify(parameters)});`)
    } else {
        jsToInvokeWhenReady.push([functionName, parameters])
    }
}

export interface WebUIRequest {
    query: string,
    parameters?: any,
    // reply: (response: any) => void
}

const globalCallbacks = new Array<(request: WebUIRequest) => void>()

export function onRequest(callback: (request: WebUIRequest) => void) {
    globalCallbacks.push(callback)
}

on('browserMessage', message => {
    once('update', () => {
        printConsole(`Browse Message: ${JSON.stringify(message.arguments)}`)
    })
    if (message.arguments[0] == 'WebUI') {
        const eventName = message.arguments[1]
        switch (eventName) {
            // TODO move this so it follows the same event structrure
            case 'OnLoad': {
                browserIsReady = true
                while (jsToInvokeWhenReady.length) {
                    const jsToInvoke = jsToInvokeWhenReady.shift()
                    if (jsToInvoke)
                        invokeJS(jsToInvoke[0], jsToInvoke[1])
                }
                break
            }
            default: {

                break
            }
        }
    }
})

once('update', () => {
    browser.loadUrl('file:///Data/WebUI/WebUI/index.html')
    browser.setVisible(true)
})










// export function localFilePath(relativeToSkyrimFolder: string, WebUIUiFolder: string = "/Data/WebUI/WebUI"): string {
//     if (!relativeToSkyrimFolder.startsWith("/"))
//         relativeToSkyrimFolder = "/" + relativeToSkyrimFolder

//     if (relativeToSkyrimFolder.startsWith(WebUIUiFolder))
//         return relativeToSkyrimFolder.replace(WebUIUiFolder, ".")

//     const dotDots = WebUIUiFolder.split(/[\\/]/).map(_ => "..").join("/")
//     return dotDots + "/" + relativeToSkyrimFolder
// }

