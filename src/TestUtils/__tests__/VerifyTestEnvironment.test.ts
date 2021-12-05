/*
 * Test SkyrimPlatformBrowserEnvironment to make sure our test environment does what we think it does.
 */

import { getBrowserEnvironment } from './helpers/SkyrimPlatformBrowserEnvironment'



describe('Skyrim Platform Browser Environment Mock', () => {

    it('can get the WebViewHost webviewhostloaded event', (done) => {
        const env = getBrowserEnvironment()
        env.onSendMessage(message => {
            expect(message.arguments).toHaveLength(2)
            expect(message.arguments[0]).toEqual('WebUI')
            expect(message.arguments[1].messageType).toEqual('webviewhostloaded')
            if (message.arguments[0] == 'WebUI')
                done()
        })
    })

    it('messages can be send via skyrimPlatform.sendMessage', (done) => {
        const env = getBrowserEnvironment()
        env.onSendMessage(message => {
            if (message.arguments[0] == 'Hello') {
                expect(message.arguments).toHaveLength(2)
                expect(message.arguments[0]).toEqual('Hello')
                expect(message.arguments[1].data).toEqual('World')
                done()
            }
        })
        env.sendMessage('Hello', { data: 'World' })
    })

})