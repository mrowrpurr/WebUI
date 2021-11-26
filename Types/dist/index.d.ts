export interface WebComponent {
    id: string;
    url: string;
    position: WebComponentPosition;
}
export interface WebComponentPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}
