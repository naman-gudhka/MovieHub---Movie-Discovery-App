import { movies } from "../data/movies.js";
import { renderMovieCards } from "./movies.js";

const movieGrid = document.querySelector('.js-movie-grid');

renderMovieCards(movies, movieGrid);