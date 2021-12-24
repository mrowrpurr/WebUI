import { IBrowserEnvironment, IBrowserExtension } from '@skyrim-webui/types'

export default class BrowserEnvironment implements IBrowserEnvironment {
    private _window: Window
    extensions = new Map<string, IBrowserExtension>()

    constructor(window: Window) {
        this._window = window
    }

    async register(extension: IBrowserExtension): Promise<boolean> {
        return extension.onRegister(this._window)
    }

    async unregister(id: string): Promise<boolean> {
        return true
    }

    async setMenuMode(enable = true): Promise<boolean> {
        return true
    }

    async setFocused(focused = true): Promise<boolean> {
        return true
    }

    async setVisible(focused = true): Promise<boolean> {
        return true
    }
}