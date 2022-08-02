import { finishGame } from './play';
import { MAIN_CONTAINER } from './main';
import createElement from './create_element';

const FAILURE = '../assets/audio/failure.mp3';
const SUCCESS = '../assets/audio/success.mp3';
const SUCCESS_IMG = '../assets/img/success.png';
const FAILURE_IMG = '../assets/img/errors.png';
let message;
let finileImg;
let messageText;

function removeMessage() {
  message.remove();
  finishGame();
  window.route('/');
}

function showTextWithoutMistakes() {
  finileImg.src = `${SUCCESS_IMG}`;
  messageText.innerHTML = 'Good Work!';
  const successSound = new Audio();
  successSound.src = `${SUCCESS}`;
  successSound.play();
}

function showTextWithMistakes(mistakes) {
  finileImg.src = `${FAILURE_IMG}`;
  const errorSound = new Audio();
  errorSound.src = `${FAILURE}`;
  errorSound.play();
  if (mistakes === 1) {
    messageText.innerHTML = `${mistakes} wrong answer`;
  } else {
    messageText.innerHTML = `${mistakes} wrong answers`;
  }
}

export const init = ({ id }) => {
  const mistakes = id;
  message = createElement('div', 'message-container');
  MAIN_CONTAINER.append(message);
  finileImg = createElement('img', 'message-img');
  messageText = createElement('h2', 'message-text');

  if (mistakes > 0) {
    showTextWithMistakes(mistakes);
  } else {
    showTextWithoutMistakes();
  }
  message.append(finileImg, messageText);
  setTimeout(removeMessage, 3000);
};

export default init;
