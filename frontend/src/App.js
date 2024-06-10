import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Box,
  Autocomplete,
  ListItemText,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "./theme/palette"; // adjust the path as needed
import fetchBooks from "./api/books";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const theme = createTheme({
  palette,
  typography: {
    fontFamily: "Mulish, Arial, sans-serif",
  },
});

function App() {
  const [allBooks, setAllBooks] = React.useState([]);
  const [selectedBooks, setSelectedBooks] = React.useState([]);

  // search bar functions

  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    const filteredData = allBooks.filter((option) =>
      option.title.toLowerCase().includes(newInputValue.toLowerCase())
    );
    const selectedBooksNames = selectedBooks.map(
      (book) => book.title + book.author + book.coverPhotoURL
    );

    // remove the selected ones
    const nonSelected = filteredData.filter(
      (item) =>
        !selectedBooksNames.includes(
          item.title + item.author + item.coverPhotoURL
        )
    );
    setOptions(nonSelected);
  };

  // fetching data
  React.useEffect(() => {
    fetchBooks()
      .then((data) => {
        setAllBooks(data);
        setOptions(data);
      })
      .catch((err) => popSnackBar("Failed to fetch data!", "error"));
  }, []);

  // snackbar functions
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState(false);
  const [snackBarSeverity, setSnackBarSeverity] = React.useState("success");

  const popSnackBar = (message, severity) => {
    setSnackBarMessage(message);
    setOpenSnackbar(true);
    setSnackBarSeverity(severity);
  };

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #5ACCCC, #FAD833)",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: "7vh" }}
          pt={7}
          pb={3}
        >
          <Autocomplete
            inputValue={inputValue}
            onInputChange={handleInputChange}
            options={options}
            getOptionLabel={(option) =>
              `${option.title};${option.coverPhotoURL}`
            }
            sx={{ width: "30%" }}
            renderInput={(params) => (
              <TextField {...params} label="Search Books" variant="outlined" />
            )}
            renderOption={(props, option) => (
              <ListItemText
                {...props}
                primary={option.title}
                secondary={
                  <React.Fragment>
                    <Avatar alt={option.title} src={option.coverPhotoURL} />
                    {option.author}
                  </React.Fragment>
                }
                onClick={(e) => {
                  setSelectedBooks([...selectedBooks, option]);
                  handleInputChange(e, inputValue);
                  popSnackBar("Book added to list", "success");
                }}
              />
            )}
          />
        </Box>

        {selectedBooks.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ height: "50vh" }}
            pt={5}
            pb={3}
            pl={3}
          >
            <i>No books selected</i>
          </Box>
        ) : (
          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1, padding: "20px" }}>
              <Grid container spacing={2}>
                {/* Cards */}
                {selectedBooks.map((book, index) => (
                  <Grid item xs={4} key={index}>
                    <Card>
                      <CardContent>
                        <CardMedia
                          component="img"
                          height="200"
                          image={book.coverPhotoURL}
                          alt="Profile"
                        />
                        <Typography
                          gutterBottom
                          variant="small"
                          component="small"
                        >
                          {book.title}
                        </Typography>
                        <DeleteIcon
                          color="warning"
                          style={{ float: "right" }}
                          onClick={() => {
                            let newSelection = [...selectedBooks];
                            newSelection.splice(index, 1);
                            setSelectedBooks(newSelection);
                            popSnackBar("Book removed from list", "info")
                          }}
                        ></DeleteIcon>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        )}
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={snackBarSeverity === "error" ? 4000 : 2000}
        onClose={closeSnackBar}
      >
        <Alert onClose={closeSnackBar} severity={snackBarSeverity}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
