import {createPosts} from './create.js';

const renderPictures = () => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const pictures = createPosts();
  const pictureFragment = document.createDocumentFragment();

  pictures.forEach(({url, likes, comments}) => {

    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureFragment.appendChild(pictureElement);

  });

  picturesContainer.appendChild(pictureFragment);
};

export {renderPictures};
