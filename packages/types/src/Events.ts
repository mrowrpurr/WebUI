export interface IEvent {
    source: string
    target: string
}

export interface IEventMessage extends IEvent {
    eventName: string
    data?: any
}

export interface IEventRequest extends IEvent {
    replyId: string
    query: string
    data?: any
}

export interface IEventResponse extends IEvent {
    data: any
}

export interface IEventReply {
    replyId: string
    response: IEventResponse    
}

export interface IEventEmitter {
    send(message: IEventMessage): void
    request(request: IEventRequest): Promise<IEventResponse>
}

export interface IEventReceiver {
    onEvent(callback: (message: IEventMessage) => void): void
    onRequest(callback: (request: IEventRequest) => Promise<IEventReply>): void
}
