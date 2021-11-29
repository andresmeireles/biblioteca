import React, { ReactNode, useReducer } from "react";
import AuthContext, { initAuthState } from "./AuthContext";
import AuthReducer from "./AuthReducer";
import { AuthState } from "./AuthState";

const { Provider } = AuthContext;
const reducer = AuthReducer;

const findState = (): AuthState => {
    const storage = localStorage;
    const auth = storage.getItem("auth");
    if (auth === null) {
        return initAuthState;
    }
    const { name, userName, apiToken, isAuthorized, emailVerify } = JSON.parse(
        auth
    ) as AuthState;

    return {
        name,
        userName,
        isAuthorized: isAuthorized as unknown as boolean,
        apiToken,
        emailVerify,
    };
};

const AuthProvider = function (props: { children: ReactNode }) {
    // find state on localstorage
    const initState = findState();

    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export default AuthProvider;
