(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('@skyrim-webui/backend')) :
    typeof define === 'function' && define.amd ? define(['@skyrim-webui/backend'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.backend));
})(this, (function (backend) { 'use strict';

    var webViewsHostClient = backend.getWebViewsHostClient();
    webViewsHostClient.registerWebView({
        id: "widget1",
        url: "http://localhost:8080/src/testFixtures/examples/widget1/frontend/"
    });
    webViewsHostClient.addToUI("widget1");

}));
