import { on, printConsole, Debug, Game, Ui, browser, once } from "skyrimPlatform"
import * as JMap from "JContainers/JMap"
import * as WebUI from "./WebUI"
import { listenForPapyrusEvents, onPapyrusEvent, sendPapyrusEvent } from "papyrusToSkyrimPlatform"

WebUI.initUI()
WebUI.showUI()

export function main() {

    let enableMenuMode  = false
    let disableMenuMode = false

    listenForPapyrusEvents()

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
        if (message.arguments.length && message.arguments[0] == "WebUI") {
            const eventName = message.arguments[1]
            if (eventName == "EnterMenuMode") {
                enableMenuMode = true
            } else if (eventName == "LeaveMenuMode") {
                disableMenuMode = true
            } else if (eventName == "OnMessage") {
                // TODO - generic message sent without our helper functions
            } else if (eventName == "OnComponentEvent") {
                const componentEventValueType = message.arguments[2]
                const componentEventSource    = message.arguments[3]
                const componentEventTarget    = message.arguments[4]
                const componentEventName      = message.arguments[5]
                const componentEventData      = message.arguments[6]

                // TODO: ONLY DO THIS IF PAPYRUS EVENTS ARE ENABLED, ELSE DO SKYRIM PLATFORM EVENT, OR BOTH
                sendPapyrusEvent("WebUI:ComponentEvent:" + componentEventTarget, {
                    sender: componentEventSource,
                    target: componentEventTarget,
                    event: componentEventName,
                    value: componentEventData,
                    valueType: componentEventValueType
                })

            } else {
                // TODO
            }
        }
    })

    onPapyrusEvent((event) => {
        const eventName = event.eventName
        const dataRef   = event.jcontainersObjectValue

        // MAKE THIS REGISTER ONLY - DO *NOT* ADD THE IFRAME
        if (eventName == "WebUI:RegisterComponent") {
            const id        = JMap.getStr(dataRef, "id")
            const filePath  = JMap.getStr(dataRef, "filepath")
            const url       = JMap.getStr(dataRef, "url")
            let uri = ""
            if (url)
                uri = url
            else
                uri = WebUI.localFilePath(filePath)
            WebUI.addUI(
                id,
                uri,
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

        } else if (eventName == "WebUI:Refresh") {
            WebUI.refreshAll()

        } else {
            Debug.messageBox("EVENT: " + eventName)
        }
    })
}
