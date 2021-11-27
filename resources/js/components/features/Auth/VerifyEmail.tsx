import { Typography, Link, Button } from "@mui/material";
import React, { ReactElement, useContext } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import AuthContext from "../../core/contexts/AuthProvider/AuthContext";
import CleanScaffold from "../../core/templates/NonDashboardScaffol";
import { sendConfirmEmailByUsername } from "./Action";

const View = function (props: { userName: string }) {
    const { userName } = props;

    const sendConfirmEmail = async () => {
        const confirmEmail = await sendConfirmEmailByUsername(userName);
        if (confirmEmail.success) {
            toast.success(confirmEmail.message);
            return;
        }
        toast.error(confirmEmail.message);
    };

    return (
        <CleanScaffold>
            <Typography sx={{ marginTop: 5 }}>
                Para continuar você precisa varificar seu email. Olha sua caixa
                de entrada. Clique{" "}
                <span>
                    <Link href="#" underline="none" onClick={sendConfirmEmail}>
                        aqui
                    </Link>
                </span>{" "}
                para enviar o email novamente. Ou parte no botão abaixo para
                enviar.
            </Typography>
            <Button
                variant="contained"
                sx={{ marginTop: 5 }}
                onClick={sendConfirmEmail}
            >
                enviar email de confirmação novamente
            </Button>
        </CleanScaffold>
    );
};

const VerifyEmail = function (): ReactElement {
    const { state } = useContext(AuthContext);

    return state.emailVerify ? (
        <Navigate to="/" />
    ) : (
        <View userName={state.userName} />
    );
};

export default VerifyEmail;
