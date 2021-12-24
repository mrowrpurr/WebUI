import IBrowserExtension from './IBrowserExtension';
export default interface IBrowserEnvironment {
    extensions: Map<string, IBrowserExtension>;
    register: (extension: IBrowserExtension) => Promise<boolean>;
    unregister: (id: string) => Promise<boolean>;
    setMenuMode: (enable: boolean) => Promise<boolean>;
    setFocused: (focused: boolean) => Promise<boolean>;
    setVisible: (visible: boolean) => Promise<boolean>;
}
