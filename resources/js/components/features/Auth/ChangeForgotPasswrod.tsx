import {
    Avatar,
    Button,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Box } from "@mui/system";
import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import CleanScaffold from "../../core/templates/NonDashboardScaffol";
import { changeForgotPassword, verifyCanChange } from "./Action";
import Copyright from "../../core/components/Copyright";

const ChangePassword = function (props: { query: string }) {
    const { query } = props;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent<HTMLElement>) => {
        event.preventDefault();
        const passwords = {
            password,
            password_confirmation: confirmPassword,
        };
        const changePassword = await changeForgotPassword({
            query,
            password: passwords,
        });
        if (changePassword.success) {
            navigate("/login");
            return;
        }
        toast.error(changePassword.message);
    };

    return (
        <CleanScaffold>
            <CssBaseline />
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
                    Redina sua senha
                </Typography>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(change) =>
                                    setPassword(change.currentTarget.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password-confirm"
                                label="Confirme sua senha"
                                type="password"
                                id="password-confirm"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(change) =>
                                    setConfirmPassword(
                                        change.currentTarget.value
                                    )
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        trocar senha
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </CleanScaffold>
    );
};

const ChangeForgotPassword = function (): ReactElement {
    const query = useLocation().search;
    const [change, setCanChange] = useState<boolean>();

    useEffect(() => {
        const get = async () => {
            const canChange = await verifyCanChange(query);
            setCanChange(canChange.success);
        };

        get();
    }, []);

    if (change === undefined) {
        return <div>carregando</div>;
    }

    return change ? <ChangePassword query={query} /> : <Navigate to="/" />;
};

export default ChangeForgotPassword;
