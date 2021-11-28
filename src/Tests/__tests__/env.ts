import { JSDOM } from 'jsdom'
import * as fs from 'fs'

const webViewHostJs = fs.readFileSync('../UI/build/WebUI_WebViewHost.js').toString()

export default function getWebEnvironment(): JSDOM {
    const jsdom = new JSDOM('', { runScripts: 'dangerously', resources: 'usable', url: `file://${__dirname}/index.html` })
    const script = jsdom.window.document.createElement('script')
    script.textContent = webViewHostJs
    jsdom.window.document.documentElement.appendChild(script)
    return jsdom
}
