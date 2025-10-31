import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useRef } from "react";
import { useBudget } from "../context/BudgetContext";

export default function AddSpendDialog({ open, handleClose }) {
  const itemRef = useRef();
  const priceRef = useRef();
  const { addExtraSpend } = useBudget();

  function handleSubmit(e) {
    e.preventDefault();
    addExtraSpend({
      item: itemRef.current.value,
      price: priceRef.current.value,
    });
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>Add New Spend</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Item / Description"
            type="text"
            fullWidth
            variant="standard"
            inputRef={itemRef}
            required
          />
          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            inputRef={priceRef}
            required
            inputProps={{ step: "0.01" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
