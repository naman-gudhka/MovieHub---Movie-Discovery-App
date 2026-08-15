import { movies } from "../data/movies.js";
import { renderMovieCards } from "./movies.js";

const movieGrid = document.querySelector('.js-movie-grid');

const genreFilter = document.querySelector('#genre-filter');
const languageFilter = document.querySelector('#language-filter');
const yearFilter = document.querySelector('#year-filter');
const ratingFilter = document.querySelector('#rating-filter');

const noResult = document.querySelector('.js-no-results');
const clearFilterBtn = document.querySelector('.js-clear-filters');

const movieCount = document.querySelector('.js-movie-count');

const genreMatch = (selectedGenre, movie) => {
      if(selectedGenre === 'all'){
        return true;
      }

      return movie.genre.some(
        genre => genre.toLowerCase() === selectedGenre
      );
    }

const languageMatch = (selectedLanguage, movie) => {
    if(selectedLanguage === 'all'){
      return true;
    }

    return movie.languages.some(
      language => language.toLowerCase() === selectedLanguage
    );
  }

const yearMatch = (selectedYear, movie) => {
    if(selectedYear === 'all'){
      return true;
    }

    if (selectedYear === '2020s') {
      return movie.year >= 2020 && movie.year <= 2029;
    }

    if (selectedYear === '2010s') {
      return movie.year >= 2010 && movie.year <= 2019;
    }

    if (selectedYear === '2000s') {
      return movie.year >= 2000 && movie.year <= 2009;
    }

    if (selectedYear === '1990s') {
      return movie.year >= 1990 && movie.year <= 1999;
    }

    if (selectedYear === 'older') {
      return movie.year < 1990;
    }
  
  }

const ratingMatch = (selectedRating, movie) => {
  if(selectedRating === 'all'){
    return true;
  }

  if(selectedRating === '9'){
    return movie.rating >= 9;
  }

  if (selectedRating === '8') {
    return movie.rating >= 8;
  }

  if (selectedRating === '7') {
    return movie.rating >= 7;
  }

  if (selectedRating === '6') {
    return movie.rating >= 6;
  }

}

function filterMovies(){
  
  const selectedGenre = genreFilter.value;
  const selectedLanguage = languageFilter.value;
  const selectedYear = yearFilter.value;
  const selectedRating = ratingFilter.value;

  const filteredMovies = movies.filter((movie) => {

    return (
      genreMatch(selectedGenre, movie) && 
      languageMatch(selectedLanguage, movie) &&
      yearMatch(selectedYear, movie) &&
      ratingMatch(selectedRating, movie)
    );
  
  });

  movieCount.textContent = filteredMovies.length;

  renderMovieCards(filteredMovies, movieGrid);

  if(filteredMovies.length === 0){
    noResult.hidden = false;
  }else{  
    noResult.hidden = true;
  }

}

genreFilter.addEventListener('change', filterMovies);
languageFilter.addEventListener('change', filterMovies);
yearFilter.addEventListener('change', filterMovies);
ratingFilter.addEventListener('change', filterMovies);


clearFilterBtn.addEventListener('click', () => {

  genreFilter.value = 'all';
  languageFilter.value = 'all';
  yearFilter.value = 'all';
  ratingFilter.value = 'all'; 
  
  filterMovies();

  movieCount.textContent = movies.length;

});

renderMovieCards(movies, movieGrid);