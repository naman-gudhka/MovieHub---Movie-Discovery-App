import './theme.js';
import './navigation.js';
import {movies} from '../data/movies.js';
import {renderMovieCards} from './movies.js';

const movieGrid = document.querySelector('.js-movie-grid');

const trendingMovieGrid = document.querySelector('.js-movie-grid-trending');

const trendingMovies = movies
                      .filter(movie => movie.status.includes('trending'))
                      .slice(0,4);

renderMovieCards(movies.slice(0, 4), movieGrid);

renderMovieCards(trendingMovies, trendingMovieGrid);

document.querySelector('.js-view-more-btn')
  .addEventListener('click', () => {
    window.location.href = 'browse.html';
  });
