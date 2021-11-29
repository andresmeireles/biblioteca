import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
} from "@mui/material";
import React, { ReactElement, useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ptBR } from "date-fns/locale";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { executeBorrow } from "../Action";

const ConfirmBorrowDialog = function (props: {
    bookId: number;
    open: boolean;
    handleClose: () => void;
}): ReactElement {
    const navigate = useNavigate();
    const { open, handleClose, bookId } = props;
    const todayPlusOne = new Date();
    todayPlusOne.setDate(todayPlusOne.getDate() + 1);
    const [date, setDate] = useState<Date | null>(todayPlusOne);

    const setBorrow = async () => {
        if (date === null) {
            toast.error("data inválida");
            return;
        }
        const borrow = await executeBorrow(bookId, date);
        if (borrow.success) {
            toast.success(
                "emprestimo efeituado com sucesso, aguarde a aprovação."
            );
            handleClose();
            navigate("/");
            return;
        }
        toast.error(borrow.message);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent title="data de devolução">
                <LocalizationProvider
                    locale={ptBR}
                    dateAdapter={AdapterDateFns}
                >
                    <DialogActions>
                        <DatePicker
                            label="selecione uma data"
                            inputFormat="dd/M/yyyy"
                            value={date}
                            onChange={(dateValue) => setDate(dateValue)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </DialogActions>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>fechar</Button>
                <Button onClick={setBorrow}>confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmBorrowDialog;
