import { useEffect, useState } from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import AddBook from "./AddBook";
import AlertModal from "./AlertModal";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [alert, setAlert] = useState(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);

  /* Initial data load */
  useEffect(() => {
    fetchData();
  }, []);

  /* Fetch data */
  const fetchData = () => {
    fetch(
      "https://bookstore-df71b-default-rtdb.europe-west1.firebasedatabase.app/books/.json"
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Something went wrong when fetching data.");
        }
        return response.json();
      })
      .then((responseData) => {
        /* console.log("Raw response: ", responseData); */
        // convert Firebase object to array with each item having "id" property
        const booksArray = Object.keys(responseData || {}).map((key) => ({
          id: key,
          ...responseData[key],
        }));
        /* console.log("Books array: ", booksArray); */
        setBooks(Object.values(booksArray));
        /* console.log("Books data: " + JSON.stringify(Object.values(booksArray))); */
      })
      .catch((error) => console.error("Error message: ", error));
  };

  /* Add book */
  const addBook = (newBook) => {
    fetch(
      "https://bookstore-df71b-default-rtdb.europe-west1.firebasedatabase.app/books/.json",
      {
        method: "POST",
        body: JSON.stringify(newBook),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add todo: " + response.status);
        }
        fetchData();
        return response.json();
      })

      .catch((error) => console.error("Error message: ", error));
  };

  /*  Delete Book by ID */
  const handleDelete = (id) => {
    fetch(
      `https://bookstore-df71b-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to delete book, message: ",
            response.statusText
          );
        }
        fetchData();
        return response.json();
      })
      .catch((error) => {
        // Display alert
        try {
          setAlert({
            message: "Failed to delete book",
            type: "error",
            title: "Error Delete",
          });
          setAlertModalOpen(true);
        } catch (error) {
          console.error("Error displaying alert:", error);
        }
      });
  };

  /* AlertModal */
  const handleAlertModalClose = () => {
    setAlertModalOpen(false);
  };

  /* Common defs */
  const commonColumndefs = {
    sortable: true,
    filterable: true,
    flex: 1,
  };

  /* Grid defs */
  const gridDefs = [
    {
      field: "isbn",
      headerName: "Isbn",
      ...commonColumndefs,
    },
    {
      field: "author",
      headerName: "Author",
      ...commonColumndefs,
    },
    {
      field: "title",
      headerName: "Title",
      ...commonColumndefs,
    },
    {
      field: "year",
      type: "number",
      headerName: "Year",
      ...commonColumndefs,
    },
    {
      field: "price",
      type: "number",
      headerName: "Price ($)",
      ...commonColumndefs,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="Delete"
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  /* Grid data */
  const rows = books.map((book) => ({
    id: book.id,
    isbn: book.isbn,
    author: book.author,
    title: book.title,
    year: book.year,
    price: book.price,
  }));

  return (
    <>
      <Box sx={{ height: "90vh" }}>
        <Box
          sx={{ height: "10vh", width: "90vw", borderRadius: 5, padding: 2 }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className="headline">
                Booklist of used books no one reads
              </Typography>
              <Box sx={{ padding: 2, backgroundColor: "lightblue" }}>
                <AddBook addBook={addBook} />
              </Box>
            </Toolbar>
          </AppBar>
        </Box>

        <AlertModal
          open={alertModalOpen}
          onClose={handleAlertModalClose}
          message={alert?.message}
          type={alert?.type}
          title={alert?.title}
        />

        <Box sx={{ height: "50vh" }} className="datagrid">
          <DataGrid
            rows={rows}
            columns={gridDefs}
            pageSizeOptions={[5, 10, 25, 50, 100]}
          ></DataGrid>
        </Box>
      </Box>
    </>
  );
};

export default Books;
