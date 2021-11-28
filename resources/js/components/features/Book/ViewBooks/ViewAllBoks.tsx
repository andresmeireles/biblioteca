import { Card, CardContent, CardHeader, Grid, List } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { getAllBooksWithAmount } from "../../../core/api/Library/Book";
import { Book, BookWithAmount } from "../../../core/interfaces/Library";
import Scaffold from "../../../core/templates/Scaffold";
import ViewItem from "../components/ViewItem";

const RenderBookList = function (props: { books: BookWithAmount[] }) {
    const { books } = props;
    const render = books.map((book) => <ViewItem book={book} key={nanoid()} />);

    return <List>{render}</List>;
};

const ViewAllBooks = function (): ReactElement {
    const [books, setBooks] = useState<BookWithAmount[]>();

    useEffect(() => {
        const get = async () => {
            const getBooks = await getAllBooksWithAmount();
            if (getBooks.success) {
                setBooks(getBooks.message as BookWithAmount[]);
            }
        };

        get();
    }, []);

    return (
        <Scaffold>
            <Card>
                <CardHeader title="lista de livros" />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <b>Nome</b>
                        </Grid>
                        <Grid item xs={2}>
                            <b>Autor</b>
                        </Grid>
                        <Grid item xs={2}>
                            <b>Genero</b>
                        </Grid>
                        <Grid item xs={2}>
                            <b>Cadastrado por</b>
                        </Grid>
                        <Grid item xs={2}>
                            <b>Ações</b>
                        </Grid>
                    </Grid>
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
