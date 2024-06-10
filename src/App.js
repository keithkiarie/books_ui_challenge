import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function App() {
  // State for menu anchor
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Handle opening menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ height: "7vh" }}
        pt={7}
        pb={3}
      >
        <TextField
          select
          label="Book"
          // value={book}
          // onChange={handleChange}
          helperText="Please select your book"
          variant="outlined"
          sx={{ width: "30%" }} // Set width to 30%
        >
          <MenuItem value="Book 1">
            <img src="/path/to/book1.jpg" alt="Book 1" width="30" height="30" />
            Book 1
          </MenuItem>
          <MenuItem value="Book 2">
            <img src="/path/to/book2.jpg" alt="Book 2" width="30" height="30" />
            Book 2
          </MenuItem>
          <MenuItem value="Book 3">
            <img src="/path/to/book3.jpg" alt="Book 3" width="30" height="30" />
            Book 3
          </MenuItem>
          {/* Add more MenuItem components for additional options */}
        </TextField>
      </Box>

      <div style={{ display: "flex" }}>
        {/* Main Content */}
        <div style={{ flexGrow: 1, padding: "20px" }}>
          <Grid container spacing={2}>
            {/* Cards */}
            {[...Array(6)].map((_, index) => (
              <Grid item xs={4} key={index}>
                <Card>
                  <CardContent>
                    <CardMedia
                      component="img"
                      height="100"
                      image="/placeholder-image.jpg"
                      alt="Profile"
                    />
                    <Typography gutterBottom variant="h6" component="h3">
                      Book {index + 1}
                    </Typography>
                    <IconButton aria-label="settings" onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Book 1</MenuItem>
                      <MenuItem onClick={handleClose}>Book 2</MenuItem>
                      <MenuItem onClick={handleClose}>Book 3</MenuItem>
                    </Menu>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}

export default App;
