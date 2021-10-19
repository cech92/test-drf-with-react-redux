import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const ModalDelete = (props: any) => {
  return (
    <Dialog
      open={props.showDeleteModal}
      onClose={props.cancelDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete entry"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you really want to delete this usage? Press 'Delete' to confirm.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={props.deleteItem}>Delete</Button>
        <Button color="secondary" onClick={props.cancelDelete} autoFocus>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;