import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { getWithToken } from "../../api/request";
import { AuthActionType } from "../../contexts/AuthProvider/AuthActions";
import AuthContext from "../../contexts/AuthProvider/AuthContext";
import { ApiUser, UserVerified } from "../../interfaces/ApiUser";

// verify is user is authorized here.
// verify email.
// do request to check user has valid token
const AuthRoute = function (props: { element: JSX.Element }): ReactElement {
    const [hasAuth, setHasAuth] = useState<boolean>();
    const [emailVerified, setEmailVerified] = useState(true);
    const { element } = props;
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        const get = async () => {
            try {
                const user = await getWithToken<ApiUser | UserVerified>(
                    "/api/user"
                );
                if (!user.success) {
                    const verify = user.message as UserVerified;
                    setEmailVerified(verify.verified);
                    dispatch({
                        type: AuthActionType.verifyEmail,
                        payload: verify.user,
                    });
                    return;
                }
                setHasAuth(user.success);
            } catch {
                setHasAuth(false);
                dispatch({ type: AuthActionType.destroy });
            }
        };
        get();
    }, []);

    if (!emailVerified) {
        return <Navigate to="/verify-email" />;
    }
    if (hasAuth === undefined) {
        return <div>carregando</div>;
    }
    return hasAuth ? element : <Navigate to="/login" />;
};

export default AuthRoute;
