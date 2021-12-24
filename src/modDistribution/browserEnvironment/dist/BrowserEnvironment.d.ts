import { IBrowserEnvironment, IBrowserExtension } from '@skyrim-webui/types';
export default class BrowserEnvironment implements IBrowserEnvironment {
    private _window;
    extensions: Map<string, IBrowserExtension>;
    constructor(window: Window);
    register(extension: IBrowserExtension): Promise<boolean>;
    unregister(id: string): Promise<boolean>;
    setMenuMode(enable?: boolean): Promise<boolean>;
    setFocused(focused?: boolean): Promise<boolean>;
    setVisible(focused?: boolean): Promise<boolean>;
}
