import { Assignment, Backpack } from "@mui/icons-material";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@mui/material";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

const SecondaryMenu = function (): ReactElement {
    return (
        <div>
            <ListSubheader inset>Bibliotecario</ListSubheader>
            <ListItem button component={Link} to="/to-approve-borrows">
                <ListItemIcon>
                    <Assignment />
                </ListItemIcon>
                <ListItemText primary="Aprovar emprestimos" />
            </ListItem>
            <ListItem button component={Link} to="/return-borrow">
                <ListItemIcon>
                    <Backpack />
                </ListItemIcon>
                <ListItemText primary="Devolução" />
            </ListItem>
        </div>
    );
};

export default SecondaryMenu;
