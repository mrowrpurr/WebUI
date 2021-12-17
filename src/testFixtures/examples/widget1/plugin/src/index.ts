import { on } from 'skyrimPlatform'
import Widget1API from './Widget1API'

new Widget1API(onContainerChange => {
    on('containerChanged', onContainerChange)
})