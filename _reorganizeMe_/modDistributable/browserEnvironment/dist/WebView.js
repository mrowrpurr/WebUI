"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebView {
    constructor(props) {
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.positionType = 'percentage';
        this.id = props.id;
        this.url = props.id;
        if (props.x)
            this.x = props.x;
        if (props.y)
            this.y = props.y;
        if (props.width)
            this.width = props.width;
        if (props.height)
            this.height = props.height;
        if (props.positionType)
            this.positionType = props.positionType;
    }
}
exports.default = WebView;
//# sourceMappingURL=WebView.js.map