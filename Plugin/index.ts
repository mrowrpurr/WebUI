import { on, once, printConsole, writeLogs } from "skyrimPlatform"

let somethingGlobal: string

once('tick', () => {
    writeLogs('testLoadGame', `Runing the Game [tick]`)
})

once('update', () => {
    writeLogs('testLoadGame', `Inside the Game [update]`)
})

on('loadGame', () => {
    writeLogs('testLoadGame', `loadGame() at ${Date.now()} and somethingGlobal: ${somethingGlobal}`)
    if (!somethingGlobal) {
        somethingGlobal = `Global variable defined during load game event at ${Date.now()}`
        writeLogs('../Bar/testLoadGame', `initialized 'somethingGlobal': ${somethingGlobal}`)
    }
})
