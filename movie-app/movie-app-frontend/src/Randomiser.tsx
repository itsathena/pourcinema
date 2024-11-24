import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Autocomplete,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Container,
  Grid,
} from "@mui/material";

const Randomiser: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]); // Store the 3 movies
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const TMDB_API_KEY = "2088975030e9d8f52f6cb2168f3657db";
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  // Hardcoded genre list with genre names and corresponding genre IDs
  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const [selectedGenres, setSelectedGenres] = useState<any[]>([]); // Store the selected genres

  const fetchRandomMoviesByGenres = async () => {
    setLoading(true);
    setError("");
    setMovies([]); // Reset previous movies

    try {
      // Fetch movies for each selected genre simultaneously
      const movieRequests = selectedGenres.map((genre: any) =>
        axios.get(
          `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&with_genres=${genre.id}&page=1`
        )
      );

      const responses = await Promise.all(movieRequests);
      const fetchedMovies = responses.map((response) => {
        const movies = response.data.results;
        if (movies.length > 0) {
          return movies[Math.floor(Math.random() * movies.length)];
        }
        return null;
      });

      setMovies(fetchedMovies.filter((movie) => movie !== null)); // Remove null values if no movies were found
    } catch (err) {
      setError("Failed to fetch movies.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "80px", // Padding to avoid overlap with fixed navbar
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          fontFamily: "'Roboto', sans-serif",
          color: "#333",
        }}
      >
        Random Movie Generator by Genre
      </Typography>

      <Autocomplete
        multiple
        options={genres}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => setSelectedGenres(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Select Genres" />
        )}
        value={selectedGenres}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        sx={{
          width: 300,
          marginBottom: 3,
          backgroundColor: "#fff",
          borderRadius: 1,
          boxShadow: 2,
        }}
        disableCloseOnSelect
      />

      <Button
        variant="contained"
        color="primary"
        onClick={fetchRandomMoviesByGenres}
        disabled={selectedGenres.length !== 3}
        sx={{
          marginTop: 3,
          padding: "10px 20px",
          fontSize: "1rem",
          textTransform: "none",
          borderRadius: 4,
          backgroundColor: "#007aff",
          "&:hover": { backgroundColor: "#005bb5" },
        }}
      >
        Generate 3 Movies
      </Button>

      {loading ? (
        <CircularProgress sx={{ marginTop: 3 }} />
      ) : error ? (
        <Typography color="error" sx={{ marginTop: 3 }}>
          {error}
        </Typography>
      ) : (
        <Container sx={{ marginTop: 3 }}>
          <Grid container spacing={3}>
            {movies.map((movie, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    sx={{
                      objectFit: "cover",
                      height: 400,
                    }}
                  />
                  <CardContent sx={{ padding: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: 1,
                        textAlign: "center",
                        color: "#333",
                      }}
                    >
                      {movie.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        marginBottom: 2,
                        color: "#666",
                        textAlign: "center",
                      }}
                    >
                      {movie.overview}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      sx={{
                        textAlign: "center",
                        fontStyle: "italic",
                      }}
                    >
                      <strong>Release Date:</strong> {movie.release_date}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default Randomiser;
