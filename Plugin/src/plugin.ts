import { on, printConsole, Debug, Game, Ui, browser, once } from "skyrimPlatform"
import * as JMap from "JContainers/JMap"
import * as WebUI from "./WebUI"

WebUI.initUI()
WebUI.showUI()

export function main() {

    let messageContainerId = 0
    let enableMenuMode  = false
    let disableMenuMode = false

    once("update", () => {
        if (messageContainerId == 0)
            messageContainerId = Game.getFormFromFile(0xd7d, "PapyrusToSkyrimPlatform.esp")!.getFormID()
    })

    on("update", () => {
        if (enableMenuMode) {
            enableMenuMode = false
            Ui.openCustomMenu("InvisibleCustomMenu", 0)
            browser.setFocused(true)
        } else if (disableMenuMode) {
            disableMenuMode = false
            Ui.closeCustomMenu()
            browser.setFocused(false)
        }
    })

    on("browserMessage", (message) => {
        if (message.arguments.length == 2 && message.arguments[0] == "WebUI" && message.arguments[1] == "EnterMenuMode") {
            enableMenuMode = true
        } else if (message.arguments.length == 2 && message.arguments[0] == "WebUI" && message.arguments[1] == "LeaveMenuMode") {
            disableMenuMode = true
        }
    })

    // TODO - Move to PapyrusToSkyrimPlatform.ts
    on("containerChanged", (event) => {
        if (event.newContainer.getFormID() == messageContainerId) {
            const eventRef  = parseInt(event.baseObj.getName())
            const eventName = JMap.getStr(eventRef, "event")
            const dataRef   = JMap.getObj(eventRef, "data")

            if (eventName == "WebUI:RegisterComponent") {
                const id        = JMap.getStr(dataRef, "id")
                const filePath  = JMap.getStr(dataRef, "filepath")
                WebUI.addUI(
                    id,
                    WebUI.localFilePath(filePath),
                    JMap.getInt(dataRef, "x"),
                    JMap.getInt(dataRef, "y"),
                    JMap.getInt(dataRef, "height"),
                    JMap.getInt(dataRef, "width"),
                    JMap.getInt(dataRef, "visible") == 1,
                    JMap.getInt(dataRef, "menu") == 1
                )

            } else if (eventName == "WebUI:SendMessage") {
                const componentMessageEvent  = JMap.getStr(dataRef, "event")
                const componentMessageTarget = JMap.getStr(dataRef, "target")
                const componentMessageSource = JMap.getStr(dataRef, "source")
                const componentMessageData   = JMap.getObj(dataRef, "data")
                if (componentMessageEvent.startsWith("WebUI:")) {
                    switch (componentMessageEvent) {
                        case "WebUI:Toggle":
                            WebUI.toggleComponent(componentMessageTarget)
                            break;
                    }
                } else if (componentMessageEvent == "SetCarryWeight") {
                    const newWeight = JMap.getInt(componentMessageData, "weight")
                    WebUI.postMessage("CarryWeightWidget", newWeight)
                } else {
                    Debug.messageBox("Unknown event: " + componentMessageEvent)
                }

            } else {
                Debug.messageBox("EVENT: " + eventName)
            }
        }
    })
}
