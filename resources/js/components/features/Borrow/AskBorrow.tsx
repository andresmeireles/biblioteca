import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllBooksWithAmount } from "../../core/api/Library/Book";
import { Book, BookWithAmount } from "../../core/interfaces/Library";
import Scaffold from "../../core/templates/Scaffold";
import BorrowItemList from "./components/BorrowItemList";

const BookListContent = function (props: { books: BookWithAmount[] }) {
    const { books } = props;

    return (
        <>
            {books.map((book) => (
                <BorrowItemList book={book} />
            ))}
        </>
    );
};

const AskBorrow = function (): ReactElement {
    const [books, setBooks] = useState<BookWithAmount[]>();

    useEffect(() => {
        const get = async () => {
            const bookList = await getAllBooksWithAmount();
            if (!bookList.success) {
                toast.error(bookList.message as string);
                setBooks([]);
                return;
            }
            setBooks(bookList.message as BookWithAmount[]);
        };

        get();
    }, []);

    return (
        <Scaffold>
            <Card>
                <CardHeader title="alugar livros" />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            livro
                        </Grid>
                        <Grid item xs={4}>
                            autor
                        </Grid>
                        <Grid item xs={2}>
                            qnt. disponivel
                        </Grid>
                        <Grid item xs={2}>
                            ações
                        </Grid>
                    </Grid>
                    {books === undefined ? (
                        <div>carregando...</div>
                    ) : (
                        <BookListContent books={books} />
                    )}
                </CardContent>
            </Card>
        </Scaffold>
    );
};

export default AskBorrow;
