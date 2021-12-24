import { browser } from '@skyrim-platform/skyrim-platform'

export function makeWidgetAppear(url: string) {
    browser.loadUrl(url)
    browser.setVisible(true)
}
