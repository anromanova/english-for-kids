/* eslint-disable import/no-mutable-exports */
import data from './data/cards';
import { addToStatistics } from './storage';

const MAIN_CONTAINER = document.querySelector('#main-page');
export const BODY = document.querySelector('.body');
export const background = document.querySelector('.shadow-layer');
const BUTTON_PLAY = document.querySelector('.btn-start');
const MODE_SWITCHER = document.querySelector('input');
const MODE_TRAIN = document.querySelector('.mode-train');
const MODE_PLAY = document.querySelector('.mode-play');
const CORRECT = '../assets/audio/correct.mp3';
const MISTAKE = '../assets/audio/error.mp3';
const STAR_CORRECT = '../assets/img/star-win.svg';
const STAR_ERROR = '../assets/img/star.svg';

export let playMode;
let soundArray = [];
let soundIndex = 0;
let totalStars = 0;
let mistakes = 0;
let starsLine;
let star;
export let game;

const formArray = (id) => {
  data[id].forEach((card) => {
    soundArray.push(card.audioSrc);
  });
  soundArray.sort(() => (Math.random() > 0.5 ? 1 : -1));
};

function playSound() {
  if (soundArray.length > soundIndex) {
    const sound = new Audio();
    sound.src = `../assets/${soundArray[soundIndex]}`;
    sound.play();
  }
}

function disableCard(event) {
  event.currentTarget.classList.add('card--disabled');
}

function checkStar() {
  const starWidth = 60;
  if (starWidth * totalStars > window.screen.width) {
    starsLine.removeChild(starsLine.getElementsByTagName('img')[0]);
  }
}

function addStar() {
  checkStar();
  star = document.createElement('img');
  star.src = `${STAR_CORRECT}`;
  starsLine.append(star);
  const soundStar = new Audio();
  soundStar.src = CORRECT;
  soundStar.play();
}

function addMistake() {
  checkStar();
  if (game) {
    star = document.createElement('img');
    star.src = `${STAR_ERROR}`;
    starsLine.append(star);
    mistakes += 1;
    const soundMistake = new Audio();
    soundMistake.src = MISTAKE;
    soundMistake.play();
  }
  return mistakes;
}

export function checkCategory() {
  soundArray = [];
  if (playMode) {
    const { pathname } = window.location;
    const path = pathname.split('/')[1];
    const id = pathname.split('/')[2];
    if (path === 'category') {
      formArray(id);
      BUTTON_PLAY.classList.add('mode--active');
    } else {
      BUTTON_PLAY.classList.remove('mode--active');
    }
  }
}

export function finishGame() {
  checkCategory();
  soundIndex = 0;
  BUTTON_PLAY.innerHTML = 'Start';
  game = false;
  mistakes = 0;
  totalStars = 0;
  const CARDS = document.querySelectorAll('.card-container');
  CARDS.forEach((card) => {
    card.classList.remove('card--disabled');
  });
  starsLine?.remove();
}

function changeMode() {
  MODE_TRAIN.classList.toggle('mode--active');
  MODE_PLAY.classList.toggle('mode--active');
  const CARD = document.querySelectorAll('.card');
  if (MODE_PLAY.classList.contains('mode--active')) {
    playMode = true;
    CARD.forEach((element) => {
      element.classList.add('card--active');
    });
    checkCategory();
  } else {
    playMode = false;
    game = false;
    soundArray = [];
    BUTTON_PLAY.classList.remove('mode--active');
    BUTTON_PLAY.innerHTML = 'Start';
    CARD.forEach((element) => {
      element.classList.remove('card--active');
    });
  }
  finishGame();
}

// eslint-disable-next-line no-shadow
function showMessage(mistakes) {
  window.route(`/message/${mistakes}`);
  finishGame();
}

function checkPair(event) {
  totalStars += 1;
  const prononceWord = soundArray[soundIndex].split('/')[1].split('.')[0];
  const clickedCard = event.currentTarget.getAttribute('sound');
  if (clickedCard === soundArray[soundIndex]) {
    addToStatistics(prononceWord, 'correct');
    if (soundArray.length > soundIndex + 1) {
      soundIndex += 1;
      disableCard(event);
      addStar();
      setTimeout(playSound, 1000);
    } else {
      showMessage(mistakes);
    }
  } else {
    addMistake();
    setTimeout(playSound, 1000);
    addToStatistics(prononceWord, 'incorrect');
  }
  return soundIndex;
}

function initGame() {
  game = true;
  BUTTON_PLAY.innerHTML = 'Repeat';
  playSound();
  starsLine = document.createElement('div');
  starsLine.classList.add('stars-container');
  MAIN_CONTAINER.insertBefore(starsLine, MAIN_CONTAINER.firstChild);
  const CARDS = document.querySelectorAll('.card-container');
  CARDS.forEach((card) => {
    if (playMode) {
      card.addEventListener('click', checkPair);
    }
  });
  return soundIndex;
}

MODE_SWITCHER.addEventListener('click', changeMode);
BUTTON_PLAY.addEventListener('click', () => {
  if (!game) {
    initGame();
  } else {
    playSound();
  }
});

export default changeMode;
