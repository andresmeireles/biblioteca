import React, { ReactElement, useContext } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalLibrary from "@mui/icons-material/LocalLibrary";
import { Assignment, Book, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthProvider/AuthContext";
import { ListSubheader } from "@mui/material";

const Menus = function (): ReactElement {
    const { state } = useContext(AuthContext);

    return (
        <div>
            <ListItem button component={Link} to="/add">
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Adicionar livros" />
            </ListItem>
            <ListItem button component={Link} to="/book">
                <ListItemIcon>
                    <LocalLibrary />
                </ListItemIcon>
                <ListItemText primary="Ver todos os livros" />
            </ListItem>
            <ListItem
                button
                component={Link}
                to={`/book/user/${state.userName}`}
            >
                {" "}
                <ListItemIcon>
                    <Edit />
                </ListItemIcon>
                <ListItemText primary="Meus livros" />
            </ListItem>
            <ListItem button component={Link} to="/borrow">
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="emprestimo de livros" />
            </ListItem>
            <ListItem button component={Link} to="/my-borrows">
                <ListItemIcon>
                    <Book />
                </ListItemIcon>
                <ListItemText primary="Livros alugados" />
            </ListItem>
        </div>
    );
};

export default Menus;
