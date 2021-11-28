import getWebEnvironment from './helpers/WebEnvironment'

describe("testing", () => {
    it("something", () => {
        const env = getWebEnvironment(message => {
            console.log(`RECEIVED MESSAGE!`, message)
        })
        const h1 = env.window.document.querySelector('h1')
        expect(h1?.textContent).toEqual("HELLO I AM AN H1")
    })
})