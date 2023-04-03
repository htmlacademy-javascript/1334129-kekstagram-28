const MAX_RANDOM_IMAGES = 10;

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersContainer = document.querySelector('.img-filters');
const filtersFormElement = document.querySelector('.img-filters__form');
const activeButtonStyle = 'img-filters__button--active';

let currentFiler = Filters.DEFAULT;

filtersContainer.classList.remove('img-filters--inactive');

const setFilterClick = (cb) => {
  filtersFormElement.addEventListener('click', (evt) => {
    const newFilter = evt.target.id;
    if (!newFilter || newFilter === currentFiler) {
      return;
    }
    const activeButtonElement = document.querySelector(`.${activeButtonStyle}`);
    activeButtonElement.classList.remove(activeButtonStyle);
    evt.target.classList.add(activeButtonStyle);
    currentFiler = newFilter;
    cb();
  });
};
const randomSorting = () => Math.random() - 0.5;
const sortByDiscussed = (a, b) => b.comments.length - a.comments.length;

const filterPosts = (posts) => {
  switch(currentFiler) {
    case Filters.DEFAULT:
      return posts;
    case Filters.RANDOM:
      return posts.slice(0).sort(randomSorting).slice(0, MAX_RANDOM_IMAGES);
    case Filters.DISCUSSED:
      return posts.slice(0).sort(sortByDiscussed);
  }
};

export {setFilterClick, filterPosts};
