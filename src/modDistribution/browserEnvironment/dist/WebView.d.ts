import { IWebView } from '@skyrim-webui/types';
export default class WebView implements IWebView {
    readonly id: string;
    readonly url: string;
    isMenu: boolean;
    position: {
        type: string;
        info: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    };
    constructor(id: string, url: string);
    addToUI(): Promise<boolean>;
    removeFromUI(): Promise<boolean>;
    show(): Promise<boolean>;
    hide(): Promise<boolean>;
    setMenuMode(enabled?: boolean): Promise<boolean>;
    onRegister(): Promise<boolean>;
    onUnregister(): Promise<boolean>;
}
