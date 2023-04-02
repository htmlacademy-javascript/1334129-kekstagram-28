import {isEscapeEvent} from './util.js';
import {saveNewPost, closeImageEditor} from './form.js';

const ERROR_SHOW_TIME = 7000;

let connectionErrorShown = false;
let sendDataSucessShown = false;
const pageBody = document.querySelector('body');

const onMouseClick = (evt) => {
  if (connectionErrorShown) {

    const errorElemenet = document.querySelector('.error__inner');
    if (!evt.composedPath().includes(errorElemenet)) {

      closeErrorBlock();
    }
  } else if (sendDataSucessShown) {
    const successElemenet = document.querySelector('.success__inner');

    if (!evt.composedPath().includes(successElemenet)) {

      closeSuccessBlock();
      closeImageEditor();
    }
  }
};

const onDocumentKeydown = (evt) => {
  if (!isEscapeEvent(evt)) {
    return;
  }

  if (connectionErrorShown) {

    closeErrorBlock();
  } else if (sendDataSucessShown) {

    closeSuccessBlock();
    closeImageEditor();
  }
};

function closeErrorBlock() {
  const errorElemenet = document.querySelector('.error');
  pageBody.removeChild(errorElemenet);
  document.removeEventListener('click', onMouseClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  connectionErrorShown = false;
}

function closeSuccessBlock() {
  const successElemenet = document.querySelector('.success');
  pageBody.removeChild(successElemenet);
  document.removeEventListener('click', onMouseClick);
  document.removeEventListener('keydown', onDocumentKeydown);

  sendDataSucessShown = false;
}

const changeTryAgainButtonAccessibility = (newValue) => {
  const tryAgainButton = document.querySelector('.error__button');
  tryAgainButton.disabled = newValue;
};

const onTryAgainButtonClick = () => {
  changeTryAgainButtonAccessibility(true);
  saveNewPost();
};

const onOkButtonClick = () => {
  closeSuccessBlock();
  closeImageEditor();
};

const showConnectionError = () => {
  if (connectionErrorShown) {

    changeTryAgainButtonAccessibility(false);
    return;
  }
  connectionErrorShown = true;

  const errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  const errorElement = errorTemplate.cloneNode(true);
  pageBody.appendChild(errorElement);

  const tryAgainButton = errorElement.querySelector('.error__button');
  tryAgainButton.addEventListener('click', onTryAgainButtonClick);
  document.addEventListener('click', onMouseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  sendDataSucessShown = true;

  const sucсessTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  const sucсessElement = sucсessTemplate.cloneNode(true);
  pageBody.appendChild(sucсessElement);

  const okButton = sucсessElement.querySelector('.success__button');
  okButton.addEventListener('click', onOkButtonClick);
  document.addEventListener('click', onMouseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showConnectionErrorMessage = (errorDescription) => {
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

export {showConnectionError, showSuccessMessage, showConnectionErrorMessage};
