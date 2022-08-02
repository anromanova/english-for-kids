let statistics = {};

if (localStorage.getItem('statistics')) {
  statistics = JSON.parse(localStorage.getItem('statistics'));
}

export function addToStatistics(word, action) {
  if (statistics[word] === undefined) {
    statistics[word] = { trained: 0, correct: 0, incorrect: 0 };
  }
  statistics[word][action] += 1;
  localStorage.setItem('statistics', JSON.stringify(statistics));
}

export function getStatistics(word) {
  let correctPercentage;
  if (statistics[word] === undefined) {
    return [0, 0, 0, 0];
  }
  if (statistics[word].correct > 0) {
    correctPercentage = (statistics[word].correct
      / (statistics[word].correct + statistics[word].incorrect))
      * 100;
  } else {
    correctPercentage = 0;
  }
  return [statistics[word].trained,
    statistics[word].correct,
    statistics[word].incorrect,
    Math.floor(correctPercentage)];
}

export function deleteStatistic() {
  localStorage.removeItem('statistics');
  statistics = [0, 0, 0, 0];
}
