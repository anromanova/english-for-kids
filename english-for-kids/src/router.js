import { init as initMain } from './main';
import { init as initCategory } from './category';
import { init as initMessage } from './message';
import { init as initStatistic } from './statistic';

const routes = {
  '': '/pages/main.html',
  category: '/pages/category.html',
  message: '/pages/message.html',
  statistic: '/pages/statistic.html',
};

const initRoute = {
  '': initMain,
  category: initCategory,
  message: initMessage,
  statistic: initStatistic,
};

export const handleLocation = async () => {
  const { pathname } = window.location;

  const path = pathname.split('/')[1];
  const id = pathname.split('/')[2];
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById('main-page').innerHTML = html;
  initRoute[path]({ id });
};

export const route = (options) => {
  let path;
  if (options?.target) {
    let optionsUse = options;
    optionsUse = optionsUse || window.event;
    optionsUse.preventDefault();
    path = optionsUse.currentTarget.getAttribute('href');
  } else {
    path = options;
  }
  window.history.pushState({}, '', path);
  handleLocation();
};

window.onpopstate = handleLocation;
