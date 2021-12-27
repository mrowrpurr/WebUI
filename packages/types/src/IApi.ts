export interface IApiRequest {
    path: string
    data?: any
}

export interface IApiResponse {
    data: any
}

export default interface IApi {
    get(path: string, data?: any): Promise<IApiResponse>
    post(path: string, data?: any): void
}
