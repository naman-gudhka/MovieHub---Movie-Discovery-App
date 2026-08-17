import {user, saveToStorage} from '../data/user.js';

export function renderMovieCards(movieList, movieGrid){
  
  let movieCardHTML = '';

  movieList.forEach((movie) => {
    const isLiked = user.likedMovies.includes(movie.id);
    const inWatchlist = user.watchlist.includes(movie.id);

    movieCardHTML += `
      <article class="movie-card" data-movie-id="${movie.id}">
        <img src="assets/images/movie-placeholder.avif" alt="Poster for ${movie.title}" />
        <div class="card-body">
          <div class="card-top">
            <span class="card-badge">${
              movie.rank ? `#${movie.rank}` 
                            : movie.status.includes('trending')
                              ? 'Trending'
                            : movie.status.includes('popular')
                              ? 'Popular'
                            : 'Latest'
            }</span>
            <span class="card-rating">${movie.rating}</span>
          </div>
          <div class="card-description"> 
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
          </div>
          <div class="card-meta">
            <span>${movie.genre[0]}</span>
            <span>${movie.year}</span>
          </div>
          <div class="card-actions">
            <button class="card-action card-action--like ${isLiked ? 'liked' : ''}" type="button" aria-label="${isLiked ? `unlike ${movie.title}` : `Like ${movie.title}`}">
              ${isLiked ? '♥' : '♡'}
            </button>
            <button class="card-action card-action--watchlist" type="button" aria-label="Add ${movie.title} to watchlist">
              ${inWatchlist ? '✔' : '+'}
            </button>
            <button class="card-action card-action--detail" type="button">View Details</button>
          </div>
        </div>
      </article>
    `;
  });

  movieGrid.innerHTML = movieCardHTML;

}

export function movieCardInteraction(movieGrid, onUnlike){
  movieGrid.addEventListener('click', (event) => {
    
    const likeButton = event.target.closest('.card-action--like');

    if(!likeButton){
      return;
    }

    const movieCard = likeButton.closest('.movie-card');

    const movieId = Number(movieCard.dataset.movieId);
    
    const isLiked = user.likedMovies.includes(movieId);

    if(isLiked){
      
      user.likedMovies = user.likedMovies.filter(
        id => id != movieId
      );
      saveToStorage();
      updateLikeButtons(movieId);
      if(onUnlike){
        onUnlike(movieCard);
      }
    
    }else{
      
      user.likedMovies.push(movieId);
      saveToStorage();
      updateLikeButtons(movieId);
    
    }

  });
}

function updateLikeButtons(movieId){
  const movieCards = document.querySelectorAll(`[data-movie-id="${movieId}"]`);

  movieCards.forEach((movieCard) => {
    const likeButton = movieCard.querySelector('.card-action--like');

    const isLiked = user.likedMovies.includes(movieId);

    likeButton.classList.toggle('liked' , isLiked);
    likeButton.textContent = isLiked ? '♥' : '♡';

  });
}

export function watchlistInteraction(movieGrid, onRemove){
  movieGrid.addEventListener('click', (event) => {
    
    const watchlistButton = event.target.closest('.card-action--watchlist');
  
    if(!watchlistButton){
      return;
    }

    const movieCard = watchlistButton.closest('.movie-card');

    const movieId = Number(movieCard.dataset.movieId);

    const inWatchlist = user.watchlist.includes(movieId);

    if(inWatchlist){
      
      user.watchlist = user.watchlist.filter(
        id => id != movieId
      );

      if(onRemove){
        onRemove(movieCard);
      }

    }else{

      user.watchlist.push(movieId);

    }

    saveToStorage();
    updateWatchlistButton(movieId);
  
  });
}

function updateWatchlistButton(movieId){
  const movieCards = document.querySelectorAll(`[data-movie-id="${movieId}"]`);

  movieCards.forEach((movieCard) => {
    const watchlistButton = movieCard.querySelector('.card-action--watchlist');

    const inWatchlist = user.watchlist.includes(movieId);

    watchlistButton.textContent = inWatchlist ? '✔' : '+';

  });
}