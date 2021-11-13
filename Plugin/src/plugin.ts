import { on, printConsole, Debug, Game, browser } from "skyrimPlatform"
import * as JMap from "JContainers/JMap"
import * as WebUI from "./WebUI"

WebUI.initUI()

export function main() {
    let messageContainerId = 0

    // TODO - Move to PapyrusToSkyrimPlatform.ts
    on("containerChanged", (event) => {  
        if (messageContainerId == 0)
            messageContainerId = Game.getFormFromFile(0xd7d, "PapyrusToSkyrimPlatform.esp")!.getFormID()
        if (event.newContainer.getFormID() == messageContainerId) {
            const eventRef  = parseInt(event.baseObj.getName())
            const eventName = JMap.getStr(eventRef, "event")
            const dataRef   = JMap.getObj(eventRef, "data")
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
        }
    })
}
