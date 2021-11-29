import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { ptBR } from "date-fns/locale";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { returnBorrowBook } from "../Action";

const ReturnBookDialog = function (props: {
    handleClose: () => void;
    open: boolean;
    borrowId: number;
}) {
    const { handleClose, open, borrowId } = props;
    const [isLost, setIsLost] = useState(false);
    const [returnDate, setReturnDate] = useState<Date | null>(new Date());

    const returnBorrow = async () => {
        if (returnDate === null) {
            toast.error("data de retorno incorreta");
            return;
        }
        const executeReturn = await returnBorrowBook({
            returnDate,
            isLost,
            borrowId,
        });
        if (!executeReturn.success) {
            toast.error(executeReturn.message);
            return;
        }
        toast.success(executeReturn.message);
        location.reload();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle title="devolver livro emprestado" />
            <DialogContent>
                <Box>
                    <Grid container>
                        <LocalizationProvider
                            locale={ptBR}
                            dateAdapter={AdapterDateFns}
                        >
                            <DialogActions>
                                <DatePicker
                                    label="selecione uma data"
                                    inputFormat="dd/MM/yyyy"
                                    value={returnDate}
                                    onChange={(dateValue) =>
                                        setReturnDate(dateValue)
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </DialogActions>
                        </LocalizationProvider>
                    </Grid>
                    <Grid
                        container
                        alignContent="center"
                        textAlign="center"
                        alignItems="center"
                        alignSelf="center"
                    >
                        <Grid
                            item
                            alignItems="center"
                            alignContent="center"
                            textAlign="center"
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isLost}
                                        onClick={() => setIsLost(!isLost)}
                                    />
                                }
                                label="livro foi perdido"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>
                    fechar
                </Button>
                <Button color="primary" onClick={returnBorrow}>
                    devolver
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReturnBookDialog;
