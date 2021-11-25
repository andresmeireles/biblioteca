import { AuthActions, AuthActionType, Login } from "./AuthActions";
import { AuthState } from "./AuthState";

const executeLogin = (auth: AuthState, login: Login) => {
    console.log(`login with ${login.login} `);
    return {
        userName: "",
        isAuthorized: true,
        apiToken: "",
    };
};

const executeLogout = (auth: AuthState) => {
    return auth;
};

const AuthReducer = function (
    state: AuthState,
    action: AuthActions
): AuthState {
    switch (action.type) {
        case AuthActionType.login:
            return executeLogin(state, action.payload);
        case AuthActionType.logout:
            return executeLogout(state);
        default:
            return state;
    }
};

export default AuthReducer;
