import { DxScanCode, once, printConsole } from 'skyrimPlatform'

once('tick', () => {
    printConsole('Yo, does this text change in the game right now?')
})
