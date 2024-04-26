// modal.js

export async function openMovieInfoModal(movie) {
    try {
        const modalWrapperEl = document.getElementById('movieInfoModalWrapper');
        const modalEl = document.getElementById('movieInfoModal');
        modalEl.innerHTML = `
            <button id="closeModalButton" aria-label="Close Modal">
                <svg class="close-modal-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="movie-image-text-wrapper">
                <img class="movie-teaser-image" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <div class="movie-text-container">
                    <h3>${movie.title}</h3>
                    <div class="release-rating-info-wrapper">
                        <p class="movie-release-date"><strong>Released: </strong> ${movie.release_date}</p>
                        <p class="movie-rating"><strong>Rating: </strong> ${movie.vote_average}</p>
                    </div>
                    <div class="movie-overview">
                        <p> ${movie.overview} </p>
                    </div>

                </div>
            </div>
            <div class="movie-reviews-container">
                <h4 class="movie-reviews-heading"> Reviews </h4>
                <ul id="reviewsList"> </ul>
            </div>
        `;

        document.body.style.overflow = 'hidden';
        modalWrapperEl.style.display = "block";
        modalEl.focus();  
        const modalCloseButtonEl = document.getElementById('closeModalButton');
        modalCloseButtonEl.removeEventListener('click', closeMovieInfoModal);
        modalCloseButtonEl.addEventListener('click', closeMovieInfoModal);

        // Fetch reviews when modal opens
        const reviewsList = document.getElementById('reviewsList');
        fetch(`/api/movies/reviews/${movie.id}`)
            .then(response => response.json())
            .then(reviews => {
                reviewsList.innerHTML = reviews.map(review => `
                    <li class="review-item">
                        <span class="review-item-author">${review.author}: </span> ${review.content}
                    </li>
                `).join('');
            })
            .catch(error => {
                reviewsList.innerHTML = '<li>Failed to load reviews.</li>';
                console.error('Error fetching movie reviews:', error);
            });

    } catch (error) {
        console.error('Error opening movie info modal:', error);
    }
}

export function closeMovieInfoModal() {
    try {
        const modalWrapperEl = document.getElementById('movieInfoModalWrapper');
        document.body.style.overflow = 'auto';
        modalWrapperEl.style.display = "none";
    } catch (error) {
        console.error('Error closing movie info modal:', error);
    }
}

// Function to handle bookmarks : <button class="bookmark-movie-button" onclick="bookmarkMovie('${movie.id}')"> Bookmark </button>

//async function bookmarkMovie(movieId) {}

// global access
//window.bookmarkMovie = bookmarkMovie;
