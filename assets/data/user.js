const STORAGE_KEY = 'moviehub-user';

export const user = loadFromStorage();

function loadFromStorage(){
  const savedUser = localStorage.getItem(STORAGE_KEY);

  if(!savedUser || savedUser.length === 0){
    return {
      likedMovie: [],
      watchlist: []
    }
  }

  return JSON.parse(savedUser);

}

export function saveToStorage(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}