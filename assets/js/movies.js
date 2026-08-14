export function renderMovieCards(movieList, movieGrid){
  
  let movieCardHTML = '';

  movieList.forEach((movie) => {
    movieCardHTML += `
      <article class="movie-card" data-section="browse">
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
            <button class="card-action" type="button" aria-label="Like ${movie.title}">♡</button>
            <button class="card-action" type="button" aria-label="Add ${movie.title} to watchlist">+</button>
            <button class="card-action card-action--detail" type="button">View Details</button>
          </div>
        </div>
      </article>
    `;
  });

  movieGrid.innerHTML = movieCardHTML;

}