export interface Envelope<T> {
    data: T;
    error?: string;
    statusCode: number;
    success: boolean;
}
