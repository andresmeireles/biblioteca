import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalLibrary from "@mui/icons-material/LocalLibrary";
import { Book, Edit } from "@material-ui/icons";
import { Link } from "react-router-dom";

export const mainListItems = (
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
        <ListItem button component={Link} to="/edit">
            <ListItemIcon>
                <Edit />
            </ListItemIcon>
            <ListItemText primary="Editar livros" />
        </ListItem>
        <ListItem button component={Link} to="/borrow">
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Pedir emprestimo" />
        </ListItem>
        <ListItem button component={Link} to="/borrow">
            <ListItemIcon>
                <Book />
            </ListItemIcon>
            <ListItemText primary="Visualizar biblioteca" />
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        {/* <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem> */}
    </div>
);
