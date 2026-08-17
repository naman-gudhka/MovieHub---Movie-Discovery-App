import { movies } from "../data/movies.js";
import { user } from "../data/user.js";
import { renderMovieCards, movieCardInteraction , watchlistInteraction } from "./movies.js";

const watchlistGrid = document.querySelector('.js-watchlist-grid');

const watchlistEmpty = document.querySelector('.js-watchlist-empty');

const watchlistCount = document.querySelector('.js-watchlist-count');

const watchlistMovies = movies.filter(
  movie => user.watchlist.includes(movie.id)
);

if(watchlistMovies.length === 0){
  
  watchlistEmpty.hidden = false;
  watchlistCount.textContent = 0;  

}else{
  
  watchlistEmpty.hidden = true;
  watchlistCount.textContent = watchlistMovies.length;  
  movieCardInteraction(watchlistGrid);
  watchlistInteraction(watchlistGrid, (movieCard) => {
    movieCard.remove();
    watchlistCount.textContent = watchlistGrid.children.length;

    if (watchlistGrid.children.length === 0) {
      watchlistEmpty.hidden = false;
    }
  });
  renderMovieCards(watchlistMovies, watchlistGrid);

}