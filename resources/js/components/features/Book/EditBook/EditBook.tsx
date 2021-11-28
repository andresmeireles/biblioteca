import { Card, CardContent, CardHeader } from "@mui/material";
import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { editBook, getBookById } from "../../../core/api/Library/Book";
import {
    Book,
    BookFormInterface,
    BookWithAmount,
} from "../../../core/interfaces/Library";
import Scaffold from "../../../core/templates/Scaffold";
import BookForm from "../components/BookForm";

const EditBook = function () {
    const { id } = useParams<"id">();
    const navigate = useNavigate();
    const [bookWithAmount, setBook] = useState<BookWithAmount>();

    useEffect(() => {
        const get = async () => {
            const book = await getBookById(Number(id));
            if (!book.success) {
                toast.error(book.message as string);
                navigate("/book");
                return;
            }

            setBook(book.message as BookWithAmount);
        };

        get();
    }, []);

    const handleSubmit = async (editData: BookFormInterface) => {
        const edit = await editBook(Number(id), editData);
        if (edit.success) {
            const book = edit.message as Book;
            toast.success(`Livro ${book.name} editado com sucesso`);
            navigate("/book");
            return;
        }
        toast.error(edit.message as string);
    };

    return (
        <Scaffold>
            {bookWithAmount === undefined ? (
                <div>carregando</div>
            ) : (
                <Card>
                    <CardHeader title="alterar livro" />
                    <CardContent>
                        <BookForm
                            isEdit
                            book={bookWithAmount}
                            handleSubmit={handleSubmit}
                        />
                    </CardContent>
                </Card>
            )}
        </Scaffold>
    );
};

export default EditBook;
