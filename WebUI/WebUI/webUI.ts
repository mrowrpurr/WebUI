import { WebComponent } from 'skyrim-webui'

class WebUISkyrimAPI {
    public hello() {
        alert('HELLO THERE')
    }
}

class WebUIComponentHost {
    components = new Map<string, WebComponent>()
    iframes = new Map<string, HTMLIFrameElement>()

    public remove(id: string) {
        this.components.delete(id)
        const iframe = this.iframes.get(id)
        document.documentElement.removeChild(iframe!)
        this.iframes.delete(id)
    }

    public add(component: WebComponent) {
        if (this.components.has(component.id))
            this.remove(component.id)
        else
            this.components.set(component.id, component)
        const iframe = document.createElement('iframe')
        this.iframes.set(component.id, iframe)
        iframe.style.left = (window.innerWidth * (component.position.x / 100)).toFixed() + 'px'
        iframe.style.top = (window.innerHeight * (component.position.y / 100)).toFixed() + 'px'
        iframe.style.height = (window.innerHeight * (component.position.height / 100)).toFixed() + 'px'
        iframe.style.width = (window.innerWidth * (component.position.width / 100)).toFixed() + 'px'
        iframe.frameBorder = '0'
        iframe.scrolling = 'false'
        iframe.src = component.url
        document.documentElement.appendChild(iframe)
        if (iframe.contentWindow)
            iframe.contentWindow.onerror = function(msg, url, linenumber) {
                alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber)
                return true
            }
    }
}

(window as any).webUI = new WebUIComponentHost();
(window as any).skyrim = new WebUISkyrimAPI()