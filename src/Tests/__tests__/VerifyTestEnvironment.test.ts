/*
 * Test SkyrimPlatformBrowserEnvironment to make sure our test environment does what we think it does.
 */

import { getBrowserEnvironment } from './helpers/SkyrimPlatformBrowserEnvironment'



describe('Skyrim Platform Browser Environment Mock', () => {

    it('messages can be send via skyrimPlatform.sendMessage', (done) => {
        const env = getBrowserEnvironment()
        env.onSendMessage(message => {
            expect(message.arguments).toHaveLength(2)
            expect(message.arguments[0]).toEqual('Hello')
            expect((message.arguments[1] as any).data).toEqual('World')
            done()
        })
        env.sendMessage('Hello', { data: 'World' })
    })

})