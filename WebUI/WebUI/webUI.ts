import { WebComponent } from 'skyrim-webui'

class WebUIComponentHost {
    public show(component: WebComponent) {
        const iframe = document.createElement('iframe')
        // iframe.style.display = 'none'
        // iframe.contentWindow!.onload = () => {
        //     iframe.style.display = 'block'
        //     // call some callback on the SP side
        // }
        iframe.style.width = '500px'
        iframe.style.height = '500px'
        iframe.style.top = '0'
        iframe.style.left = '0'
        iframe.src = component.url
        document.documentElement.appendChild(iframe)
        alert(`Added ${component.url}`)
    }
}

(window as any).webUI = new WebUIComponentHost()