import * as fs from 'fs'
import { getBrowserEnvironment, SkyrimPlatformBrowserEnvironment } from './skyrimPlatformBrowserEnvironment'

export async function getWebViewsHostBrowserEnvironment(webViewsHostJsPath: string) {
    const webViewsHostJs = fs.readFileSync(webViewsHostJsPath).toString()
    const env = getBrowserEnvironment()
    await env.runJavaScript(webViewsHostJs)
    return new Promise<SkyrimPlatformBrowserEnvironment>(resolve => {
        resolve(env)
    })
}
