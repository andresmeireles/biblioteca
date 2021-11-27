import { Avatar, Button, TextField, Typography } from "@mui/material";
import React, { FormEvent, ReactElement, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/system";
import CleanScaffold from "../../core/templates/NonDashboardScaffol";
import { toast } from "react-toastify";

const ForgotPassword = function (): ReactElement {
    const [email, setEmail] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLElement>) => {
        event.preventDefault();
        const forgotPasswordLink = await sendForgotPasswordEmail(email);
        toast.success(forgotPasswordLink.message);
    };

    return (
        <CleanScaffold>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    esqueci minha senha
                </Typography>
                <Typography component="p" alignItems="center">
                    insira o email que você cadastrou junto com seu usuário para
                    enviarmos o link para troca de senha
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="username"
                        value={email}
                        onChange={(value) =>
                            setEmail(value.currentTarget.value)
                        }
                        autoFocus
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        enviar email
                    </Button>
                </Box>
            </Box>
        </CleanScaffold>
    );
};

export default ForgotPassword;
