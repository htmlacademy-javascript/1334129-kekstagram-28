import {isMouseLeftButtonEvent, isEscapeEvent} from './util.js';

const body = document.querySelector('body');
const picContainer = body.querySelector('.pictures');
const bigPicture = body.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');


const social = bigPicture.querySelector('.social');
const comentsList = social.querySelector('.social__comments'); // список для комментариев
const socialComment = social.querySelector('.social__comment');
const commentCount = socialComment.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const popupCloseBtn = bigPicture.querySelector('#picture-cancel');  //крестик


const onCloseButtonDown = (evt) => {
  if(isEscapeEvent(evt)) {
    hideBigPicture();
  }
};

const onCloseButtonClick = (evt) => {
  if (isMouseLeftButtonEvent(evt)) {
    hideBigPicture();
  }
};

const createCommentsElement = ({img, name, comments}) => { //список комментариев под фотографией

  const commentElement = socialComment.cloneNode(true);

  commentElement.querySelector('.social__picture').src = img;
  commentElement.querySelector('.social__text').alt = name;
  commentElement.querySelector('.social__text').textContent = comments;

  return commentElement;
};

const renderComments = (item) => {
  comentsList.innerHTML = '';
  comentsList.append(...item.map(createCommentsElement));
};


const renderPictureDetails = ({url, likes, description}) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureCaption.textContent = likes;
};

const showBigPicture = (data) => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.add('hidden');

  renderPictureDetails(data);
  renderComments();
};

const hideBigPicture = () => {
  body.classList.remove('modal-open');

  bigPicture.classList.add('hidden');
  commentsLoader.classList.remove('hidden');

  document.removeEventListener('keydown', onCloseButtonDown);
};

picContainer.addEventListener('click', showBigPicture);
popupCloseBtn.addEventListener('click', onCloseButtonClick);
document.addEventListener('keydown', onCloseButtonDown);

export {showBigPicture};
