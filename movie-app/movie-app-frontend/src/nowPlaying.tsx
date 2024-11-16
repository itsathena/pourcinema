import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const NowPlayingCarousel: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const fetchNowPlayingMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL as string);

      setMovies(response.data.results);
    } catch (err: any) {
      setError("Failed to fetch movies.");
      console.error(
        "Error fetching movies:",
        err.response ? err.response.data : err
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "50px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          width: "80%",
          maxWidth: "1200px",
          backgroundColor: "#222",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            marginBottom: "30px",
            fontFamily: "'Cinzel', serif",
            color: "#d4af37",
            fontSize: "2.5rem",
          }}
        >
          Now Playing
        </Typography>

        {loading && (
          <Typography align="center" sx={{ color: "#fff" }}>
            Loading...
          </Typography>
        )}
        {error && (
          <Typography align="center" sx={{ color: "red" }}>
            {error}
          </Typography>
        )}

        {movies.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ color: "#fff" }}>
            No movies available at the moment.
          </Typography>
        ) : (
          <Carousel
            className="custom-carousel"
            showThumbs={false}
            infiniteLoop
            useKeyboardArrows
            autoPlay
            emulateTouch
            dynamicHeight
            swipeable
            interval={5000}
            transitionTime={800}
            showStatus={false}
            showIndicators={false}
          >
            {movies.map((movie: any) => (
              <div key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                  alt={movie.title}
                  style={{
                    borderRadius: "10px",
                    height: "500px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    padding: "20px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderRadius: "10px",
                    position: "absolute",
                    bottom: "10%",
                    left: "10%",
                    width: "80%",
                    color: "#fff",
                    textAlign: "center",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.8rem",
                    }}
                  >
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" sx={{ marginTop: "10px" }}>
                    {movie.overview}
                  </Typography>
                </Box>
              </div>
            ))}
          </Carousel>
        )}
      </Box>
    </Box>
  );
};

export default NowPlayingCarousel;
