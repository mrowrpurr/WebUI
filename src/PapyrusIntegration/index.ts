import { getConnection } from 'papyrusBridge'
import { Debug, once, Utility } from 'skyrimPlatform'
import { registerWebView, getWebView } from 'WebUI'

const webUI = getConnection('WebUI')

webUI.onEvent(event => {
    const [webViewID, ...eventNameParts] = event.eventName.split('::')
    const eventName = eventNameParts.join('::')

    if (eventName == 'registerwebview') {
        const [id, url, x, y, width, height] = (event.data as string).split('|')
        registerWebView({
            id: id,
            url: url,
            position: { width: Number(width), height: Number(height), y: Number(y), x: Number(x) }
        }).addToUI()
    } else {
        once('update', () => {
            Utility.wait(2).then(() => {
                const webView = getWebView(webViewID)
                Debug.messageBox(`Sending ${JSON.stringify(event)} ----> *******to ${webView} ->>> ${webView?.id}`)
                if (webView) webView.send('event', { eventName, data: event.data })
            })
        })
    }
})