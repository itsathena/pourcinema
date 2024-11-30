import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface MovieCardProps {
  posterPath: string;
  title: string;
  overview: string;
  releaseDate: string;
  imageBaseUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  posterPath,
  title,
  overview,
  releaseDate,
  imageBaseUrl,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#1d1d1d",
        color: "#fff",
        marginBottom: 3,
      }}
    >
      <CardMedia
        component="img"
        image={`${imageBaseUrl}${posterPath}`}
        alt={title}
        sx={{
          width: 150,
          height: 225,
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ padding: 2, flex: 1 }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: "right",
            fontWeight: "bold",
            marginBottom: 1,
            color: "#FFD700", // Gold color for title
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 2,
            textAlign: "right",
            paddingLeft: "202px",
            color: "#ccc", // Light gray for description
          }}
        >
          {overview}
        </Typography>
        <Typography
          variant="subtitle2"
          color="#fff"
          sx={{
            fontStyle: "italic",
            textAlign: "right",
          }}
        >
          <strong>Release Date:</strong> {releaseDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
