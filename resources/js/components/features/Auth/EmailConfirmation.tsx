import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthActionType } from "../../core/contexts/AuthProvider/AuthActions";
import AuthContext from "../../core/contexts/AuthProvider/AuthContext";
import { ApiAuthUser } from "../../core/interfaces/ApiUser";
import { verifyUserEmail } from "./Action";

const EmailConfirmation = function (): ReactElement {
    const query = useLocation().search;
    const [verify, setVerify] = useState(false);
    const { dispatch } = useContext(AuthContext);

    useEffect(() => {
        const get = async () => {
            const verifyUser = await verifyUserEmail(query);
            if (verifyUser.success) {
                const user = verifyUser.message as ApiAuthUser;
                const auth = {
                    userName: user.user.username,
                    apiToken: user.token,
                    isAuthorized: true,
                    emailVerify: true,
                };
                dispatch({
                    type: AuthActionType.save,
                    payload: auth,
                });
                setVerify(true);
            }
        };

        get();
    }, []);

    return <div> {verify ? "verificado" : <Navigate to="/" />} </div>;
};

export default EmailConfirmation;
