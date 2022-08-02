import data from './data/cards';
import { playMode, checkCategory } from './play';
import createElement from './create_element';

export const CATIGORIES = data[0];
export const MAIN_CONTAINER = document.querySelector('#main-page');
export const ASIDE_MENU = document.querySelector('.categories-items');
let categoryElement;

export const init = () => {
  CATIGORIES.forEach((category, index) => {
    categoryElement = createElement('div', 'card-container');
    categoryElement.setAttribute('category-id', index + 1);
    categoryElement.setAttribute('href', `/category/${index + 1}`);
    categoryElement.addEventListener('click', window.route);
    categoryElement.addEventListener('click', checkCategory);
    const card = createElement('div', 'card');
    const categoryElementImg = createElement('img', 'card-img');
    categoryElementImg.src = `assets/${category.image}`;
    categoryElementImg.setAttribute('alt', category.word);
    const categoryImgContainer = createElement('div', 'img-container');
    const categoryElementTitle = createElement('h2', 'card-title');
    categoryElementTitle.innerHTML = category.word;
    MAIN_CONTAINER.append(categoryElement);
    categoryElement.append(card);
    card.append(categoryImgContainer, categoryElementTitle);
    categoryImgContainer.append(categoryElementImg);
    if (playMode) {
      card.classList.add('card--active');
    }
  });
};

export const initAsideMenu = () => {
  CATIGORIES.forEach((category, index) => {
    const categoryAsideElement = createElement('li', 'nav-item');
    const categoryAsideLink = createElement('a', 'aside-link');
    categoryAsideLink.setAttribute('href', `/category/${index + 1}`);
    categoryAsideLink.setAttribute('category-id', index + 1);
    categoryAsideLink.innerHTML = category.word;
    ASIDE_MENU.append(categoryAsideElement);
    categoryAsideElement.append(categoryAsideLink);
  });
};
