import * as fs from 'fs'
import { SkyrimPlatformBrowserEnvironment } from './skyrimPlatformBrowserEnvironment'

export class WebViewsHostBrowserEnvironment extends SkyrimPlatformBrowserEnvironment {
    public async load(webViewsHostJsPath: string) {
        const webViewsHostJs = fs.readFileSync(webViewsHostJsPath).toString()
        return this.runJavaScript(webViewsHostJs)
    }
    public runWebViewsBrowserFunction(functionName: string, ...args: any[]) {
        return this.runFunction(`__webViewsHost__.${functionName}`, ...args)
    }
}

export async function getWebViewsHostBrowserEnvironment(webViewsHostJsPath: string) {
    const env = new WebViewsHostBrowserEnvironment()
    await env.load(webViewsHostJsPath)
    return env
}
