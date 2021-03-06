import React, { ReactElement, useContext } from "react";
import { Card, CardContent, CardHeader, Typography, Grid } from "@mui/material";
import AuthContext from "../../core/contexts/AuthProvider/AuthContext";
import Scaffold from "../../core/templates/Scaffold";
import AsyncText from "../../core/components/Text/AsyncText";
import { bookAmount } from "./Actions";
import BorrowTile from "./components/BorrowTile";

const Home = function (): ReactElement {
    const { state } = useContext(AuthContext);
    return (
        <Scaffold>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Card>
                        <CardHeader title={`Perfil de ${state.userName}`} />
                        <CardContent>
                            <Grid container>
                                <Grid item xs={8}>
                                    <Typography>Livos cadastrados</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>
                                        <AsyncText text={bookAmount()} />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <BorrowTile />
                </Grid>
            </Grid>
        </Scaffold>
    );
};

export default Home;
