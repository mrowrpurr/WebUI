import { getConnection } from 'papyrusBridge'
import { registerWebView } from 'WebUI'

const webUI = getConnection('WebUI')

webUI.onEvent(event => {
    if (event.eventName == 'registerwebview') {
        const [id, url, x, y, width, height] = (event.data as string).split('|')
        registerWebView({
            id: id,
            url: url,
            position: { width: Number(width), height: Number(height), y: Number(y), x: Number(x) }
        }).addToUI()
    }
})