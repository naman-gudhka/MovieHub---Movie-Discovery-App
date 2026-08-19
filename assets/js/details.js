import {movies} from '../data/movies.js';
import {user, saveToStorage} from '../data/user.js';

const params = new URLSearchParams(window.location.search);

const movieId = Number(params.get('id'));

const movie = movies.find(movie => movie.id === movieId);

likeInteraction();
watchlistInteraction();
renderMovieDetails(movie);
updateLikeButton();
updateWatchlistButton();

function renderMovieDetails(movie){
  
  const moviePoster = document.querySelector('.js-details-poster');
  const cardBadge = document.querySelector('.js-card-badge');
  const cardRating = document.querySelector('.js-card-rating');
  const movieTitle = document.querySelector('#movie-title');
  const detailsDescription = document.querySelector('.js-details-description');
  const metaDetails = document.querySelector('.js-details-meta');
  const movieDescription = document.querySelector('.js-movie-description');
  const releaseYear = document.querySelector('#js-year');
  const language = document.querySelector('#js-language');
  const genre = document.querySelector('#js-genre');
  const rating = document.querySelector('#js-rating');
  const keywordsList = document.querySelector('.js-keyword-list');
  const director = document.querySelector('#js-director');

  moviePoster.innerHTML = `
    <img
      src="${movie.poster}"
      alt="Poster for ${movie.title}"
    />
  `;
  cardBadge.textContent = `${movie.status[0]}`;
  cardRating.textContent = `${movie.rating}`;
  movieTitle.textContent = `${movie.title}`;
  detailsDescription.textContent = `${movie.description}`;

  let genreItemHtml = '';

  movie.genre.forEach((genreItem) => {
    
    genreItemHtml += `
      <span>${genreItem}</span>
    `;

  });

  let keywordsHtml = '';

  movie.keywords.forEach((keyword) => {

    keywordsHtml +=  `
      <span>${keyword}</span>
    `;

  });

  metaDetails.innerHTML = genreItemHtml;
  movieDescription.textContent = `${movie.detailedDescription}`;
  releaseYear.textContent = `${movie.year}`;
  language.textContent = `${movie.languages}`;
  genre.textContent = `${movie.genre[0]}`;
  rating.textContent = `${movie.rating}`;
  keywordsList.innerHTML = keywordsHtml;
  director.textContent = `${movie.director}`;

}

function likeInteraction(){
  const likeButton = document.querySelector('.js-like-button');

  likeButton.addEventListener('click', () => {
    const isLiked = user.likedMovies.includes(movieId);

    if(isLiked){
      user.likedMovies = user.likedMovies.filter(
        id => id !== movieId
      );
    }else{
      user.likedMovies.push(movieId);
    }
    
    saveToStorage();
    updateLikeButton();

  });
}

function watchlistInteraction(){
  const watchlistButton = document.querySelector('.js-watchlist-button');

  watchlistButton.addEventListener('click', () => {
    const inWatchlist = user.watchlist.includes(movieId);

    if(inWatchlist){
      user.watchlist = user.watchlist.filter(
        id => id != movieId
      );
    }else{
      user.watchlist.push(movieId);
    }

    saveToStorage();
    updateWatchlistButton();
    
  });
}

function updateLikeButton() {
  const likeButton = document.querySelector('.js-like-button');

  const isLiked = user.likedMovies.includes(movieId);

  likeButton.textContent = isLiked
    ? '♥ Liked'
    : '♡ Like';
}

function updateWatchlistButton() {
  const watchlistButton = document.querySelector('.js-watchlist-button');

  const inWatchlist = user.watchlist.includes(movieId);

  watchlistButton.textContent = inWatchlist
    ? '✔ In Watchlist'
    : '+ Watchlist';
}