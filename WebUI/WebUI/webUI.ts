import { WebComponent } from 'skyrim-webui'

class WebUIComponentHost {
    public show(component: WebComponent) {
        alert(`SHOW: ${JSON.stringify(component)}`)
    }
}

(window as any).webUI = new WebUIComponentHost()