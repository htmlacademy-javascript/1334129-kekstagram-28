// import {createPosts} from './create.js';
import {viewElement, hideElement, isMouseLeftButtonEvent, isEscapeEvent} from './util.js';
import {pictures} from './main.js';

// const posts = createPosts();

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
    closePopup();
  }
};

const onCloseButtonClick = (evt) => {
  if (isMouseLeftButtonEvent(evt)) {
    closePopup();
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

const openPopup = (evt) => {
  evt.preventDefault();
  const target = evt.target.closest('.picture');
  if (target) {
    body.classList.add('modal-open');

    viewElement(bigPicture);
    hideElement(commentCount);
    hideElement(commentsLoader);



    // const params = posts.find((item) => item.id === Number(target.dataset.id));
    // bigPictureImg.src = evt.target.src;
    // bigPictureLikes.textContent = params.likes;
    // bigPictureComments.textContent = params.comments.length;
    // bigPictureCaption.textContent = params.description;

    // clearContainer(comentsList);
    const currentDescription = pictures.find((item) => item.id === Number(target.dataset.id));

    bigPictureImg.src = evt.target.src;
    bigPictureLikes.textContent = currentDescription.likes;
    bigPictureComments.textContent = currentDescription.comments.length;
    bigPictureCaption.textContent = currentDescription.description;

    renderComments(currentDescription.comments);
    // document.addEventListener('keydown', onCloseButtonDown);
  }
};

const closePopup = () => {
  body.classList.remove('modal-open');

  hideElement(bigPicture);
  viewElement(commentCount);
  viewElement(commentsLoader);

  document.removeEventListener('keydown', onCloseButtonDown);
};

picContainer.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', onCloseButtonClick);
document.addEventListener('keydown', onCloseButtonDown);


