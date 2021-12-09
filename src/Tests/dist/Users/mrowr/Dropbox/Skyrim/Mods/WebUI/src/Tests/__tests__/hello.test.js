"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
describe("testing", () => {
    it("something", () => {
        const env = (0, env_1.default)();
        expect(env.window.document.querySelectorAll('iframe')).toHaveLength(0);
        expect(env.window.document.querySelectorAll('iframe')).toHaveLength(1);
    });
});
//# sourceMappingURL=hello.test.js.map