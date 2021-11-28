import { JSDOM } from 'jsdom'
import * as fs from 'fs'

describe("testing", () => {
    it("something", () => {
        const jsdom = new JSDOM('', { runScripts: 'dangerously', resources: 'usable', url: `file://${__dirname}/index.html` })
        const script = jsdom.window.document.createElement('script')
        script.textContent = fs.readFileSync('./foo.js').toString()
        jsdom.window.document.documentElement.appendChild(script)
        console.log(script.textContent)

        const h1 = jsdom.window.document.querySelector('h1')
        expect(h1?.textContent).toEqual("HELLO I AM AN H1")
    })
})