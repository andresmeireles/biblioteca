import { toast } from "react-toastify";
import { get, post } from "../../core/api/request";
import { AuthActionType } from "../../core/contexts/AuthProvider/AuthActions";
import { AuthContextInterface } from "../../core/contexts/AuthProvider/AuthContext";
import {
    ApiResponse,
    FailApiResponse,
} from "../../core/interfaces/ApiResponse";
import { ApiAuthUser, ApiUser } from "../../core/interfaces/ApiUser";
import { Register } from "../../core/interfaces/AuthInterface";

export async function apiLogin(props: {
    login: string;
    password: string;
}): Promise<ApiResponse<ApiAuthUser>> {
    const { login, password } = props;

    const execute = await post<ApiAuthUser>("/api/login", {
        login,
        password,
    });

    return execute;
}

export function saveCredentials(
    context: AuthContextInterface,
    credentials: ApiAuthUser
): void {
    context.dispatch({
        type: AuthActionType.save,
        payload: {
            name: credentials.user.name,
            userName: credentials.user.username,
            apiToken: credentials.token,
            isAuthorized: true,
            emailVerify: true,
        },
    });
}

export async function signup(
    props: Register
): Promise<ApiResponse<ApiUser | string>> {
    const { password, password_confirmation } = props;
    if (password !== password_confirmation) {
        return FailApiResponse("senhas não são iguais");
    }
    const register = await post<ApiUser | string>("/api/register", props);
    return register;
}

export async function sendConfirmEmailByUsername(
    username: string
): Promise<ApiResponse<string>> {
    return post<string>("/api/confirmEmail", { username });
}

export async function verifyUserEmail(
    query: string
): Promise<ApiResponse<ApiAuthUser | string>> {
    return get<ApiAuthUser | string>(`/api/verifyEmail${query}`);
}

export async function sendForgotPasswordLink(
    email: string
): Promise<ApiResponse<string>> {
    return post<string>(`api/forgot-password`, { email });
}

export async function verifyCanChange(
    query: string
): Promise<ApiResponse<string>> {
    return get(`/api/canRedefineForgotPassword${query}`);
}

export async function changeForgotPassword(props: {
    query: string;
    password: {
        password: string;
        password_confirmation: string;
    };
}): Promise<ApiResponse<string>> {
    const { query, password } = props;
    return post(`/api/changeForgottenPassword${query}`, password);
}
