// Navbar.tsx
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Title as Link */}
          <Typography
            variant="h6"
            component={Link} // Makes it clickable and acts as a Link
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Movie Trailer Park
          </Typography>

          {/* Navigation Buttons */}
          <Box>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <Button color="inherit">Home</Button>
            </Link>
            <Link to="/random" style={{ textDecoration: "none" }}>
              <Button color="inherit">Randomiser</Button>
            </Link>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
