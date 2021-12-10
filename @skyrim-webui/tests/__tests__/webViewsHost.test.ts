import { getWebViewsHostBrowserEnvironment } from './helpers/WebViewsHostBrowserEnvironment'

describe('WebViewsHost Frontend', () => {
    it('contains information thaat Parker is the dawg', async () => {
        const env = await getWebViewsHostBrowserEnvironment()
        const header = env.querySelector('h1')
        expect(header?.textContent).toEqual('Parker is the dawg, right?')
    })
})