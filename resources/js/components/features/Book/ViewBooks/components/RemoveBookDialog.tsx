import { DialogContent } from "@material-ui/core";
import { Button, Dialog, DialogActions } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { removeBook } from "../../../../core/api/Library/Book";

const RemoveBookDialog = function (props: {
    open: boolean;
    bookId: number;
    handleClose: () => void;
}) {
    const navigate = useNavigate();
    const { open, bookId, handleClose } = props;

    const executeRemove = async () => {
        const remove = await removeBook(bookId);
        if (remove.success) {
            toast.success(remove.message);
            handleClose();
            location.reload();
            return;
        }
        toast.error(remove.message);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <DialogActions>
                    tem certeza, essa ação não poderá ser desfeita.
                </DialogActions>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>fechar</Button>
                <Button onClick={executeRemove}>confirmar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RemoveBookDialog;
