"use strict";
class WebUIComponentHost {
    show(id) {
        alert(`You called show with: ${id}`);
    }
}
window.webUI = new WebUIComponentHost();
//# sourceMappingURL=webUI.js.map