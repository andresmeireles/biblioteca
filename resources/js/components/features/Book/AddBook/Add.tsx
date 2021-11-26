import React, { FormEvent, ReactElement } from "react";
import { Card, CardContent, CardHeader, Container } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Scaffold from "../../../core/templates/Scaffold";
import BookForm from "../../../core/components/Book/BookForm";
import AddBook from "./AddBook";
import { BookFormInterface } from "../../../core/interfaces/Library";

const Add = function (): ReactElement {
    const navigate = useNavigate();

    async function handleSubmit(data: BookFormInterface) {
        const add = await AddBook(data);
        if (!add.success) {
            toast.error(add.message);
            return;
        }
        toast.success("livro inserido com sucesso!");
        navigate("/");
    }

    return (
        <Scaffold>
            <Container>
                <Card>
                    <CardHeader title="adicionar novo livro" />
                    <CardContent>
                        <BookForm isEdit={false} handleSubmit={handleSubmit} />
                    </CardContent>
                </Card>
            </Container>
        </Scaffold>
    );
};

export default Add;
