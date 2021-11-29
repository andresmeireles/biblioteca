import { Card, CardContent, CardHeader } from "@mui/material";
import { nanoid } from "nanoid";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUserBooks } from "../../../core/api/Library/Book";
import AuthContext from "../../../core/contexts/AuthProvider/AuthContext";
import { BookWithAmount } from "../../../core/interfaces/Library";
import Scaffold from "../../../core/templates/Scaffold";
import ViewItem from "../components/ViewItem";

const BookList = function (props: { books: BookWithAmount[] }) {
    const { books } = props;
    const {
        state: { name },
    } = useContext(AuthContext);

    return (
        <Card>
            <CardHeader title={`livros de ${name}`} />
            <CardContent>
                {books.map((book) => (
                    <ViewItem book={book} key={nanoid()} />
                ))}
            </CardContent>
        </Card>
    );
};

const MyBooks = function (): ReactElement {
    const [books, setBooks] = useState<BookWithAmount[]>();

    useEffect(() => {
        const get = async () => {
            const userBookList = await getUserBooks();
            if (!userBookList.success) {
                toast.error(userBookList.message as string);
                setBooks([]);
                return;
            }
            setBooks(userBookList.message as BookWithAmount[]);
        };

        get();
    }, []);

    return (
        <Scaffold>
            {books === undefined ? (
                <div>carregando...</div>
            ) : (
                <BookList books={books} />
            )}
        </Scaffold>
    );
};

export default MyBooks;
