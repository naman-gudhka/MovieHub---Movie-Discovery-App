const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

menuButton.addEventListener('click', () => {
  navigation.classList.toggle('site-nav-open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('site-nav-open');
  })
});