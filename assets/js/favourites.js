import { movies } from "../data/movies.js";
import { user } from "../data/user.js";
import { renderMovieCards, movieCardInteraction } from "./movies.js";

const favouritesGrid = document.querySelector('.js-favorites-grid');
const favouriteMovies = movies.filter(
  movie => user.likedMovies.includes(movie.id)
);
const emptyState = document.querySelector('.js-favorites-empty');

document.querySelector('.js-favorite-count').innerHTML = favouriteMovies.length;

if(favouriteMovies.length === 0) {
  emptyState.hidden = false;
}else {
  emptyState.hidden = true;

  movieCardInteraction(favouritesGrid, (movieCard) => {
    movieCard.remove();
    
    if (favouritesGrid.children.length === 0) {
      emptyState.hidden = false;
    }

    document.querySelector('.js-favorite-count').innerHTML = favouritesGrid.children.length;
  });

  renderMovieCards(favouriteMovies, favouritesGrid);
}
