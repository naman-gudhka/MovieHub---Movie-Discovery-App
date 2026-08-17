const STORAGE_KEY = 'moviehub-user';

export const user = loadFromStorage() || {
  likedMovies: [],
  watchlist: []
};

function loadFromStorage(){

  const savedUser = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(savedUser);

}

export function saveToStorage(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}