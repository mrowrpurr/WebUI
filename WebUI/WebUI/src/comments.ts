/*
 * Frontend
 */

// Consider moving EVERYTHING into a WebWebViewHost

// export interface WebUIEvent {
//     modName: string,
//     eventName: string,
//     data: any,
//     replyId: string
// }

// export function postEvent(event: WebUIEvent) {
//     // window.postMessage(event)
//     (window as any).skyrimPlatform.sendMessage("WebUI", event)
// }

// export function getUniqueReplyId() {
//     return `${Math.random()}_${Math.random()}`
// }

// class WebUIMod {
//     modName: string
//     constructor(modName: string) {
//         this.modName = modName
//         modInstances.set(modName, this)
//     }
//     public async request(query: string, parameters: any) {
//         const replyId = getUniqueReplyId()
//         return new Promise<any>(resolve => {
//             requestResultPromises.set(replyId, resolve)
//             postEvent({
//                 modName: this.modName,
//                 eventName: 'REQUEST',
//                 data: { query, parameters },
//                 replyId
//             })
//         })
//     }
//     public on(messageType: 'message', callback: (message: any) => void): void
//     public on(messageType: string, callback: (message: any) => void): void {

//     }
// }


// window.onload = () => {
//     (window as any).skyrimPlatform.sendMessage("WebUI", {
//         messageType: 'webviewhostloaded', target: '', message: {}
//     })
// }

// // TODO: make this __webUI so it's clear that it's a private API
// (window as any).getMod = (modName: string) => new WebUIMod(modName)