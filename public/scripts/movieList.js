import { openMovieInfoModal, closeMovieInfoModal } from './movieModal.js';

document.addEventListener('DOMContentLoaded', async () => {
    const movieList = document.getElementById('movieList');

    if (!movieList) {
        console.error('Movie list element not found');
        return;
    }

    try {
        const response = await fetch('/api/movies/now-playing');
        if (!response.ok) {
            throw new Error('Failed to fetch movie data');
        }
        const movies = await response.json();

        movieList.innerHTML = movies.map(movie => `
            <li class="movie-list-item" title="movie preview">
                <figure class="movie-teaser-image-wrapper" style="background-image:linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('https://image.tmdb.org/t/p/w500${movie.poster_path}');">
                    <img class="movie-teaser-image" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                </figure>
                <h3 class="movie-title">${movie.title}</h3>
            </li>
        `).join('');

        movieList.addEventListener('click', event => {
            const movieListItem = event.target.closest('.movie-list-item');
            if (movieListItem) {
                const movie = movies.find(m => m.title === movieListItem.querySelector('.movie-title').textContent);
                if (movie) {
                    openMovieInfoModal(movie);
                }
            }
        });
    } catch (error) {
        console.error('Error:', error.message);
        movieList.innerHTML = `<p class="error-message">Error loading movies: ${error.message}</p>`;
    }
});

