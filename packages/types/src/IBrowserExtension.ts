export default interface IBrowserExtension {
    id: string
    scripts: Array<string>
    onRegister: (window: Window) => Promise<boolean>
    onUnregister: () => Promise<boolean>
}
