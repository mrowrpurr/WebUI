import {
    browser,
    Game,
    Input,
    once,
    printConsole,
    Utility,
    Debug
} from "skyrimPlatform"
import { initUI, showUI, addUI, focusUI, onAnyWebMessage, unfocusUI } from "./WebPlatform"

initUI()

export let main = () => {
    once("update", () => {
        showUI()
        addUI("test1", "./testing.html", 5, 10, 80, 20, true)
        addUI("test2", "./widget.html", 92, 85, 8, 8, true)
        addUI("test3", "./widget1.html", 92, 75, 8, 8, true)
        addUI("test4", "./widget2.html", 92, 65, 8, 8, true)
        Debug.messageBox("hi")
        focusUI()
    })
    onAnyWebMessage((id, data) => {
        // printConsole(`WEB MESSAGE id: ${id} data: ${JSON.stringify(data)}`)
        Debug.messageBox("HEY! A MESSAGE! THIS IS SKYRIM!")
        unfocusUI()
    })
};
