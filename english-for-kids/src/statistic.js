import data from './data/cards';
import { getStatistics, deleteStatistic } from './storage';

const HEADER_LIST = ['category', 'word', 'translation', 'trained', 'correct', 'incorrect', '%'];
let WORDS = [];
let statistics;

const sortArrayUP = (array, index) => {
  array.sort((b, a) => {
    if (Number.isNaN(a[index] - b[index])) {
      if ((a[index] === b[index])) {
        return 0;
      }
      if ((a[index] < b[index])) {
        return -1;
      }
      return 1;
    }
    return a[index] - b[index];
  });
};

const sortArrayDown = (array, index) => {
  array.sort((a, b) => {
    if (Number.isNaN(a[index] - b[index])) {
      if ((a[index] === b[index])) {
        return 0;
      }
      if ((a[index] < b[index])) {
        return -1;
      }
      return 1;
    }
    return a[index] - b[index];
  });
};

const formArray = () => {
  if (WORDS.length > 0) {
    WORDS = [];
    statistics = [0, 0, 0, 0];
  }
  for (let i = 1; i < data.length; i += 1) {
    for (let n = 0; n < data.length - 1; n += 1) {
      const wordArr = [];
      wordArr.push(data[0][i - 1].word);
      wordArr.push(data[i][n].word);
      const { word } = data[i][n];
      statistics = getStatistics(word);
      wordArr.push(data[i][n].translation);
      wordArr.push(statistics[0]);
      wordArr.push(statistics[1]);
      wordArr.push(statistics[2]);
      wordArr.push(statistics[3]);
      WORDS.push(wordArr);
    }
  }
  return WORDS;
};

const renderRows = (array) => {
  const TABLE_BODY = document.querySelector('.table-words');
  TABLE_BODY.innerHTML = '';
  array.forEach((word) => {
    const wordRow = document.createElement('tr');
    wordRow.classList.add('word-line');
    TABLE_BODY.append(wordRow);
    for (let i = 0; i < HEADER_LIST.length; i += 1) {
      const td = document.createElement('td');
      td.innerHTML = word[i];
      wordRow.appendChild(td);
    }
  });
};

const sortArray = (array, index, event) => {
  if (event.target.classList.contains('down')) {
    sortArrayDown(WORDS, index);
    event.target.classList.remove('down');
    event.target.classList.add('up');
  } else {
    sortArrayUP(WORDS, index, event);
    event.target.classList.add('down');
    event.target.classList.remove('up');
  }
  renderRows(array);
};

function resetStatistic() {
  deleteStatistic();
  formArray();
  renderRows(WORDS);
}

export const init = () => {
  const TABLE_HEADER = document.querySelector('.table-header');
  HEADER_LIST.forEach((word, index) => {
    const title = document.createElement('th');
    title.setAttribute('title', word);
    title.setAttribute('id', index);
    title.innerHTML = word;
    TABLE_HEADER.append(title);
    title.addEventListener('click', (event) => {
      sortArray(WORDS, index, event);
    });
  });
  formArray();
  renderRows(WORDS);
  const resetButton = document.querySelector('.statistic-btn');
  resetButton.addEventListener('click', resetStatistic);
};

export default init;
