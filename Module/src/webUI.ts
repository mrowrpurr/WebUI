import { browser, Debug, once } from 'skyrimPlatform'

browser.loadUrl('file:///Data/WebUI/WebUI/index.html')
browser.setVisible(true)

const components = new Map<string, WebComponent>()

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
    invokeJS('show', id)
}

function invokeJS(functionName: string, parameters: any) {
    browser.executeJavaScript(`window.webUI.${functionName}(${JSON.stringify(parameters)});`)
}
