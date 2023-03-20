import {isMouseLeftButtonEvent, isEscapeEvent} from './util.js';

const body = document.querySelector('body');
const picContainer = body.querySelector('.pictures');
const bigPicture = body.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
// const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');

const social = bigPicture.querySelector('.social');
const comentsList = social.querySelector('.social__comments'); // список для комментариев
// const socialComment = social.querySelector('.social__comment');
// const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const commentCount = social.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const popupCloseBtn = bigPicture.querySelector('#picture-cancel');


// const createCommentElement = ({avatar, message, name}) => { //список комментариев под фотографией

//   const commentItem = socialComment.cloneNode(true);
//   commentItem.querySelector('.social__picture').src = avatar;
//   commentItem.querySelector('.social__picture').alt = name;
//   commentItem.querySelector('.social__text').textContent = message;

//   return commentItem;
// };

const renderModalComments = () => {
  comentsList.innerHTML = '';
  // comentsList.append(...item.map(createCommentElement));
};

const renderPictureDetails = ({url, likes, description}) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureLikes.textContent = likes;
  bigPictureCaption.textContent = description;
};

const showBigPicture = (data) => {
  renderPictureDetails(data);
  renderModalComments();
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');

  // document.addEventListener('keydown', onCloseButtonDown);

};

const hideBigPicture = () => {
  body.classList.remove('modal-open');

  bigPicture.classList.add('hidden');
  commentsLoader.classList.remove('hidden');

  // document.removeEventListener('keydown', onCloseButtonDown);
};
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
picContainer.addEventListener('click', showBigPicture);
popupCloseBtn.addEventListener('click', onCloseButtonClick);
document.addEventListener('keydown', onCloseButtonDown);

export {showBigPicture};
