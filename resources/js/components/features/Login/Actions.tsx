import { useContext } from "react";
import { AuthActionType } from "../../core/contexts/AuthProvider/AuthActions";
import AuthContext, {
    AuthContextInterface,
} from "../../core/contexts/AuthProvider/AuthContext";

export function login(authContext: AuthContextInterface): boolean {
    authContext.dispatch({
        type: AuthActionType.login,
        payload: { login: "a", password: "b" },
    });
    return true;
}

export function logout(): boolean {
    const authContext = useContext(AuthContext);
    authContext.dispatch({
        type: AuthActionType.login,
        payload: { login: "a", password: "b" },
    });
    return false;
}
