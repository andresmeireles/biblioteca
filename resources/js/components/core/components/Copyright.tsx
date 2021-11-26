import { Link, Typography } from "@material-ui/core";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/system";
import React, { ReactElement } from "react";

interface CopyrightProps {
    sx: {
        mt?: number;
        mb?: number;
    };
}

const Copyright = function (props: any): ReactElement {
    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Typography
                variant="body2"
                color="secondary"
                align="center"
                {...props}
            >
                {"Copyright © "}
                <Link
                    color="inherit"
                    href="https://mui.comhttps://andresmeireles.github.io/"
                >
                    Biblioteca
                </Link>{" "}
                {new Date().getFullYear()}
            </Typography>
        </ThemeProvider>
    );
};

export default Copyright;
