import { once, printConsole } from 'skyrimPlatform';
import { getWebViewsHostClient } from '@skyrim-webui/backend';
once('tick', function () {
    printConsole("Hello from Widget1, gonna try to register a Web UI!");
    var client = getWebViewsHostClient();
    client.registerWebView({
        id: "widget1",
        url: "http://localhost:8080/src/testFixtures/examples/widget1/frontend/"
    });
    client.addToUI("widget1");
    printConsole("Ok, I added widget1?");
});
