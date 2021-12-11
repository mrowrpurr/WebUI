export interface WebViewProps {
    id: string
    url: string
    x?: number
    y?: number
    width?: number
    height?: number
}

export default class WebView {
    public id: string
    public url: string
    public x = 0
    public y = 0
    public width = 100
    public height = 100

    constructor(props: WebViewProps) {
        this.id = props.id
        this.url = props.id
        if (props.x) this.x = props.x
        if (props.y) this.y = props.y
        if (props.width) this.width = props.width
        if (props.height) this.height = props.height
    }
}