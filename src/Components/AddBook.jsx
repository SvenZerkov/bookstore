import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";

const AddBook = (props) => {
  /* Modal open state manage */
  const [open, setOpen] = useState(false);
  // form data to be sent to the server
  const [formData, setFormData] = useState({
    author: "",
    isbn: "",
    price: "",
    title: "",
    year: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({ author: "", isbn: "", price: "", title: "", year: "" });
    setOpen(false);
  };

  const handleSave = () => {
    props.addBook(formData);
    handleClose();
  };

  const inputChanged = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validISBN = () => {
    const isbn = formData.isbn;
    if (!isbn || isbn.length != 13) {
      return false;
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Book
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Book</DialogTitle>
        <Divider></Divider>
        <DialogContentText>
          <Typography gutterBottom ml={3} mr={3} mt={2}>
            Please fill the information of the new book
          </Typography>
        </DialogContentText>
        <DialogContent>
          <Divider></Divider>
          <TextField
            name="author"
            value={formData.author}
            label="Author"
            fullWidth
            onChange={inputChanged}
            required
            autoFocus
            autoComplete="off"
          />

          <TextField
            name="title"
            value={formData.title}
            label="Book Title"
            fullWidth
            onChange={inputChanged}
            required
            margin="dense"
            autoComplete="off"
          />

          <TextField
            name="year"
            value={formData.year}
            label="Year of publish"
            type="number"
            fullWidth
            onChange={inputChanged}
            required
            margin="dense"
            autoComplete="off"
          />

          <TextField
            name="price"
            value={formData.price}
            label="Price"
            type="number"
            fullWidth
            onChange={inputChanged}
            required
            margin="dense"
            autoComplete="off"
          />

          <TextField
            name="isbn"
            value={formData.isbn}
            label="Isbn"
            type="number"
            fullWidth
            helperText="13 digits without dash"
            onChange={inputChanged}
            required
            margin="dense"
            autoComplete="off"
          />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddBook;
