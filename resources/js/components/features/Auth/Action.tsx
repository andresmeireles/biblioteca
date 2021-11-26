import { post } from "../../core/api/request";
import { AuthActionType } from "../../core/contexts/AuthProvider/AuthActions";
import { AuthContextInterface } from "../../core/contexts/AuthProvider/AuthContext";
import { ApiResponse } from "../../core/interfaces/ApiResponse";
import { ApiAuthUser } from "../../core/interfaces/ApiUser";

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
            userName: credentials.user.username,
            apiToken: credentials.token,
            isAuthorized: true,
        },
    });
}
