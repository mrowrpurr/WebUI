import { IWebView } from '@skyrim-webui/types';
export default class WebView implements IWebView {
    id: string;
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
    constructor(id: string);
    addToUI(): Promise<boolean>;
    removeFromUI(): Promise<boolean>;
    show(): Promise<boolean>;
    hide(): Promise<boolean>;
    setMenuMode(enabled?: boolean): Promise<boolean>;
    onRegister(): Promise<boolean>;
    onUnregister(): Promise<boolean>;
}
