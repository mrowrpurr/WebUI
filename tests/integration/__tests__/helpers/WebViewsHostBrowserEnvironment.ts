import * as fs from 'fs'
import * as path from 'path'
import { getBrowserEnvironment } from './skyrimPlatformBrowserEnvironment'

export function getWebViewsHostBrowserEnvironment() {
    const webViewsHostJs = fs.readFileSync('../../WebUI/__WebUI__/webViewsHost.js').toString()
    const env = getBrowserEnvironment()
    env.runJavaScript(webViewsHostJs)
    return env
}