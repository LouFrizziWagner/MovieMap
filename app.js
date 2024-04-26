const express = require('express');
require('dotenv').config(); // loads environment variable from .env file at the start
const cors = require('cors'); 
const path = require('path');

const app = express(); 
app.use(cors()); 

const moviesRouter = require('./routes/moviesRouter'); // Import router for movies

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/movies', moviesRouter); 

const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`); 
});

module.exports = app; 
