import './theme.js';
import './navigation.js';
import {movies} from '../data/movies.js';
import {renderMovieCards} from './movies.js';

const movieGrid = document.querySelector('.js-movie-grid');

renderMovieCards(movies.slice(0, 4), movieGrid);

document.querySelector('.js-view-more-btn')
  .addEventListener('click', () => {
    window.location.href = 'browse.html';
  });