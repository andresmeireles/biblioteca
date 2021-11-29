import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import DateString from "../../core/components/DateString";
import { BorrowedBook } from "../../core/interfaces/Library";
import Scaffold from "../../core/templates/Scaffold";
import { getNonFinishedBorrows } from "./Action";
import ReturnBookDialog from "./components/ReturnBorrowDialog";

const ReturnBorrowItem = function (props: { borrow: BorrowedBook }) {
    const { borrow } = props;
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    return (
        <Grid container spacing={2}>
            <ReturnBookDialog
                open={open}
                handleClose={toggle}
                borrowId={borrow.id}
            />
            <Grid item xs={4}>
                {borrow.book_id.name}
            </Grid>
            <Grid item xs={3}>
                {borrow.user_id.name}
            </Grid>
            <Grid item xs={3}>
                <DateString date={borrow.expected_return_date} />
            </Grid>
            <Grid item xs={2}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={toggle}
                >
                    devolver
                </Button>
            </Grid>
        </Grid>
    );
};

const ReturnList = function (props: { borrows: BorrowedBook[] }) {
    const { borrows } = props;
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <b>livro</b>
                </Grid>
                <Grid item xs={3}>
                    <b>usuario</b>
                </Grid>
                <Grid item xs={3}>
                    <b>expectativa de retorno</b>
                </Grid>
                <Grid item xs={2}>
                    <b>ações</b>
                </Grid>
            </Grid>
            {borrows.map((borrow) => (
                <ReturnBorrowItem borrow={borrow} />
            ))}
        </Box>
    );
};

const ReturnBorrow = function (): ReactElement {
    const [borrows, setBorrows] = useState<BorrowedBook[]>();
    const navigate = useNavigate();

    useEffect(() => {
        const get = async () => {
            const borrowList = await getNonFinishedBorrows();
            if (!borrowList.success) {
                const response = borrowList.message;
                if (response instanceof Object) {
                    navigate(-1);
                    toast.error("usuario não tem permissão");
                    return;
                }
                toast.error(response);
                setBorrows([]);
                return;
            }
            const bList = borrowList.message as BorrowedBook[];
            setBorrows(bList.filter((b) => b.is_approved === 1));
        };

        get();
    }, []);

    return (
        <Scaffold>
            <Card>
                <CardHeader title="emprestimos pendentes" />
                <CardContent>
                    {borrows === undefined ? (
                        <div>carregando...</div>
                    ) : (
                        <ReturnList borrows={borrows} />
                    )}
                </CardContent>
            </Card>
        </Scaffold>
    );
};

export default ReturnBorrow;
