import { once, printConsole } from "skyrimPlatform"

once("tick", () => {
    printConsole("I am in PluginsDev test foo bar CHANGED")
})