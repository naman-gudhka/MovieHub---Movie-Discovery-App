import { movies } from "../data/movies.js";

const searchInput = document.querySelector('#movie-search');
const searchButton = document.querySelector('.js-search-button');
const searchSuggestions = document.querySelector('.js-search-suggestions');

searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase().trim();

  const matchingMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchText);
  });

  let suggestionsHTML = '';

  matchingMovies.slice(0, 6).forEach(movie => {

    suggestionsHTML += `
      <div
        class="search-suggestion js-search-suggestion"
        data-movie-id="${movie.id}"
      >
        ${movie.title}
      </div>
    `;

    if(searchInput.value === ''){
      suggestionsHTML = '';
      searchSuggestions.classList.add('hidden');
    }

  });

  searchSuggestions.innerHTML = suggestionsHTML;

});

searchSuggestions.addEventListener('click', () => {
  
  const suggestion = event.target.closest('.js-search-suggestion');

  if(!suggestion){
    return;
  }

  const movieId = suggestion.dataset.movieId;

  window.location.href = `details.html?id=${movieId}`;

});