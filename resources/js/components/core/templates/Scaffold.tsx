import React, { ReactElement, ReactNode, useContext, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { LockOpen, Search } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Copyright from "../components/Copyright";
// import { mainListItems, secondaryListItems } from "./Menus";
import AuthContext from "../contexts/AuthProvider/AuthContext";
import { AuthActionType } from "../contexts/AuthProvider/AuthActions";
import Menus from "./Menus";
import SecondaryMenu from "./SecondaryMenus";

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

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const mdTheme = createTheme();

const DashboardContent = function (props: {
    children: ReactNode | ReactElement;
}): ReactElement {
    const { children } = props;
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
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
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: "24px", // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
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
                {/* DRAWLER */}
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List>
                        <Menus />
                    </List>
                    <Divider />
                    <List>
                        <SecondaryMenu />
                    </List>
                </Drawer>
                {/* END DRAWLER */}
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

const Scaffold = function (props: {
    children: ReactNode | ReactElement | JSX.Element;
}): ReactElement {
    const { children } = props;
    return <DashboardContent>{children}</DashboardContent>;
};

export default Scaffold;
