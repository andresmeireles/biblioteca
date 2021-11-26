import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    List,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { getAllBooks } from "../../core/api/Library/Book";
import { Book } from "../../core/interfaces/Library";
import Scaffold from "../../core/templates/Scaffold";

const RenderBookList = function (props: { books: Book[] }) {
    const { books } = props;
    const render = books.map((book) => (
        <Grid container>
            <Grid item xs={5}>
                {book.name}
            </Grid>
            <Grid item xs={2}>
                {book.author}
            </Grid>
            <Grid item xs={2}>
                {book.genre}
            </Grid>
            <Grid item xs={1}>
                <Button component={Link} to={`/book/${book.id}`}>
                    visualizar
                </Button>
            </Grid>
            <Grid item xs={1}>
                editar
            </Grid>
            <Grid item xs={1}>
                remover
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
            setBooks(getBooks.message);
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
