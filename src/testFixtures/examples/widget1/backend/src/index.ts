import { once, printConsole } from 'skyrimPlatform'
// import { Something } from '@skyrim-webui/backend'
import { BackendSomething } from '@skyrim-webui/backend'

once('tick', () => {
    printConsole(`THIS IS NOT SYSTEM JS! And this is from a dependency: '${BackendSomething}'`)
})
