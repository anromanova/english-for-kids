import { playMode } from './play';
import { addToStatistics } from './storage';

let cardFlipped = false;

export const pronounceWord = (event) => {
  const pronounceSound = event.currentTarget.getAttribute('sound');
  const sound = new Audio();
  sound.src = `../assets/${pronounceSound}`;
  if (!playMode && !event.target.classList.contains('card-turn') && !cardFlipped) {
    sound.play();
  }
  const prononceWord = event.currentTarget.querySelector('.card-img').getAttribute('alt');
  addToStatistics(prononceWord, 'trained');
};

export const flipCard = (event) => {
  const card = event.target.closest('.card');
  card.classList.add('card-flipped');
  cardFlipped = true;
};

export const flipBack = (event) => {
  const card = event.currentTarget;
  cardFlipped = false;
  card.classList.remove('card-flipped');
};
