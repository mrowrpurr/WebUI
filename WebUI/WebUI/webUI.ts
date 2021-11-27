import { WebComponent } from 'skyrim-webui'

// Consider moving EVERYTHING into a WebUIComponentHost
const modInstances = new Map<string, WebUIMod>()
const iframesByName = new Map<string, HTMLIFrameElement>()
const modNameForIframe = new Map<Window, string>()
const requestResultPromises = new Map<string, (data: any) => void>()

export interface WebUIEvent {
    modName: string,
    eventName: string,
    data: any,
    replyId: string
}

export function postEvent(event: WebUIEvent) {
    // window.postMessage(event)
    (window as any).skyrimPlatform.sendMessage("WebUI", event)
}

export function getUniqueReplyId() {
    return `${Math.random()}_${Math.random()}`
}

class WebUIMod {
    modName: string
    constructor(modName: string) {
        this.modName = modName
        modInstances.set(modName, this)
    }
    async request(query: string, parameters: any) {
        const replyId = getUniqueReplyId()
        alert(`REQUEST: ${query} ${JSON.stringify(parameters)}`)
        return new Promise<any>(resolve => {
            requestResultPromises.set(replyId, resolve)
            postEvent({
                modName: this.modName,
                eventName: 'REQUEST',
                data: { query, parameters },
                replyId
            })
        })
    }
}

class WebUISkyrimAPI {
    public hello() {
        alert('HELLO THERE')
    }
}

class WebUIComponentHost {
    components = new Map<string, WebComponent>()

    public remove(id: string) {
        this.components.delete(id)
        const iframe = iframesByName.get(id)
        document.documentElement.removeChild(iframe!)
        iframesByName.delete(id)
    }

    public add(component: WebComponent) {
        if (this.components.has(component.id))
            this.remove(component.id)
        else
            this.components.set(component.id, component)
        const iframe = document.createElement('iframe')
        iframesByName.set(component.id, iframe)
        iframe.style.left = (window.innerWidth * (component.position.x / 100)).toFixed() + 'px'
        iframe.style.top = (window.innerHeight * (component.position.y / 100)).toFixed() + 'px'
        iframe.style.height = (window.innerHeight * (component.position.height / 100)).toFixed() + 'px'
        iframe.style.width = (window.innerWidth * (component.position.width / 100)).toFixed() + 'px'
        iframe.frameBorder = '0'
        iframe.scrolling = 'false'
        iframe.src = component.url
        document.documentElement.appendChild(iframe)
        if (iframe.contentWindow) {
            modNameForIframe.set(iframe.contentWindow, component.id)
            iframe.contentWindow.onerror = function(msg, url, linenumber) {
                alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber)
                return true
            }
        }
    }
}

// TODO: make this __webUI so it's clear that it's a private API
(window as any).webUI = new WebUIComponentHost();
(window as any).skyrim = new WebUISkyrimAPI();
(window as any).getMod = (modName: string) => new WebUIMod(modName)

// window.addEventListener('message', message => {
//     alert(`onmessage ${JSON.stringify(message)}`)
//     // for (let [key, value] of modNameForIframe) {
//     //     if (key == message.source) {
//     //         alert(`Message: ${JSON.stringify(message.data)} from ${key.location.href} OK`)
//     //     }
//     // }
// })