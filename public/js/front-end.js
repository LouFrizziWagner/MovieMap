/** Front-end Script */


document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/movies/now-playing');
    const movies = await response.json();

    const movieList = document.getElementById('movieList');

    if (movieList) {
        movies.forEach(movie => {
            const li = document.createElement('li');
            li.classList.add('movie-list-item');
            li.innerHTML = `
                <figure class="movie-teaser-image-wrapper" style = " background-image:linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('https://image.tmdb.org/t/p/w500${movie.poster_path}'); " >
                    	<img class="movie-teaser-image" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                </figure>
                <h3 class="movie-title">${movie.title}</h3>
                

            `;
            movieList.appendChild(li);

            li.addEventListener('click', () => {
                openMovieInfoModal(movie);
            })
        });
    } else {
        console.error('Movie list element not found');
    }

    function openMovieInfoModal(movie){
        console.log("opened");

        let modalWrapperEl = document.getElementById('movieInfoModalWrapper');
        let modalEl = document.getElementById('movieInfoModal');

        modalEl.innerHTML = `
        <img class="movie-teaser-image" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <div class="movie-text-container">
            <h3>${movie.title}</h3>
            <div class="release-rating-info-wrapper"> 
                <p class="movie-release-date"><strong>Released:</strong> ${movie.release_date}</p>
                <p class="movie-rating"><strong>Rating:</strong> ${movie.vote_average}</p>
            </div>
            <div class="movie-overview">
                <p> ${movie.overview}</p>
            </div>
        </div>
        `;

        modalWrapperEl.style.display = "block";
    }

});
