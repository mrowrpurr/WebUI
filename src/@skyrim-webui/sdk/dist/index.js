import { browser } from 'skyrimPlatform';
export function makeWidgetAppear(url) {
    browser.loadUrl(url);
    browser.setVisible(true);
}
