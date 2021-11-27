import { Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React, { ReactElement, ReactNode } from "react";

const theme = createTheme();

const CleanScaffold = function (props: {
    children: ReactNode | ReactElement | JSX.Element;
}): ReactElement {
    const { children } = props;
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                {children}
            </Container>
        </ThemeProvider>
    );
};

export default CleanScaffold;
