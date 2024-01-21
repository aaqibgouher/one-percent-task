import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { SET_DIALOG } from "../../types";
import AddTodoComponent from "../home/AddTodoComponent";
import EditTodoComponent from "../home/EditTodoComponent";
import { Divider } from "@mui/material";

const DialogComponent = () => {
  const dispatch = useDispatch();
  const dialogState = useSelector((state) => state.helperReducer.dialog);
  const [dialog, setDialog] = useState(null);

  const handleClose = async () => {
    // set local state to empty & redux state
    setDialog(null);
    await dispatch({ type: SET_DIALOG, payload: null });
  };

  useEffect(() => {
    setDialog(dialogState);
  }, [dialogState]);

  return (
    <>
      <Dialog
        open={dialog?.open || false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialog?.title}</DialogTitle>
        <Divider />
        <DialogContent>
          {dialog?.type === "ADD_TODO" && <AddTodoComponent />}
          {dialog?.type === "EDIT_TODO" && <EditTodoComponent />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogComponent;
