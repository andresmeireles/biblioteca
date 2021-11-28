import { Grid, Card, CardContent, CardHeader } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DateString from "../../core/components/DateString";
import { BorrowedBook } from "../../core/interfaces/Library";
import Scaffold from "../../core/templates/Scaffold";
import { getMyBorrowedBooks } from "./Action";

const BorrowList = function (props: { borrows: BorrowedBook[] }) {
    const { borrows } = props;

    return (
        <>
            {borrows.map((borrow) => (
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        {borrow.book_id.name}
                    </Grid>
                    <Grid item xs={2}>
                        <DateString date={borrow.pick_up_date} />
                    </Grid>
                    <Grid item xs={3}>
                        <DateString date={borrow.expected_return_date} />
                    </Grid>
                    <Grid item xs={2}>
                        {borrow.return_date === null ? (
                            "ainda não entregue"
                        ) : (
                            <DateString date={borrow.return_date} />
                        )}
                    </Grid>
                    <Grid item xs={1} textAlign="center">
                        {borrow.is_approve ? "sim" : "não"}
                    </Grid>
                    <Grid item xs={1} textAlign="center">
                        {borrow.finished ? "sim" : "não"}
                    </Grid>
                </Grid>
            ))}
        </>
    );
};

const MyBorrows = function (): ReactElement {
    const [borrows, setBorrows] = useState<BorrowedBook[]>();

    useEffect(() => {
        const get = async () => {
            const getBorrows = await getMyBorrowedBooks();
            if (!getBorrows.success) {
                toast.error(getBorrows.message as string);
                setBorrows([]);
                return;
            }
            setBorrows(getBorrows.message as BorrowedBook[]);
        };

        get();
    }, []);

    return (
        <Scaffold>
            <Card>
                <CardHeader title="meus emprestimos" />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <b>livro</b>
                        </Grid>
                        <Grid item xs={2}>
                            <b>retirada</b>
                        </Grid>
                        <Grid item xs={3}>
                            <b>expectativa de entrega</b>
                        </Grid>
                        <Grid item xs={2}>
                            <b>entregue em</b>
                        </Grid>
                        <Grid item xs={1}>
                            <b>aprovado</b>
                        </Grid>
                        <Grid item xs={1}>
                            <b>finalizado</b>
                        </Grid>
                    </Grid>
                    {borrows === undefined ? (
                        <div>carregando...</div>
                    ) : (
                        <BorrowList borrows={borrows} />
                    )}
                </CardContent>
            </Card>
        </Scaffold>
    );
};

export default MyBorrows;
