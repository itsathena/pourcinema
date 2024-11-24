import os
from flask import Flask, jsonify
from flask_cors import CORS
import requests
from dotenv import load_dotenv

load_dotenv()

# Initialize Flask app and allow CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allows all origins during dev

# Load API key from .env file
api_key = os.getenv('TMDB_API_KEY')


@app.route('/api/now_playing', methods=['GET'])
def now_playing():
    url = f'https://api.themoviedb.org/3/movie/now_playing?api_key={api_key}&language=en-US&page=1'
    try:
        # Send the request to TMDB API
        response = requests.get(url)

        # Check if the response is successful
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch data from TMDB"}), 500

        # Return TMDB response data
        return jsonify(response.json())

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/genres', methods=['GET'])
def genres():
    url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}&language=en-US'
    try:
        # Send the request to TMDB API to fetch genres
        response = requests.get(url)

        # Check if the response is successful
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch genres from TMDB"}), 500

        # Return the genres
        return jsonify(response.json()['genres'])

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Make sure the backend runs on port 5000