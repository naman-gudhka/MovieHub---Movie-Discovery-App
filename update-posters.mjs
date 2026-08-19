import fs from 'fs';
import readline from 'readline';

const aliases = {
  "Lagaan": "Lagaan: Once Upon a Time in India",
  "Taare Zameen Par": "Like Stars on Earth",
  "Chhello Show": "Last Film Show",
  "MS Dhoni: The Untold Story": "M.S. Dhoni: The Untold Story",
  "Pushpa 2: The Rule": "Pushpa 2 - The Rule",
  "Kalki 2898 AD": "Kalki 2898-AD",
  "Salaar: Part 1 – Ceasefire": "Salaar: Part 1 - Ceasefire",
  "Maya Bazaar": "Mayabazar"
};

const MOVIES_FILE = './assets/data/movies.js';
const OUTPUT_FILE = './assets/data/movies-with-posters.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const token = await new Promise(resolve => {
  rl.question('Paste your TMDB Read Access Token: ', answer => {
    resolve(answer.trim());
  });
});

rl.close();

if (!token) {
  console.log('No token provided.');
  process.exit(1);
}


// Read your movies.js
const source = fs.readFileSync(MOVIES_FILE, 'utf8');

// Remove "export" so we can evaluate the data
const dataSource = source.replace(
  'export const movies =',
  'const movies ='
);

// Safely evaluate the movie array
const getMovies = new Function(`
  ${dataSource}
  return movies;
`);

const movies = getMovies();

console.log(`Found ${movies.length} movies.`);


// Search TMDB
async function searchMovie(movie) {

  const url = new URL(
    'https://api.themoviedb.org/3/search/movie'
  );

  const searchTitle = aliases[movie.title] || movie.title;

  url.searchParams.set('query', searchTitle);
  
  url.searchParams.set('primary_release_year', movie.year);
  url.searchParams.set('language', 'en-US');

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(
      `TMDB error ${response.status} for ${movie.title}`
    );
  }

  const data = await response.json();

  return data.results || [];
}


// Find the correct result
function findBestMatch(movie, results) {

  const exactMatches = results.filter(result => {

    const sameTitle =
      result.title?.toLowerCase() === movie.title.toLowerCase();

    const releaseYear =
      result.release_date
        ? Number(result.release_date.slice(0, 4))
        : null;

    const sameYear = releaseYear === movie.year;

    return sameTitle && sameYear;
  });

  return exactMatches[0] || null;
}


// Process movies one by one
for (const movie of movies) {

  console.log(
    `Searching: ${movie.title} (${movie.year})`
  );

  try {

    const results = await searchMovie(movie);

    const match = findBestMatch(movie, results);

    if (!match) {

      console.log(
        `⚠️  NO EXACT MATCH: ${movie.title} (${movie.year})`
      );

      continue;
    }

    if (!match.poster_path) {

      console.log(
        `⚠️  NO POSTER: ${movie.title} (${movie.year})`
      );

      continue;
    }

    movie.poster =
      `https://image.tmdb.org/t/p/w500${match.poster_path}`;

    console.log(
      `✅ ${movie.title} → ${movie.poster}`
    );

  } catch (error) {

    console.log(
      `❌ ERROR: ${movie.title}`,
      error.message
    );

  }

  // Small delay between requests
  await new Promise(resolve =>
    setTimeout(resolve, 250)
  );
}


// Generate a new JS file
const output = `
export const movies = ${JSON.stringify(movies, null, 2)};
`;

fs.writeFileSync(
  OUTPUT_FILE,
  output.trim() + '\n'
);

console.log('\nDone!');
console.log(`Created: ${OUTPUT_FILE}`);