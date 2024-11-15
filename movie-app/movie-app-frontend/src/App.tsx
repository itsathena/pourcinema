import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import image1 from "./images/image1.png";

const App = () => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "aqua",
        height: "100vh",
        width: "100%", // Ensures full width
      }}
    >
      {/* Hero Section */}
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          height: "100%",
          backgroundImage: `url(${image1})`,
          backgroundSize: "cover", // Image covers the entire section
          backgroundPosition: "center", // Centers the image
          color: "#fff", // White text for contrast
          textAlign: "center", // Center-align text
          padding: "0 20px",
        }}
      >
        <Grid>
          <Typography
            variant="h2"
            sx={{ fontWeight: 700, marginBottom: "20px" }}
          >
            Discover Your Next Favorite Movie
          </Typography>
          <Typography
            variant="h5"
            sx={{ marginBottom: "30px", fontWeight: 400 }}
          >
            Explore the latest movie trailers, find your next film, and get
            inspired!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: "30px",
              padding: "12px 30px",
              fontSize: "18px",
            }}
          >
            Start Watching
          </Button>
        </Grid>
      </Grid>

      {/* Optional: Adding some content below the hero section */}
      <Box
        sx={{
          padding: "50px 20px",
          backgroundColor: "#f4f4f4",
        }}
      >
        <Typography variant="h4" align="center" sx={{ marginBottom: "20px" }}>
          Why Movie Trailer Park?
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ maxWidth: "800px", margin: "0 auto" }}
        >
          Movie Trailer Park offers an immersive movie discovery experience.
          Easily browse through trailers, find new films, and watch the latest
          cinematic releases!
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
