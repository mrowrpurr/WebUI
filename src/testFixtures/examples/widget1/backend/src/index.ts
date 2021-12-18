import { getWebViewsHostClient } from '@skyrim-webui/backend'

const webViewsHostClient = getWebViewsHostClient()

webViewsHostClient.registerWebView({
    id: "widget1",
    url: ""
})