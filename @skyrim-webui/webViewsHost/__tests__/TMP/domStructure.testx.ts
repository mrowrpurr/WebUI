// import { getWebViewsHostBrowserEnvironment } from '@skyrim-webui/testUtils'

// describe('WebViewsHost DOM Structure', () => {
//     it('has a container for all iframes', async () => {
//         const env = await getWebViewsHostBrowserEnvironment('build/webViewsHost.js')
//         const iframe = env.document!.createElement('iframe')
//         iframe.src = 'http://localhost:8080/examples/SkyrimPlatform/NumberOfItems/NumberOfItems.html'
//         const loaded = new Promise<void>(resolve => {
//             iframe.onload = () => { resolve() }
//         })
//         env.document!.body.appendChild(iframe)
//         await loaded
//         expect(iframe.contentWindow?.document.body.innerHTML).toEqual("????")
//         // expect(env.document?.body.innerHTML).toEqual("????")
//     })
// })