import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    List,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { getAllBooks } from "../../../core/api/Library/Book";
import { Book } from "../../../core/interfaces/Library";
import Scaffold from "../../../core/templates/Scaffold";
import RemoveBookDialog from "./components/RemoveBookDialog";

const RenderBookList = function (props: { books: Book[] }) {
    const [open, setOpen] = useState(false);
    const toggleDialog = () => setOpen(!open);

    const { books } = props;
    const render = books.map((book) => (
        <Grid container spacing={2} key={nanoid()}>
            <RemoveBookDialog
                open={open}
                handleClose={toggleDialog}
                bookId={book.id}
            />
            <Grid item xs={3}>
                {book.name}
            </Grid>
            <Grid item xs={2}>
                {book.author}
            </Grid>
            <Grid item xs={1}>
                {book.genre}
            </Grid>
            <Grid item xs={2}>
                <Button component={Link} to={`/book/${book.id}`} color="info">
                    visualizar
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button
                    component={Link}
                    to={`/book/edit/${book.id}`}
                    color="warning"
                >
                    editar
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button
                    component={Link}
                    to={`/book/${book.id}`}
                    color="error"
                    onClick={(event: React.MouseEvent) => {
                        event.preventDefault();
                        toggleDialog();
                    }}
                >
                    remover
                </Button>
            </Grid>
        </Grid>
    ));

    return <List>{render}</List>;
};

const ViewAllBooks = function (): ReactElement {
    const [books, setBooks] = useState<Book[]>();

    useEffect(() => {
        const get = async () => {
            const getBooks = await getAllBooks();
            if (getBooks.success) {
                setBooks(getBooks.message as Book[]);
            }
        };

        get();
    }, []);

    return (
        <Scaffold>
            <Card>
                <CardHeader title="lista de livros" />
                <CardContent>
                    {books === undefined ? (
                        "carregando"
                    ) : (
                        <RenderBookList books={books} />
                    )}
                </CardContent>
            </Card>
        </Scaffold>
    );
};

export default ViewAllBooks;
