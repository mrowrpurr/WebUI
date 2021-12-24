export default interface IWebView {
    id: string;
    addToUI: () => Promise<boolean>;
    removeFromUI: () => Promise<boolean>;
    show: () => Promise<boolean>;
    hide: () => Promise<boolean>;
    setMenuMode: (enable: boolean) => Promise<boolean>;
    onRegister: () => Promise<boolean>;
    onUnregister: () => Promise<boolean>;
}
