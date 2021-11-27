import { Edit, Remove, RemoveCircle } from "@mui/icons-material";
import { Badge, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Book } from "../../../../core/interfaces/Library";
import RemoveBookDialog from "./RemoveBookDialog";

const ViewItem = function (props: { book: Book }) {
    const [open, setOpen] = useState(false);
    const toggleDialog = () => setOpen(!open);
    const { book } = props;

    return (
        <Grid container spacing={2}>
            <RemoveBookDialog
                open={open}
                handleClose={toggleDialog}
                bookId={book.id}
            />
            <Grid item xs={4}>
                {book.name}
            </Grid>
            <Grid item xs={2}>
                {book.author}
            </Grid>
            <Grid item xs={2}>
                {book.genre}
            </Grid>
            <Grid item xs={2}>
                {book.created_by}
            </Grid>
            <Grid item xs={1}>
                <Badge
                    component={Link}
                    to={`/book/edit/${book.id}`}
                    color="warning"
                >
                    <Edit />
                </Badge>
            </Grid>
            <Grid item xs={1}>
                <Badge
                    component={Link}
                    to={`/book/${book.id}`}
                    color="error"
                    onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        toggleDialog();
                    }}
                >
                    <RemoveCircle color="error" />
                </Badge>
            </Grid>
        </Grid>
    );
};

export default ViewItem;
