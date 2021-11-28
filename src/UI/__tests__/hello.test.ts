import { JSDOM } from 'jsdom'

describe("testing", () => {
    it("something", () => {
        const jsdom = new JSDOM('<h1>Hello</h1>')
        const h1 = jsdom.window.document.querySelector('h1')
        expect(h1?.textContent).toEqual("HELLO I AM AN H1")
    })
})