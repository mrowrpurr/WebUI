import { WebComponent } from 'skyrim-webui'

class WebUIComponentHost {
    components = new Map<string, WebComponent>()
    iframes = new Map<string, HTMLIFrameElement>()

    public remove(id: string) {
        alert('remove!')
        this.components.delete(id)
        const iframe = this.iframes.get(id)
        document.documentElement.removeChild(iframe!)
        this.iframes.delete(id)
    }

    public add(component: WebComponent) {
        // if (this.components.has(component.id)) {
        //     this.remove(component.id)
        // }
        // else {
        this.components.set(component.id, component)
        // }
        const iframe = document.createElement('iframe')
        this.iframes.set(component.id, iframe)
        iframe.style.width = '500px'
        iframe.style.height = '500px'
        iframe.style.top = '0'
        iframe.style.left = '0'
        iframe.src = component.url
        document.documentElement.appendChild(iframe)
    }
}

(window as any).webUI = new WebUIComponentHost()