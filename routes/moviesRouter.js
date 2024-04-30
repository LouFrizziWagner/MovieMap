const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_KEY = process.env.MOVIEDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';


// Bookmarking movies

//let bookmarks = []; 


// API Endpoint to fetch now playing movies
router.get('/now-playing', async (req, res) => {
    try {
        const movies =  await fetchNowPlayingMovies();
        res.json(movies);
    } catch (error) {
        console.error('Error at endpoint /now-playing:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Function to fetch currently playing movies
async function fetchNowPlayingMovies() {
    console.log("Attempting to fetch movies");
    try {
        const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                page: 1
            }
        });
        console.log("Movies fetched successfully:", response.data);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching now playing movies:', error.message, error.response ? error.response.data : 'No additional error info');
        throw new Error('Failed to fetch now playing movies');
    }
}


// Function to fetch reviews for a specific movie
async function fetchMovieReviews(movieId) {
    console.log("Attempting to fetch movie reviews for movie ID:", movieId);
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
            params: {
                api_key: API_KEY,
                language: 'en-US'
            }
        });
        console.log("Movie reviews fetched successfully:", response.data);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movie reviews:', error.message, error.response ? error.response.data : 'No additional error info');
        throw new Error('Failed to fetch movie reviews');
    }
}

// Endpoint to fetch reviews for a specific movie
router.get('/reviews/:movieId', async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const reviews = await fetchMovieReviews(movieId);
        res.json(reviews);
    } catch (error) {
        console.error(`Error at endpoint /reviews/${movieId}:`, error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
