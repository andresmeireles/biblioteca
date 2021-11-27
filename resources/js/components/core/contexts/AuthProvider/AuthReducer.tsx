import { ApiAuthUser, ApiUser } from "../../interfaces/ApiUser";
import { AuthActions, AuthActionType } from "./AuthActions";
import { initAuthState } from "./AuthContext";
import { AuthState } from "./AuthState";

const save = function (state: AuthState): AuthState {
    localStorage.setItem("auth", JSON.stringify(state));

    return state;
};

const email = function (user: ApiUser): AuthState {
    const auth = {
        userName: user.username,
        isAuthorized: false,
        apiToken: "",
        emailVerify: false,
    };
    localStorage.setItem("auth", JSON.stringify(auth));

    return auth;
};

const destroy = () => {
    localStorage.removeItem("auth");
    return initAuthState;
};

const AuthReducer = function (
    state: AuthState,
    action: AuthActions
): AuthState {
    switch (action.type) {
        case AuthActionType.save:
            return save(action.payload);
        case AuthActionType.verifyEmail:
            return email(action.payload);
        case AuthActionType.destroy:
            return destroy();
        default:
            return state;
    }
};

export default AuthReducer;
