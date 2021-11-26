import React, {
    ReactElement,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { Navigate } from "react-router";
import { getWithToken } from "../../api/request";
import { AuthActionType } from "../../contexts/AuthProvider/AuthActions";
import AuthContext from "../../contexts/AuthProvider/AuthContext";
import { ApiUser } from "../../interfaces/ApiUser";

// verify is user is authorized here.
// do request to check user has valid token
const AuthRoute = function (props: { element: JSX.Element }): ReactElement {
    const [hasAuth, setHasAuth] = useState<boolean>();
    const { element } = props;
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        const get = async () => {
            try {
                const user = await getWithToken<ApiUser>("/api/user");
                setHasAuth(user.success);
            } catch {
                setHasAuth(false);
                dispatch({ type: AuthActionType.destroy });
            }
        };
        get();
    }, []);

    if (hasAuth === undefined) {
        return <div>carregando</div>;
    }
    return hasAuth ? element : <Navigate to="/login" />;
};

export default AuthRoute;
