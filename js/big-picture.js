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
const commentsCount = bigPicture.querySelector('.social__comment-count .comments-count');//125
const commentsView = commentCountContainer.querySelector('.comments-view');//5

const createCommentElement = ({avatar, message, name}) => {

  const commentItem = socialComment.cloneNode(true);
  commentItem.querySelector('.social__picture').src = avatar;
  commentItem.querySelector('.social__picture').alt = name;
  commentItem.querySelector('.social__text').textContent = message;

  return commentItem;
};

const renderModalComments = (comments) => {
  comentsList.append(...comments.map(createCommentElement));
};

const makeSequence = (step) => {
  let index = 0;
  return () => {
    const prev = index;

    index += step;

    return [prev, index];
  };
};

const renderMoreComments = (commentsLoaderElement, stepSequence, comments) => {
  const [prev, index] = stepSequence();

  renderModalComments(comments.slice(prev, index));
  commentsView.textContent = index;
  if (comments.length <= index) {
    commentsLoaderElement.classList.add('hidden');
  }
};

const makeCommentsLoaderElement = () => {
  const commentsLoaderElement = bigPicture.querySelector('.comments-loader');

  const newCommentsLoaderElement = commentsLoaderElement.cloneNode(true);
  newCommentsLoaderElement.classList.remove('hidden');
  commentsLoaderElement.replaceWith(newCommentsLoaderElement);

  return newCommentsLoaderElement;
};

const initCommentsLoader = (comments) => {
  const commentsLoaderElement = makeCommentsLoaderElement();
  commentsCount.textContent = comments.length;
  const stepSequence = makeSequence(5);
  renderMoreComments(commentsLoaderElement, stepSequence, comments);
  commentsLoaderElement.addEventListener('click', () => renderMoreComments(commentsLoaderElement, stepSequence, comments));
};

const clearModalComments = () => (comentsList.innerHTML = '');

const renderPictureDetails = ({url, likes, description}) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureLikes.textContent = likes;
  bigPictureCaption.textContent = description;
};

const onPictureClick = (data) => {
  renderPictureDetails(data);
  clearModalComments();
  initCommentsLoader(data.comments);
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

const hideBigPicture = () => {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
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
