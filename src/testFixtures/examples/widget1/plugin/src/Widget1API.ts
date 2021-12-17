import { ContainerChangedEvent, printConsole } from 'skyrimPlatform'

export interface OnContainerChange {
    (callback: (event: ContainerChangedEvent) => void): void
}

// TODO have this extend an API class *maybe*
export default class Widget1API {
    onContainerChange: OnContainerChange

    constructor(onContainerChange: OnContainerChange) {
        this.onContainerChange = onContainerChange
        this.onContainerChange(event => {
            printConsole(`CONTAINER CHANGE ${event.baseObj.getName()}`)
        })
    }
}