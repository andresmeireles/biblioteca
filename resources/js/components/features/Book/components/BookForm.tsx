import React, { FormEvent, ReactElement, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import {
    BookFormInterface,
    BookWithAmount,
} from "../../../core/interfaces/Library";

type BookFormType = {
    handleSubmit: (form: BookFormInterface) => void;
    isEdit: boolean;
    book?: BookWithAmount;
};

const BookForm = function (props: BookFormType): ReactElement {
    const { handleSubmit, isEdit, book } = props;
    const formBook = book === undefined ? null : book;

    const [name, setName] = useState(formBook?.book_id.name ?? "");
    const [author, setAuthor] = useState(formBook?.book_id.author ?? "");
    const [publicationYear, setPublicationYear] = useState(
        formBook?.book_id.publication_year.toString() ?? ""
    );
    const [code, setCode] = useState(formBook?.book_id.code ?? "");
    const [genre, setGenre] = useState(formBook?.book_id.genre ?? "");
    const [amount, setAmount] = useState(formBook?.amount.toString() ?? "");

    const submit = (event: FormEvent<HTMLElement>) => {
        event.preventDefault();
        const form = {
            name,
            author,
            publicationYear: Number(publicationYear),
            code,
            genre,
            amount: Number(amount),
        };
        handleSubmit(form);
    };

    return (
        <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="given-name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="nome do livro"
                        autoFocus
                        value={name}
                        onChange={(value) => setName(value.currentTarget.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="given-name"
                        name="publicationYear"
                        required
                        fullWidth
                        id="publicationYear"
                        label="Ano de publiccão"
                        value={publicationYear}
                        onChange={(value) =>
                            setPublicationYear(value.currentTarget.value)
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="given-name"
                        name="author"
                        required
                        fullWidth
                        id="author"
                        label="autor"
                        value={author}
                        onChange={(value) =>
                            setAuthor(value.currentTarget.value)
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="given-name"
                        name="code"
                        required
                        fullWidth
                        id="code"
                        label="codigo do livro"
                        value={code}
                        onChange={(value) => setCode(value.currentTarget.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="given-name"
                        name="genre"
                        required
                        fullWidth
                        id="genre"
                        label="genero do livro"
                        value={genre}
                        onChange={(value) =>
                            setGenre(value.currentTarget.value)
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        autoComplete="given-name"
                        name="amount"
                        required
                        fullWidth
                        id="amount"
                        label="quantidade de livro"
                        type="number"
                        value={amount}
                        onChange={(value) =>
                            setAmount(value.currentTarget.value)
                        }
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                {isEdit ? "Editar livro" : "Adicionar livro"}
            </Button>
        </Box>
    );
};

export default BookForm;
