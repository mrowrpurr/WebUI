import papyrusBridge from 'papyrusBridge'
import { Debug, once } from 'skyrimPlatform'
import { registerWebView } from 'WebUI'

const webUI = papyrusBridge.getMod('WebUI')

webUI.on('event', event => {
    if (event.eventName == 'RegisterWebView') {
        const [id, url, x, y, width, height] = (event.data as string).split('|')
        registerWebView({
            id: id,
            url: url,
            position: { width: Number(width), height: Number(height), y: Number(y), x: Number(x) }
        }).addToUI()
    }
})