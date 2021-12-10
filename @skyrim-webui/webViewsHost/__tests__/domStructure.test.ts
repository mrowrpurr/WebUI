import { getWebViewsHostBrowserEnvironment } from '@skyrim-webui/testUtils'

describe('WebViewsHost DOM Structure', () => {
    it('has a container for all iframes', async () => {
        const env = await getWebViewsHostBrowserEnvironment('build/webViewsHost.js')
        expect(env.document?.body.innerHTML).toEqual("????")
    })
})