import axios, { AxiosInstance } from "axios";
import env from "../../../../../env";
import { ApiResponse } from "../interfaces/ApiResponse";

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

function getToken(): string {
    const storage = localStorage.getItem("auth") ?? "";
    const parsed = JSON.parse(storage);
    return parsed.apiToken;
}

export async function postWithToken<T>(
    uri: string,
    body: Record<string, unknown>
): Promise<ApiResponse<T>> {
    const response = await getAxios().post<ApiResponse<T>>(uri, body, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.data;
}

export async function getWithToken<T>(uri: string): Promise<ApiResponse<T>> {
    const response = await getAxios().get<ApiResponse<T>>(uri, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return response.data;
}
