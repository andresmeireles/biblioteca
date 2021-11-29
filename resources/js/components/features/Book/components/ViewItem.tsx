import { Edit, RemoveCircle } from "@mui/icons-material";
import { Badge, Grid, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Book, BookWithAmount } from "../../../core/interfaces/Library";
import RemoveBookDialog from "../ViewBooks/components/RemoveBookDialog";

const ViewItem = function (props: { book: BookWithAmount }) {
    const [open, setOpen] = useState(false);
    const toggleDialog = () => setOpen(!open);
    const { book } = props;

    return (
        <Grid container spacing={2}>
            <RemoveBookDialog
                open={open}
                handleClose={toggleDialog}
                bookId={book.book_id.id}
            />
            <Grid item xs={4}>
                {book.book_id.name}
            </Grid>
            <Grid item xs={2}>
                {book.book_id.author}
            </Grid>
            <Grid item xs={2}>
                {book.book_id.genre}
            </Grid>
            <Grid item xs={2}>
                {book.book_id.created_by.name}
            </Grid>
            <Grid item xs={1}>
                <Tooltip title="editar">
                    <Badge
                        component={Link}
                        to={`/book/edit/${book.book_id.id}`}
                        color="warning"
                    >
                        <Edit />
                    </Badge>
                </Tooltip>
            </Grid>
            <Grid item xs={1}>
                <Tooltip title="remover">
                    <Badge
                        component={Link}
                        to={`/book/${book.book_id.id}`}
                        color="error"
                        onClick={(event: React.MouseEvent) => {
                            event.preventDefault();
                            toggleDialog();
                        }}
                    >
                        <RemoveCircle color="error" />
                    </Badge>
                </Tooltip>
            </Grid>
        </Grid>
    );
};

export default ViewItem;
