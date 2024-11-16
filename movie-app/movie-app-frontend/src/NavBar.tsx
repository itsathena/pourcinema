// Navbar.tsx
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black
        boxShadow: "none",
        padding: "0 20px",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Title as Link */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            color: "#fff",
            textDecoration: "none",
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
          }}
        >
          Movie Trailer Park
        </Typography>

        {/* Navigation Buttons */}
        <Box>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "#d4af37", // Muted gold for buttons
                fontWeight: "bold",
                marginX: 1,
                "&:hover": {
                  color: "#f0e68c", // Lighter gold on hover
                },
              }}
            >
              Home
            </Button>
          </Link>
          <Link to="/random" style={{ textDecoration: "none" }}>
            <Button
              sx={{
                color: "#d4af37",
                fontWeight: "bold",
                marginX: 1,
                "&:hover": {
                  color: "#f0e68c",
                },
              }}
            >
              Randomiser
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
