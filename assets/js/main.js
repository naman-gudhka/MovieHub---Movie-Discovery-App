import './theme.js';
import './navigation.js';
import {movies} from '../data/movies.js';
import {renderMovieCards, movieCardInteraction, watchlistInteraction} from './movies.js';

const movieGrid = document.querySelector('.js-movie-grid');

const trendingMovieGrid = document.querySelector('.js-movie-grid-trending');

const browseMovies = movies.slice(0, 4);

const trendingMovies = movies
                      .filter(movie => movie.status.includes('trending'))
                      .slice(0,4);

movieCardInteraction(movieGrid);
watchlistInteraction(movieGrid);
renderMovieCards(browseMovies, movieGrid);

movieCardInteraction(trendingMovieGrid);
watchlistInteraction(trendingMovieGrid);
renderMovieCards(trendingMovies, trendingMovieGrid);

document.querySelector('.js-view-more-btn')
  .addEventListener('click', () => {
    window.location.href = 'browse.html';
  });
