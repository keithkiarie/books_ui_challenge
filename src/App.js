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

const theme = createTheme({
  palette,
  typography: {
    fontFamily: "Mulish, Arial, sans-serif",
  },
});

function App() {
  // State for menu anchor
  const [allBooks, setAllBooks] = React.useState([]);
  const [selectedBooks, setSelectedBooks] = React.useState([]);

  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    fetchBooks()
      .then((data) => {
        setAllBooks(data);
        setOptions(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    const filteredData = allBooks.filter((option) =>
      option.title.toLowerCase().includes(newInputValue.toLowerCase())
    );
    const selectedBooksNames = selectedBooks.map((book) => book.title + book.author + book.coverPhotoURL);

    // remove the selected ones
    const nonSelected = filteredData.filter(
      (item) =>
        !selectedBooksNames.includes(item.title + item.author + item.coverPhotoURL)
    );
    setOptions(nonSelected);
  };

  return (
    <ThemeProvider theme={theme}>
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
          getOptionLabel={(option) => `${option.title};${option.coverPhotoURL}`}
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
              }}
            />
          )}
        />
      </Box>

      <div style={{ display: "flex" }}>
        {/* Main Content */}
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
                    <Typography gutterBottom variant="small" component="small">
                      {book.title}
                    </Typography>
                    <DeleteIcon
                      color="warning"
                      style={{ float: "right" }}
                      onClick={() => {
                        let newSelection = [...selectedBooks];
                        newSelection.splice(index, 1);
                        setSelectedBooks(newSelection);
                      }}
                    ></DeleteIcon>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
