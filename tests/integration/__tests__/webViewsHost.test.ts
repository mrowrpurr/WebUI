import { getWebViewsHostBrowserEnvironment } from './helpers/WebViewsHostBrowserEnvironment'

describe('WebViewsHost Frontend', () => {
    it('contains information thaat Parker is the dawg', () => {
        const env = getWebViewsHostBrowserEnvironment()
        console.log("HTML", env.document?.body.innerHTML)
        const header = env.querySelector('h1')
        expect(header?.textContent).toEqual('Parker is the dawg, right?')
    })
})