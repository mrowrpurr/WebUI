import { JSDOM, DOMWindow } from 'jsdom';
export declare class SkyrimPlatformBrowserEnvironment {
    dom: JSDOM | undefined;
    document: Document | undefined;
    window: DOMWindow | undefined;
    constructor();
    querySelector(selector: string): Element | null | undefined;
    querySelectorAll(selector: string): NodeListOf<Element> | undefined;
    getElementById(id: string): HTMLElement | null | undefined;
    runJavaScript(js: string): Promise<undefined>;
}
export declare function getBrowserEnvironment(): SkyrimPlatformBrowserEnvironment;
