import { Debug, once } from 'skyrimPlatform'

export default function MessageBox(...args: any[]) {
    once('update', () => {
        Debug.messageBox(JSON.stringify(args))
    })
}