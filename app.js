const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const API_KEY = process.env.MOVIEDB_API_KEY;


// Route to fetch playing movies
app.get('/api/movies/now-playing', async (req, res) => {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                page: 1
            }
        });
        const movies = response.data.results;
        res.json(movies);
    } catch (error) {
        console.error('Error fetching now playing movies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// Serve static file 

app.use(express.static('public'));
