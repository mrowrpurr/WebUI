import { getWebViewsHostClient } from '@skyrim-webui/backend'
import { once, printConsole } from 'skyrimPlatform'

once('tick', () => {
    printConsole('HELLO FROM WIDGET 1')
})

const webViewsHostClient = getWebViewsHostClient()

webViewsHostClient.registerWebView({
    id: "widget1",
    url: "http://localhost:8080/src/testFixtures/examples/widget1/frontend/"
})

webViewsHostClient.addToUI("widget1")

// TODO: focus this!
