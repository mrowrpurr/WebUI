import { getConnection } from 'papyrusBridge'
import { Debug, once, Utility } from 'skyrimPlatform'
import { getWebViewHost, registerWebView, getWebView } from 'WebUI'

const papyrus = getConnection('WebUI')

papyrus.onEvent(event => {
    let webViewId = ''
    let eventName = ''

    if (event.eventName.includes('::')) {
        const [id, ...eventNameParts] = event.eventName.split('::')
        eventName = eventNameParts.join('::')
        webViewId = id
    } else {
        eventName = event.eventName
    }

    switch (eventName) {
        case 'registerwebview': {
            const [id, url, x, y, width, height, isMenu, isVisible] = (event.data as string).split('|')
            const webView = registerWebView({
                id: id,
                url: url,
                position: { width: Number(width), height: Number(height), y: Number(y), x: Number(x) },
                isMenu: isMenu.toLowerCase() == 'true'
            })
            if (isVisible.toLowerCase() == 'true') webView.addToUI()
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
            const webView = getWebView(webViewId)
            if (webView) webView.addToUI()
            break
        }
        case 'removefromui': {
            const webView = getWebView(webViewId)
            if (webView) webView.removeFromUI()
            break
        }
        case 'toggleui': {
            const webView = getWebView(webViewId)
            if (webView) webView.toggleUI()
            break
        }
        case 'refreshall': {
            getWebViewHost().refreshAll()
            break
        }
        default: {
            const webView = getWebView(webViewId)
            if (webView) webView.send('event', { eventName, data: event.data, target: webViewId })
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
