import { createContext, Dispatch } from "react";
import { AuthActions } from "./AuthActions";
import { AuthState } from "./AuthState";

export const initAuthState = {
    name: "",
    userName: "",
    isAuthorized: false,
    apiToken: "",
    emailVerify: true,
};

export interface AuthContextInterface {
    state: AuthState;
    dispatch: Dispatch<AuthActions>;
}

const AuthContext = createContext<AuthContextInterface>({
    state: initAuthState,
    dispatch: () => "",
});

export default AuthContext;
