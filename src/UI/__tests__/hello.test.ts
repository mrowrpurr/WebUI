import getWebEnvironment from './env'

describe("testing", () => {
    it("something", () => {
        const env = getWebEnvironment()
        const h1 = env.window.document.querySelector('h1')
        expect(h1?.textContent).toEqual("HELLO I AM AN H1")
    })
})