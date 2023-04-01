import {onPictureClick} from './big-picture.js';
import {sendRequest} from './requests.js';

const SOURCE_DATA_URL = 'https://28.javascript.pages.academy/kekstagram/data';
const ERROR_SHOW_TIME = 7000;

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
  const thumbnailFragment = document.createDocumentFragment();

  thumbnails.forEach((thumbnail) => {
    const pictureElement = createThumbnail(thumbnail);

    thumbnailFragment.appendChild(pictureElement);
  });

  container.appendChild(thumbnailFragment);
};

const showConnectionError = (errorDescription) => {
  const errorContainer = document.createElement('div');
  errorContainer.style.zIndex = '100';
  errorContainer.style.position = 'absolute';
  errorContainer.style.left = '0';
  errorContainer.style.top = '0';
  errorContainer.style.right = '0';
  errorContainer.style.padding = '10px 3px';
  errorContainer.style.fontSize = '30px';
  errorContainer.style.textAlign = 'center';
  errorContainer.style.backgroundColor = 'white';
  errorContainer.style.color = 'red';
  errorContainer.textContent = `При получении данных произошла ошибка ${errorDescription}`;

  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

const loadPosts = () => sendRequest(SOURCE_DATA_URL, renderThumbnails, showConnectionError);

export {loadPosts};
