import {
    once,
    printConsole
} from "skyrimPlatform"

export let main = () => {
    once("update", () => {
        printConsole("Hello from plugin!")
    });
};