import {onPictureClick} from './big-picture.js';
import {setFilterClick, filterPosts} from './filters.js';
import { debounce } from './util.js';

const container = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (photo) => {
  const {url, likes, comments, description, id} = photo;
  const thumbnail = thumbnailTemplate.cloneNode(true);

  const onThumbnailClick = (evt) => {
    evt.preventDefault();
    onPictureClick(photo);
  };

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.thumbnailId = id;

  thumbnail.addEventListener('click', onThumbnailClick);

  return thumbnail;
};

const renderThumbnails = (thumbnails) => {
  const currentThumbnails = document.querySelectorAll('.picture');

  currentThumbnails.forEach((thumbnail) => {
    container.removeChild(thumbnail);
  });

  const filteredThumbnails = filterPosts(thumbnails);
  const thumbnailFragment = document.createDocumentFragment();

  filteredThumbnails.forEach((thumbnail) => {
    const pictureElement = createThumbnail(thumbnail);

    thumbnailFragment.appendChild(pictureElement);
  });

  container.appendChild(thumbnailFragment);
};

const showThumbnails = (thumbnails) => {
  renderThumbnails(thumbnails);
  setFilterClick(debounce(() => renderThumbnails(thumbnails)));
};

export {showThumbnails};
