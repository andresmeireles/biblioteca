import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Typography,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BorrowedBook } from "../../../core/interfaces/Library";
import { getMyBorrowedBooks } from "../../Borrow/Action";

const BorrowTile = function (): ReactElement {
    const [allBorrow, setAllBorrow] = useState<number>();
    const [nonFinishedBorrow, setNonFinishedBorrow] = useState<number>();

    useEffect(() => {
        const get = async () => {
            const borrow = await getMyBorrowedBooks();
            if (!borrow.success) {
                toast.error(borrow.message as string);
                return;
            }
            const borrows = borrow.message as BorrowedBook[];
            setAllBorrow(borrows.length);
            const nonFinished = borrows.filter((b) => b.finished === 0);
            setNonFinishedBorrow(nonFinished.length);
        };

        get();
    }, []);

    return (
        <Card>
            <CardHeader title="Livros alugados" />
            <CardContent>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography>Todos os alugueis</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>{allBorrow}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography>alugueis pendentes</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>{nonFinishedBorrow}</Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            component={Link}
                            to="/my-borrows"
                            color="primary"
                            variant="text"
                        >
                            <Typography
                                textAlign="start"
                                alignContent="start"
                                alignItems="start"
                            >
                                ver meus alugueis
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default BorrowTile;
