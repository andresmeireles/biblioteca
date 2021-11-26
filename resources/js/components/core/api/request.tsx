import axios, { AxiosInstance } from "axios";
import { ApiResponse } from "../interfaces/ApiResponse";
import env from "../../../../../env";

export function getAxios(): AxiosInstance {
    const instance = axios.create({
        baseURL: env.apiUrl,
        timeout: 1000,
        withCredentials: true,
        headers: {
            "Content-type": "application/json; charset=utf-8",
        },
    });

    return instance;
}

export async function post<T>(
    uri: string,
    body: Record<string, unknown>
): Promise<ApiResponse<T>> {
    const response = await getAxios().post<ApiResponse<T>>(uri, body);
    return response.data;
}
