import React, { ReactElement, ReactNode, useContext } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { LockOpen, Search } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Copyright from "../components/Copyright";
import AuthContext from "../contexts/AuthProvider/AuthContext";
import { AuthActionType } from "../contexts/AuthProvider/AuthActions";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const mdTheme = createTheme();

const DashboardContent = function (props: {
    children: ReactNode | ReactElement;
}): ReactElement {
    const { children } = props;
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        authContext.dispatch({ type: AuthActionType.destroy });
        navigate("/login");
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                {/* APPBAR */}
                <AppBar>
                    <Toolbar>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            <Link to="/" className="nolink">
                                Biblioteca
                            </Link>
                        </Typography>
                        <Tooltip title="pesquisar livros">
                            <IconButton color="inherit">
                                <Search />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="logout">
                            <IconButton color="inherit" onClick={logout}>
                                <LockOpen />
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                {/* END APPB */}
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <Toolbar />
                    <Container sx={{ py: 2 }}>{children}</Container>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

const ScaffoldWithoutSidebar = function (props: {
    children: ReactNode | ReactElement | JSX.Element;
}): ReactElement {
    const { children } = props;
    return <DashboardContent>{children}</DashboardContent>;
};

export default ScaffoldWithoutSidebar;
