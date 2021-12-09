"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
describe("testing", () => {
    it("something", () => {
        const env = (0, env_1.default)();
        const h1 = env.window.document.querySelector('h1');
        expect(h1 === null || h1 === void 0 ? void 0 : h1.textContent).toEqual("HELLO I AM AN H1");
    });
});
//# sourceMappingURL=hello.test.js.map