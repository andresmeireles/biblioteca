import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import { nanoid } from "nanoid";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import DateString from "../../core/components/DateString";
import { BorrowedBook } from "../../core/interfaces/Library";
import Scaffold from "../../core/templates/Scaffold";
import { getNonFinishedBorrows, setBorrowPermission } from "./Action";

const BorrowItem = function (props: { borrow: BorrowedBook }) {
    const { borrow } = props;

    const permission = async (type: boolean) => {
        const setPermission = await setBorrowPermission(borrow.id, type);
        if (!setPermission.success) {
            toast.error(setPermission.message);
            return;
        }
        toast.success("operação feita com sucesso!");
        location.reload();
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                {borrow.book_id.name}
            </Grid>
            <Grid item xs={2}>
                {borrow.user_id.name}
            </Grid>
            <Grid item xs={2}>
                <DateString date={borrow.pick_up_date} />
            </Grid>
            <Grid item xs={2}>
                <DateString date={borrow.expected_return_date} />
            </Grid>
            <Grid item xs={2}>
                <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={() => permission(true)}
                >
                    aceitar
                </Button>
            </Grid>
            <Grid item xs={2}>
                <Button
                    fullWidth
                    color="error"
                    variant="contained"
                    onClick={() => permission(false)}
                >
                    recusar
                </Button>
            </Grid>
        </Grid>
    );
};

const BorrowList = function (props: { borrows: BorrowedBook[] }) {
    const { borrows } = props;

    return (
        <Card>
            <CardHeader title="aprovar emprestimos" />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        livro
                    </Grid>
                    <Grid item xs={2}>
                        usuario
                    </Grid>
                    <Grid item xs={2}>
                        retirada
                    </Grid>
                    <Grid item xs={2}>
                        devolução
                    </Grid>
                    <Grid item xs={4}>
                        ações
                    </Grid>
                </Grid>
                {borrows.map((borrow) => (
                    <BorrowItem borrow={borrow} key={nanoid()} />
                ))}
            </CardContent>
        </Card>
    );
};

const ToApproveBorrows = function (): ReactElement {
    const navigate = useNavigate();
    const [borrows, setBorrows] = useState<BorrowedBook[]>();

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
            setBorrows(bList.filter((b) => b.is_approved === null));
        };

        get();
    }, []);

    return (
        <Scaffold>
            {borrows === undefined ? (
                <div>carregando...</div>
            ) : (
                <BorrowList borrows={borrows} />
            )}
        </Scaffold>
    );
};

export default ToApproveBorrows;
