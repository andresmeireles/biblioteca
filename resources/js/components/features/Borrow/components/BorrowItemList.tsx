import { Button, Grid } from "@mui/material";
import React, { ReactElement, useState } from "react";
import { BookWithAmount } from "../../../core/interfaces/Library";
import ConfirmBorrowDialog from "./ConfirmBorrowDialog";

const BorrowItemList = function (props: {
    book: BookWithAmount;
}): ReactElement {
    const { book } = props;
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    return (
        <Grid container spacing={2}>
            <ConfirmBorrowDialog
                bookId={book.book_id.id}
                open={open}
                handleClose={toggle}
            />
            <Grid item xs={4}>
                {book.book_id.name}
            </Grid>
            <Grid item xs={4}>
                {book.book_id.author}
            </Grid>
            <Grid item xs={2}>
                {book.available_amount}
            </Grid>
            <Grid item xs={2}>
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={toggle}
                >
                    alugar
                </Button>
            </Grid>
        </Grid>
    );
};

export default BorrowItemList;
