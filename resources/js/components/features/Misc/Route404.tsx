import { Grid, Link } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import { useNavigate } from "react-router";
import CleanScaffold from "../../core/templates/CleanScaffold";

const R404 = function (): ReactElement {
    const navigate = useNavigate();
    return (
        <CleanScaffold>
            <Grid container spacing={0}>
                <Box>
                    pagina não encontrada clique{" "}
                    <Link
                        href="#"
                        underline="none"
                        onClick={() => navigate(-1)}
                    >
                        aqui
                    </Link>{" "}
                    para voltar{" "}
                </Box>
            </Grid>
        </CleanScaffold>
    );
};

export default R404;
