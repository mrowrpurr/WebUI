import { getConnection } from 'papyrusBridge'
import { Debug, once, Utility } from 'skyrimPlatform'
import { registerWebView, getWebView } from 'WebUI'

const papyrus = getConnection('WebUI')

papyrus.onEvent(event => {
    const [webViewID, ...eventNameParts] = event.eventName.split('::')
    const eventName = eventNameParts.join('::')

    switch (eventName) {
        case 'registerwebview': {
            const [id, url, x, y, width, height, isMenu] = (event.data as string).split('|')
            once('update', () => {
                Debug.messageBox(`${id} is menu? ${isMenu}`)
            })
            registerWebView({
                id: id,
                url: url,
                position: { width: Number(width), height: Number(height), y: Number(y), x: Number(x) },
                isMenu: isMenu.toLowerCase() == 'true'
            })
            break
        }
        case 'registerandshowwebview': {
            const [id, url, x, y, width, height, isMenu] = (event.data as string).split('|')
            registerWebView({
                id: id,
                url: url,
                position: { width: Number(width), height: Number(height), y: Number(y), x: Number(x) },
                isMenu: isMenu == 'true'
            }).addToUI()
            break
        }
        case 'addtoui': {
            const webView = getWebView(webViewID)
            if (webView) webView.addToUI()
            break
        }
        case 'removefromui': {
            const webView = getWebView(webViewID)
            if (webView) webView.removeFromUI()
            break
        }
        case 'toggleui': {
            const webView = getWebView(webViewID)
            if (webView) webView.toggleUI()
            break
        }
        default: {
            // TODO make this so it cannot have event name collisions with our own event names
            const webView = getWebView(webViewID)
            if (webView) webView.send('event', { eventName, data: event.data })
            break
        }
    }
})

papyrus.onRequest(async (request, reply) => {
    const [webViewID, ...queryParts] = request.query.split('::')
    const query = queryParts.join('::')
    const webView = getWebView(webViewID)
    if (webView) {
        const response = await webView.send('request', { query, data: request.query })
        reply(response)
    } else {
        reply(undefined)
    }
})
