const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (par) => {

  const pictureFragment = document.createDocumentFragment();

  const createPictureElement = ({url, likes, comments}) => {

    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    pictureFragment.appendChild(pictureElement);

  };

  par.forEach(createPictureElement);

  picturesContainer.appendChild(pictureFragment);
};

export {renderPictures};
