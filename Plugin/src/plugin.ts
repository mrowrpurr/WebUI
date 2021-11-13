import { on, printConsole, Debug, Game, browser } from "skyrimPlatform"
import * as JMap from "JContainers/JMap"
import * as WebUI from "./WebUI"

WebUI.initUI()

let messageContainerId = 0

export function main() {

    // on("browserMessage", (message) => {
    //     // Debug.messageBox("HELLO?????????")
    //     // printConsole(JSON.stringify(message))
    //     // // message.arguments
    //     // const anyForm = Game.getFormFromFile(0xd7d, "PapyrusToSkyrimPlatform.esp")!
    //     // const eventRef = JMap.object()
    //     // JMap.setStr(eventRef, "event", "Hello World Event")
    //     // JMap.setStr(eventRef, "sender", "The sender")
    //     // anyForm.sendModEvent("WebUI:Component:CarryingCapacityWidget", "", eventRef)


    // })

    // TODO - Move to PapyrusToSkyrimPlatform.ts
    on("containerChanged", (event) => {
        if (messageContainerId == 0)
            messageContainerId = Game.getFormFromFile(0xd7d, "PapyrusToSkyrimPlatform.esp")!.getFormID()
        if (event.newContainer.getFormID() == messageContainerId) {
            const eventRef  = parseInt(event.baseObj.getName())
            const eventName = JMap.getStr(eventRef, "event")
            const dataRef   = JMap.getObj(eventRef, "data")
            // Debug.messageBox("Yo, an event: " + eventName)
            if (eventName == "WebUI:RegisterComponent") {
                const id        = JMap.getStr(dataRef, "id")
                const filePath  = JMap.getStr(dataRef, "filepath")
                WebUI.addUI(
                    id,
                    WebUI.localFilePath(filePath),
                    JMap.getInt(dataRef, "x"),
                    JMap.getInt(dataRef, "y"),
                    JMap.getInt(dataRef, "height"),
                    JMap.getInt(dataRef, "width")
                )
                WebUI.showUI()
                // Use WebUI event handler for this!
            } else if (eventName == "SetCarryWeight") {
                const newWeight = JMap.getInt(dataRef, "value")
                WebUI.postMessage("CarryingCapacityWidget", newWeight)
            } else {
                Debug.messageBox("EVENT: " + eventName)
            }
        }
    })

    // WebUI.onAnyWebMessage((event, id, data) => {
    //     const anyForm = Game.getFormFromFile(0xd7d, "PapyrusToSkyrimPlatform.esp")!
    //     const eventRef = JMap.object()
    //     JMap.setStr(eventRef, "event", "Hello World Event")
    //     JMap.setStr(eventRef, "sender", "The sender")
    //     anyForm.sendModEvent("WebUI:Component:CarryingCapacityWidget", "", eventRef)
    // })
}
