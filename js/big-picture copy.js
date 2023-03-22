import {isMouseLeftButtonEvent, isEscapeEvent} from './util.js';

const body = document.querySelector('body');
const bigPicture = body.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCaption = bigPicture.querySelector('.social__caption');
const popupCloseBtn = bigPicture.querySelector('#picture-cancel');

const social = bigPicture.querySelector('.social');
const comentsList = social.querySelector('.social__comments');
const socialComment = social.querySelector('.social__comment');
const commentCountContainer = social.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader'); //Кнопка загрузить еще
const commentsCount = commentCountContainer.querySelector('.comments-count');//125
const commentsView = commentCountContainer.querySelector('.comments-view');//5

const createCommentElement = ({avatar, message, name}) => {

  const commentItem = socialComment.cloneNode(true);
  commentItem.querySelector('.social__picture').src = avatar;
  commentItem.querySelector('.social__picture').alt = name;
  commentItem.querySelector('.social__text').textContent = message;

  return commentItem;
};

const renderModalComments = (comments) => {
  comentsList.innerHTML = '';
  comentsList.append(...comments.map(createCommentElement));
};

const renderPictureDetails = ({url, likes, description}) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureLikes.textContent = likes;
  bigPictureCaption.textContent = description;
};

const onPictureClick = (data) => {
  renderPictureDetails(data);
  renderModalComments(data.comments);
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  // commentsLoader.classList.add('hidden');
  // commentCount.classList.add('hidden');
  // if (renderModalComments.length > 0) {
  //   commentsLoader.classList.remove('hidden');
  // } else {
  //   commentsLoader.classList.add('hidden');
  // }

};

const hideBigPicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  // commentsLoader.classList.remove('hidden');
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

popupCloseBtn.addEventListener('click', onCloseButtonClick);
document.addEventListener('keydown', onCloseButtonDown);

export {onPictureClick};
