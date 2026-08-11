const toggleButton = document.querySelector('.theme-toggle');
const toggleIcon = document.querySelector('.toggle-icon');
const toggleLabel = document.querySelector('.toggle-label');

const STORAGE_KEY = 'theme';

const savedTheme = localStorage.getItem(STORAGE_KEY) || 'dark';

let currentTheme = savedTheme;

applyTheme(currentTheme);

function applyTheme(theme){

  if(theme === 'dark'){
    document.body.classList.remove('light');
    toggleIcon.textContent = '☀︎';
    toggleLabel.textContent = 'Dark';
  }else if(theme === 'light'){
    document.body.classList.add('light');
    toggleIcon.textContent = '☀️';
    toggleLabel.textContent = 'Light';
  }

  localStorage.setItem(STORAGE_KEY, theme);

}

toggleButton.addEventListener('click', () => {

  if(currentTheme === 'dark'){
    currentTheme = 'light';
  }else if(currentTheme === 'light'){
    currentTheme = 'dark';
  }

  applyTheme(currentTheme);
  
});


const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('site-nav-open');
});

navLinks.forEach((links) => {
  links.addEventListener('click', () => {
    navigation.classList.remove('site-nav-open');
  })
})