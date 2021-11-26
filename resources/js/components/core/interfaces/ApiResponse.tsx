export interface ApiResponse<T> {
    message: T;
    success: boolean;
}

export function FailApiResponse(message: string): ApiResponse<string> {
    return {
        success: false,
        message,
    };
}
