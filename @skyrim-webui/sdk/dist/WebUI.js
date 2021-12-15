/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-namespace */
// Generated automatically. Do not edit.
System.register("Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/@skyrim-webui/sdk/src/@skyrim-webui/sdk/index", ["Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform"], function (exports_2, context_2) {
    "use strict";
    var skyrimPlatform_1;
    var __moduleName = context_2 && context_2.id;
    function addTestIframe(url) {
        skyrimPlatform_1.browser.executeJavaScript(`__webViewsHost__.registerWebView({"id":"wassup","url":${JSON.stringify(url)}})`);
        skyrimPlatform_1.browser.executeJavaScript(`__webViewsHost__.addToUI("wassup")`);
    }
    exports_2("addTestIframe", addTestIframe);
    return {
        setters: [
            function (skyrimPlatform_1_1) {
                skyrimPlatform_1 = skyrimPlatform_1_1;
            }
        ],
        execute: function () {
        }
    };
});
