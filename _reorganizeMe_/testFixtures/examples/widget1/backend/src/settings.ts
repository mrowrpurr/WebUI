import { settings } from 'skyrimPlatform'
import info from '~/modInfo'

const s: typeof info.settings = {
  logLevel: settings[info.title].logLevel as string,
}

export default s
