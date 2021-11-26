import React, { ReactElement, ReactNode, useContext } from "react";
import { Navigate } from "react-router";
import AuthContext from "../../contexts/AuthProvider/AuthContext";

// verify is user is authorized here.
// do request to check user has valid token
const NonAuthRoute = function (props: { element: JSX.Element }): ReactElement {
    const { element } = props;
    const { isAuthorized } = useContext(AuthContext).state;

    return isAuthorized ? <Navigate to="/" /> : element;
};

export default NonAuthRoute;
