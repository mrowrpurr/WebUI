import {
    browser,
    Game,
    Input,
    once,
    printConsole,
    Utility,
    Debug,
    on,
    Ui
} from "skyrimPlatform"
import { initUI, showUI, addUI, focusUI, onAnyWebMessage, unfocusUI, hideUI } from "./WebPlatform"

initUI()

export let main = () => {
    once("update", () => {
        // Game.getPlayer()!.setDontMove(true)
        // Game.getPlayer()!.setRestrained(true)
        showUI()
        addUI("test1", "./testing.html", 5, 10, 80, 20, true)
        addUI("test2", "./widget.html", 92, 85, 8, 8, true)
        addUI("test3", "./widget1.html", 92, 75, 8, 8, true)
        addUI("test4", "./widget2.html", 92, 65, 8, 8, true)
        // Debug.messageBox("hi")
        focusUI()
        // browser.executeJavaScript("focusUI()")
        Ui.openCustomMenu("empty", 0)
        // browser.setFocused(true)
        // Game.disablePlayerControls(false, false, false, true, false, false, false, false, 0)
        // Game.disablePlayerControls(false, false, false, true, false, true, false, false, 0)
        // browser.setVisible(true)
        // browser.setFocused(true)
    })
    // on("browserMessage", data => {
    //     Debug.messageBox("????????")
    //     unfocusUI()
    //     hideUI()
    //     Debug.messageBox("????????")
    //     printConsole(JSON.stringify(data.arguments))
    //     Debug.messageBox(JSON.stringify(data.arguments))
    // })

on("browserMessage", (event) => {
//     printConsole("Hiiiii")
//   printConsole(JSON.stringify(event.arguments));
// Debug.notification("Browser message")
        unfocusUI()
        // hideUI()
        Utility.waitMenuMode(2).then(_ => {
            Ui.closeCustomMenu()
            // Debug.notification("Closed?")
        })
//   Debug.messageBox(JSON.stringify(event.arguments));
//     printConsole("Hiiiiiiiii")

});

    // onAnyWebMessage((event, id, data) => {
    //     unfocusUI()
    //     printConsole(`WEB MESSAGE event: ${event} id: ${id} data: ${JSON.stringify(data)}`)
    //     Debug.messageBox("HEY! A MESSAGE! THIS IS SKYRIM!")
    //     unfocusUI()
    // })
};
