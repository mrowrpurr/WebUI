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
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/src/modDistributable/runtime/src/WebUI/WebUIRuntime", ["Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform"], function (exports_2, context_2) {
    "use strict";
    var skyrimPlatform_1, WebUIRuntime;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (skyrimPlatform_1_1) {
                skyrimPlatform_1 = skyrimPlatform_1_1;
            }
        ],
        execute: function () {
            WebUIRuntime = class WebUIRuntime {
                static run(webViewsHostURI = 'file:///Data/WebUI/__WebUI__/browserEnvironment.html') {
                    new WebUIRuntime().run(webViewsHostURI);
                }
                run(webViewsHostURI) {
                    skyrimPlatform_1.browser.setVisible(false);
                    skyrimPlatform_1.browser.loadUrl(webViewsHostURI);
                    // Wait for load! Via browserMessage
                    skyrimPlatform_1.browser.setVisible(true);
                }
            };
            exports_2("WebUIRuntime", WebUIRuntime);
        }
    };
});
System.register("Users/mrowr/Dropbox/Skyrim/Mods/WebUI/src/modDistributable/runtime/src/index", ["Steam/steamapps/common/Skyrim Special Edition - Modding/Data/Platform/Modules/skyrimPlatform", "Users/mrowr/Dropbox/Skyrim/Mods/WebUI/src/modDistributable/runtime/src/WebUI/WebUIRuntime"], function (exports_3, context_3) {
    "use strict";
    var skyrimPlatform_2, WebUIRuntime_1;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (skyrimPlatform_2_1) {
                skyrimPlatform_2 = skyrimPlatform_2_1;
            },
            function (WebUIRuntime_1_1) {
                WebUIRuntime_1 = WebUIRuntime_1_1;
            }
        ],
        execute: function () {
            if (!skyrimPlatform_2.storage['browserLoaded']) {
                WebUIRuntime_1.WebUIRuntime.run();
                skyrimPlatform_2.storage['browserLoaded'] = true;
            }
        }
    };
});
