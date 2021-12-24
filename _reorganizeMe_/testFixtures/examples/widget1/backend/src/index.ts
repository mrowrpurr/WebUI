import { once, printConsole } from 'skyrimPlatform'
// import { Something } from '@skyrim-webui/backend'
import { getWebViewsHostClient } from '@skyrim-webui/backend'

once('tick', () => {
    printConsole(`Hello from Widget1, gonna try to register a Web UI!`)
    const client = getWebViewsHostClient()
    client.registerWebView({
        id: "widget1",
        url: "http://localhost:8080/src/fixtures/examples/widget1/frontend/"
    })
    client.addToUI("widget1")
    printConsole(`Ok, I added widget1?`)
})
