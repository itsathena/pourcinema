import React, { useState } from "react";
import { Chip, IconButton } from "@mui/material";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Autocomplete,
  TextField,
  // Card,
  // CardMedia,
  // CardContent,
  Container,
  // Grid,
} from "@mui/material";
import MovieCard from "./shared/components/movieCard.tsx";

const Randomiser: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  // Hardcoded genre list 
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

  const [selectedGenres, setSelectedGenres] = useState<any[]>([]); 

  const fetchRandomMoviesByGenres = async () => {
    setLoading(true);
    setError("");
    setMovies([]);

    try {
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

      setMovies(fetchedMovies.filter((movie) => movie !== null));
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
        backgroundColor: "#1d1d1d",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "80px", 
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          fontFamily: "'Roboto', sans-serif",
          color: "#FFD700",
        }}
      >
        Movie Marathon
      </Typography>

      <Autocomplete
        multiple
        options={genres}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          
          setSelectedGenres(newValue);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              {...getTagProps({ index })}
              label={option.name}
              sx={{
                backgroundColor: "#FFD700",
                color: "#1d1d1d", 
                margin: "2px",
              }}
              onDelete={() => {
                setSelectedGenres(value.filter((genre, i) => i !== index));
              }}
            />
          ))
        }
        renderInput={(params) => (
          <Box
            sx={{ position: "relative", display: "flex", alignItems: "center" }}
          >
            <TextField
              {...params}
              label="Select Genres"
              sx={{
                input: { color: "#fff" }, 
                label: { color: "#FFD700" },
                flex: 1, 
              }}
            />
            {selectedGenres.length > 0 && (
              <IconButton
                onClick={() => setSelectedGenres([])} 
                sx={{
                  position: "absolute",
                  right: 0,
                  color: "#FFD700", 
                }}
              >
              </IconButton>
            )}
          </Box>
        )}
        value={selectedGenres}
        isOptionEqualToValue={(option, value) => false} 
        sx={{
          width: 600,
          marginBottom: 3,
          backgroundColor: "white",
          borderRadius: 1,
          boxShadow: 2,
          "& .MuiAutocomplete-option": {
            backgroundColor: "#1d1d1d",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#FFD700",
              color: "#1d1d1d",
            },
          },
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
          color: "black",
          backgroundColor: "#FFD700", 
          "&:hover": { backgroundColor: "#FFB700" }, 
        }}
      >
        Generate 3 Movies
      </Button>

      {loading ? (
        <CircularProgress sx={{ marginTop: 3, color: "#FFD700" }} />
      ) : error ? (
        <Typography color="error" sx={{ marginTop: 3, color: "#FF6347" }}>
          {error}
        </Typography>
      ) : (
        <Container sx={{ marginTop: 3 }}>
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              posterPath={movie.poster_path}
              title={movie.title}
              overview={movie.overview}
              releaseDate={movie.release_date}
              imageBaseUrl={TMDB_IMAGE_BASE_URL}
            />
          ))}
        </Container>
      )}
    </Box>
  );
};

export default Randomiser;
