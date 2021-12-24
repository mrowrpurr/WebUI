import { IBrowserEnvironment, IBrowserExtension } from '@skyrim-webui/types'

export default class BrowserEnvironment implements IBrowserEnvironment {
    extensions = new Map<string, IBrowserExtension>()

    async register(extension: IBrowserExtension): Promise<boolean> {
        return true
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