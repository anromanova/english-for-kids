import { route } from './router';
import './index.scss';
import './burger';
import './train';
import './storage';
import './statistic';
import { checkCategory } from './play';

window.route = route;
window.addEventListener('onload', route(''));

const toggleActiveLink = (event) => {
  const linksSideMenu = document.querySelectorAll('.aside-link');
  linksSideMenu.forEach((link) => {
    link.classList.remove('link-active');
  });
  event.target.classList.add('link-active');
};

document.querySelectorAll('.aside-link').forEach((link) => {
  link.addEventListener('click', route);
  link.addEventListener('click', toggleActiveLink);
  link.addEventListener('click', checkCategory);
});
