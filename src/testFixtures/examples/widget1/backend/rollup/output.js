(function () {
    'use strict';

    Object.defineProperty(exports, "__esModule", { value: true });
    const backend_1 = require("@skyrim-webui/backend");
    const webViewsHostClient = (0, backend_1.getWebViewsHostClient)();
    webViewsHostClient.registerWebView({
        id: "widget1",
        url: "http://localhost:8080/src/testFixtures/examples/widget1/frontend/"
    });
    webViewsHostClient.addToUI("widget1");
    // TODO: focus this!

})();
