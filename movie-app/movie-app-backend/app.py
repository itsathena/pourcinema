# movie-app-backend/app.py
from flask import Flask, jsonify
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests from React frontend

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
TMDB_BASE_URL = "https://api.themoviedb.org/3"

@app.route("/api/now_playing", methods=["GET"])
def now_playing():
    # Fetch "Now Playing" movies from TMDB
    tmdb_url = f"{TMDB_BASE_URL}/movie/now_playing?api_key={TMDB_API_KEY}&language=en-US&page=1"
    try:
        response = requests.get(tmdb_url)
        response.raise_for_status()
        data = response.json()
        return jsonify(data)  # Return data to frontend as JSON
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Failed to fetch movies."}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
