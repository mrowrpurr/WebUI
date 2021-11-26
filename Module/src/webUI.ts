import { browser, Debug } from 'skyrimPlatform'

const components = new Map<string, WebComponent>()

export interface WebComponent {
    id: string,
    url: string
}

export function registerComponent(component: WebComponent) {
    components.set(component.id, component)
}
