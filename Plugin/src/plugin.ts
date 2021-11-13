import { on, printConsole, Debug, Game, Ui } from "skyrimPlatform"
import * as JMap from "JContainers/JMap"
import * as WebUI from "./WebUI"

WebUI.initUI()
WebUI.showUI()

let messageContainerId = 0

export function main() {

    let enableMenuMode  = false
    let disableMenuMode = false

    on("update", () => {
        if (enableMenuMode) {
            enableMenuMode = false
            Ui.openCustomMenu("InvisibleCustomMenu", 0)
        } else if (disableMenuMode) {
            disableMenuMode = false
            Ui.closeCustomMenu()
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

        if (messageContainerId == 0)
            messageContainerId = Game.getFormFromFile(0xd7d, "PapyrusToSkyrimPlatform.esp")!.getFormID()

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
                } else {
                    WebUI.postMessage(componentMessageTarget, dataRef)
                }

            } else if (eventName == "SetCarryWeight") {
                const newWeight = JMap.getInt(dataRef, "value")
                WebUI.postMessage("CarryingCapacityWidget", newWeight)

            } else {
                Debug.messageBox("EVENT: " + eventName)
            }
        }
    })
}
