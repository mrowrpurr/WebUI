/*
 * HTML Web Frontend
 */

import WebView from './WebView'

export class WebViewHost {
    webViews = new Map<string, WebView>()
    iframesByName = new Map<string, HTMLIFrameElement>()
    requestResultPromises = new Map<string, (data: any) => void>()

    public getView(id: string) {
        alert(`Getting view ${id} from ${this.webViews}`)
        return this.webViews.get(id)
    }

    public add(webView: WebView) {
        alert('add!')
        if (this.webViews.has(webView.id))
            this.remove(webView.id)
        else
            this.webViews.set(webView.id, webView)
        const iframe = document.createElement('iframe')
        this.iframesByName.set(webView.id, iframe)
        iframe.style.left = (window.innerWidth * (webView.position.x / 100)).toFixed() + 'px'
        iframe.style.top = (window.innerHeight * (webView.position.y / 100)).toFixed() + 'px'
        iframe.style.height = (window.innerHeight * (webView.position.height / 100)).toFixed() + 'px'
        iframe.style.width = (window.innerWidth * (webView.position.width / 100)).toFixed() + 'px'
        iframe.frameBorder = '0'
        iframe.scrolling = 'false'
        iframe.src = webView.url
        document.documentElement.appendChild(iframe)
        if (iframe.contentWindow) {
            iframe.contentWindow.onerror = function(msg, url, linenumber) {
                alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber)
                return true
            }
        }
    }

    public remove(id: string) {
        this.webViews.delete(id)
        const iframe = this.iframesByName.get(id)
        document.documentElement.removeChild(iframe!)
        this.iframesByName.delete(id)
    }
}

const defaultInstance = new WebViewHost()

export default defaultInstance
