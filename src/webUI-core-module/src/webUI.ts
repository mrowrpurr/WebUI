import { browser, Debug, once, on } from 'skyrimPlatform'

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
    reply: (response: any) => void
}

export function onRequest(request: WebUIRequest) {
    Debug.messageBox('TODO onRequest')
}

on('browserMessage', message => {
    once('update', () => {
        Debug.messageBox(`Browse Message: ${JSON.stringify(message.arguments)}`)
    })
    if (message.arguments[0] == 'WebUI') {
        const eventName = message.arguments[1]
        switch (eventName) {
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
                once('update', () => {
                    Debug.messageBox(`Unknown Event: ${JSON.stringify(message.arguments)}`)
                })
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

