import { Box, Button, Typography, Divider, Grid } from "@mui/material";
import { styled } from "@mui/system";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from "./images/image1.png";
import NowPlayingCarousel from "./nowPlaying";

// Styled components for Old Hollywood aesthetic
const StyledButton = styled(Button)({
  backgroundColor: "#d4af37",
  color: "#000",
  borderRadius: "30px",
  padding: "10px 20px",
  fontSize: "16px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#c89e30",
  },
});

const StyledTypography = styled(Typography)({
  fontFamily: "'Cinzel', serif",
  fontWeight: 700,
  color: "#fff",
  textShadow: "2px 2px 5px rgba(0,0,0,0.8)",
  "@media (max-width:600px)": {
    fontSize: "1.5rem", // Adjust font size for smaller screens
  },
});

const App = () => {
  return (
    <Box sx={{ width: "100%", overflowX: "hidden", backgroundColor: "#000" }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: "60vh", md: "90vh" }, // Adjust height for mobile
          backgroundImage: `url(${image1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingX: 2, // Add padding for small screens
        }}
      >
        <StyledTypography variant="h3" sx={{ mb: 3 }}>
          For The Love of Cinema
        </StyledTypography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Cinzel', serif",
            mb: 4,
            fontSize: { xs: "1rem", md: "1.5rem" },
          }}
        >
          Watch, Discover, and Fall in Love with Movies Again
        </Typography>
        <StyledButton sx={{ width: { xs: "90%", sm: "auto" } }}>
          Start Watching
        </StyledButton>
      </Box>

      {/* Now Playing Carousel Section */}
      <NowPlayingCarousel />

      {/* About Section */}
      <Box
        sx={{
          padding: { xs: "30px 10px", md: "50px 20px" },
          backgroundColor: "#1a1a1a",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontFamily: "'Cinzel', serif",
            color: "#d4af37",
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          Why Movie Trailer Park?
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: "800px",
            margin: "0 auto",
            fontFamily: "'Lora', serif",
            mb: 5,
            fontSize: { xs: "0.9rem", md: "1.2rem" },
          }}
        >
          Immerse yourself in the magic of Cinema. From iconic classics to the
          latest blockbusters, PourCinema is your destination to explore
          trailers, plan movie marathons, and connect with cinematic history.
        </Typography>
        <Divider sx={{ borderColor: "#d4af37", marginY: 3 }} />
      </Box>

      {/* Features Section */}
      <Grid
        container
        spacing={4}
        sx={{
          padding: { xs: "20px 10px", md: "50px 20px" },
          backgroundColor: "#0d0d0d",
          color: "#fff",
        }}
      >
        {[
          {
            title: "Explore Trailers",
            description:
              "Discover trailers for the latest blockbusters and timeless classics.",
          },
          {
            title: "Plan Marathons",
            description:
              "Create custom movie marathons tailored to your preferences.",
          },
          {
            title: "Build Your List",
            description:
              "Save your favorite trailers and curate your own watchlist.",
          },
        ].map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
                height: "300px",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                mt: 2,
                fontFamily: "'Cinzel', serif",
                color: "#d4af37",
                fontSize: { xs: "1rem", md: "1.5rem" },
              }}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 1,
                fontFamily: "'Lora', serif",
                fontSize: { xs: "0.8rem", md: "1rem" },
              }}
            >
              {feature.description}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          textAlign: "center",
          padding: { xs: "10px 0", md: "20px 0" },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Cinzel', serif",
            fontSize: { xs: "0.8rem", md: "1rem" },
          }}
        >
          &copy; 2024 PourCinema | All Rights Reserved | Athenz
        </Typography>
      </Box>
    </Box>
  );
};

export default App;
