import React, { ReactElement } from "react";
import { Box } from "@mui/system";
import { Container, Grid, Typography } from "@mui/material";
import DateString from "./DateString";
import { BlockUser } from "../interfaces/ApiUser";
import ScaffoldWithoutSidebar from "../templates/ScaffoldWithoutSidebar";

const BlockUser = function (props: { user: BlockUser }): ReactElement {
    const { user } = props;

    return (
        <ScaffoldWithoutSidebar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box>
                    <Typography align="center">
                        usuario bloqueado ate o dia
                    </Typography>
                </Box>
                <Box>
                    <Typography align="center">
                        <DateString date={user.until ?? ""} />
                    </Typography>
                </Box>
            </Container>
        </ScaffoldWithoutSidebar>
    );
};

export default BlockUser;
