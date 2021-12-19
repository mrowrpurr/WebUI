import { browser } from 'skyrimPlatform'

export function makeWidgetAppear(url: string) {
    browser.loadUrl(url)
    browser.setVisible(true)
}
