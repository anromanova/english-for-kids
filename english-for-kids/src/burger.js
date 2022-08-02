import { initAsideMenu } from './main';
import { game, background, BODY } from './play';

const sideMenu = document.querySelector('.side-menu_container');
const burger = document.querySelector('.burger');
const sideLink = document.querySelectorAll('.nav-list');

export const toggleMenu = () => {
  if (game) {
    alert('finish the current game first or switch to "training mode"');
  } else {
    sideMenu.classList.toggle('side-menu_active');
    burger.classList.toggle('burger_active');
    background.classList.toggle('mode--active');
    if (background.classList.contains('mode--active')) {
      BODY.classList.add('scroll-hidden');
    } else {
      BODY.classList.remove('scroll-hidden');
    }
  }
};

burger.addEventListener('click', toggleMenu);
background.addEventListener('click', toggleMenu);
sideLink.forEach((link) => {
  link.addEventListener('click', toggleMenu);
  // todo 'aside-link
});
initAsideMenu();

export default toggleMenu;
