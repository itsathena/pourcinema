import { useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import { TextField, Button, Box, Typography } from "@mui/material";

const Home = () => {
  const [video, setVideo] = useState<string>("");
  const [videoURL, setVideoURL] = useState<string>("");
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [channelTitle, setChannelTitle] = useState<string>("");

  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  // Fetch the required URL and store it in the videoURL state variable
  function handleSearch() {
    movieTrailer(video)
      .then((res: string) => {
        if (res) {
          setVideoURL(res);
          fetchVideoTitle(res); // Fetch the video title once the trailer URL is available
        } else {
          alert("Trailer not found");
        }
      })
      .catch((error: Error) => {
        console.error("Error fetching trailer:", error);
        alert("Something went wrong!");
      });
  }

  // Extract video ID from the YouTube URL and fetch the title using YouTube API
  function fetchVideoTitle(url: string) {
    const videoId = url.split("v=")[1]?.split("&")[0]; // Safely extract video ID
    if (!videoId) {
      console.error("Failed to extract video ID");
      return;
    }

    // Construct the YouTube API URL
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`;

    // Debug: log the API URL
    console.log("YouTube API URL:", youtubeUrl);

    // Fetch video details from YouTube API
    fetch(youtubeUrl)
      .then((response) => {
        console.log("YouTube API Response:", response); // Log the response object

        return response.json();
      })
      .then((data) => {
        console.log("YouTube API Response Data:", data); // Log the actual response data

        // Check if the API returned any items
        if (data.items && data.items.length > 0) {
          const title = data.items[0]?.snippet?.title || "No title found";
          setVideoTitle(title);
          const channelTitle = data.items[0]?.snippet?.channelTitle;
          setChannelTitle(channelTitle);
        } else {
          console.error("No video details found in YouTube response");
          setVideoTitle("Error fetching title");
        }
      })
      .catch((err) => {
        console.error("Error fetching video title:", err);
        setVideoTitle("Error fetching title");
      });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // Ensure it takes full viewport height
        padding: "20px",
        backgroundColor: "gray", // Black background
        color: "#f8c8d8", // Light pink text
        height: "100vh", // Full viewport height
        textAlign: "center", // Center text within Box
      }}
    >
      {/* Search Box with MUI components */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "20px",
            color: "#f8c8d8", // Light pink text
            fontFamily: '"Arial", sans-serif',
          }}
        >
          Find Your Movie Trailer
        </Typography>
        <TextField
          label="Movie or Show"
          variant="outlined"
          onChange={(e) => setVideo(e.target.value)}
          sx={{
            marginBottom: "20px",
            width: "80%",
            maxWidth: "400px",
            backgroundColor: "#fff", // White background for input field
            borderRadius: "8px",
            input: {
              color: "#000", // Black text inside input
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#f8c8d8", // Light pink border color
              },
              "&:hover fieldset": {
                borderColor: "#f8c8d8", // Light pink on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#f8c8d8", // Light pink on focus
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSearch}
          sx={{
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#f8c8d8", // Light pink button color
            "&:hover": {
              backgroundColor: "#f5a8bb", // Darker pink on hover
              transform: "scale(1.05)",
            },
          }}
        >
          Search
        </Button>
      </Box>

      {/* Display video title and channel */}
      <Box sx={{ marginBottom: "20px" }}>
        {videoTitle && (
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "5px" }}
          >
            {videoTitle}
          </Typography>
        )}
        {channelTitle && (
          <Typography variant="subtitle1" sx={{ color: "#f8c8d8" }}>
            {channelTitle}
          </Typography>
        )}
      </Box>

      {/* Display trailer video */}
      {videoURL && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactPlayer
            url={videoURL}
            controls={true}
            width="50%"
            height="50vh"
            style={{
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Home;
