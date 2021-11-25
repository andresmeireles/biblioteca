import { Button } from "@mui/material";
import React, { ReactElement, useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../core/contexts/AuthProvider/AuthContext";
import { login } from "./Actions";

const Login = function (): ReactElement {
    const navigator = useNavigate();
    const authContext = useContext(AuthContext);

    const executeLogin = () => {
        const userLogin = login(authContext);
        if (userLogin) {
            navigator("/");
        }
    };

    return (
        <div>
            <div>Login screen</div>
            <Button variant="contained" color="primary" onClick={executeLogin}>
                Login
            </Button>
        </div>
    );
};

export default Login;
