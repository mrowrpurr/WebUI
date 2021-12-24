import { registerWebView } from '@skyrim-webui/sdk'

const webView1 = registerWebView({
    id: 'HelloWorld',
    url: 'http://localhost:8080/packages/example-hello-world-frontend/',

})

webView1.show()

const webView2 = registerWebView({
    id: 'HelloWorld',
    url: 'http://localhost:8080/packages/example-hello-world-frontend/holiday.html',
    
})

webView2.show()
