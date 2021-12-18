import { storage } from 'skyrimPlatform'
import { WebUIRuntime } from './WebUI/WebUIRuntime'

// if (! storage['browserLoaded']) {
    WebUIRuntime.run()
    // storage['browserLoaded'] = true
// }