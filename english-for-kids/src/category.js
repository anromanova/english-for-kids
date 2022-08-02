import data from './data/cards';
import { playMode } from './play';
import { pronounceWord, flipCard, flipBack } from './train';
import { MAIN_CONTAINER } from './main';
import createElement from './create_element';

const FLIP_ICON = '../assets/img/rotate.svg';

const front = (category) => {
  const cardFront = createElement('div', 'card-front');
  const frontContent = createElement('div', 'content-container');
  const frontTitle = createElement('h2', 'card-title');
  const cardFlipImg = createElement('img', 'card-turn');
  const frontImgContainer = createElement('div', 'img-container');
  const frontImg = createElement('img', 'card-img');
  frontTitle.innerHTML = category.word;
  cardFlipImg.src = FLIP_ICON;
  cardFlipImg.addEventListener('click', flipCard);
  frontImg.src = `../assets/${category.image}`;
  frontImg.setAttribute('alt', category.word);
  frontImgContainer.append(frontImg);
  cardFront.append(frontImgContainer, frontContent);
  frontContent.append(frontTitle, cardFlipImg);
  return cardFront;
};

const back = (category) => {
  const cardBack = createElement('div', 'card-back');
  const backTranslation = createElement('h2', 'card-translation');
  backTranslation.innerHTML = category.translation;
  cardBack.append(backTranslation);
  return cardBack;
};

export const init = ({ id }) => {
  data[id].forEach((category, index) => {
    const categoryElement = createElement('div', 'card-container');
    categoryElement.setAttribute('sound', category.audioSrc);
    categoryElement.setAttribute('word', category.word);
    categoryElement.addEventListener('click', pronounceWord);
    const card = createElement('div', 'card');
    categoryElement.append(card);
    if (playMode) {
      card.classList.add('card--active');
    }
    categoryElement.setAttribute('category-id', index + 1);
    MAIN_CONTAINER.append(categoryElement);
    const cardBack = back(category);
    const cardFront = front(category);
    card.append(cardBack, cardFront);
    card.addEventListener('mouseleave', flipBack);
  });
};

export default init;
