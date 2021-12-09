# WebUI :: Skyrim Web-based UI Framework

---

## 📂 Project Layout

- `Script\`
    - _Papyrus runtime_
    - _Papyrus sdk_
- `src\`
    - `skyrimPlatform`
        - `modules`
            - `sdk`
        - `plugins`
            - `runtime`
            - `papyrus-integration`
    - `frontend`
        - `packages`
            - `skyrim-webui`
            - `skyrim-webui-react`
        - `runtime`
            - `webViewHost`
- `tests\`
    - `integration`
- `WebUI\`
    - `__WebUI__`
        - `webViewHost.html`
    - `Examples`
        - `Widgets`
            - `NumberOfItems` (_no framework_)
            - `CarryingCapacity` (_React_)
        - `Menus`
            - `CustomMessageBox`  (_no framework_)
            - `SimpleInventory` (_React/Redux_)