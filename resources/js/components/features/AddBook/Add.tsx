import React, { FormEvent, ReactElement } from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Grid,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import addBook from "./Action";
import Scaffold from "../../core/templates/Scaffold";

const Add = function (): ReactElement {
    const navigate = useNavigate();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const add = await addBook(form);
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
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
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
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Adicionar livro
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Scaffold>
    );
};

export default Add;
