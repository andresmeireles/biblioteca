import { ApiAuthUser } from "../../interfaces/ApiUser";
import { AuthActions, AuthActionType } from "./AuthActions";
import { initAuthState } from "./AuthContext";
import { AuthState } from "./AuthState";

const save = function (state: AuthState): AuthState {
    localStorage.setItem("auth", JSON.stringify(state));

    return state;
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
        case AuthActionType.destroy:
            return destroy();
        default:
            return state;
    }
};

export default AuthReducer;
