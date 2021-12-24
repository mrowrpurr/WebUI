export default interface IBrowserExtension {
    id: string;
    scripts: Array<string>;
    onRegister: () => Promise<boolean>;
    onUnregister: () => Promise<boolean>;
}
