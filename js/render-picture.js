// import {clearContainer} from './util.js';
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureElement = ({url, likes, comments, description}) => {

  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const renderPictures = (pictures) => {
  const pictureFragment = document.createDocumentFragment();

  // clearContainer(pictureTemplate);

  pictures.forEach((picture) => {
    const element = createPictureElement(picture);

    pictureFragment.appendChild(element);
  });

  picturesContainer.appendChild(pictureFragment);
};

export {renderPictures};
