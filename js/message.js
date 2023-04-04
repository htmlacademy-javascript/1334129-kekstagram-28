import {isEscapeEvent} from './util.js';
import {saveNewPost, closeImageEditor} from './form.js';

const ERROR_SHOW_TIME = 5000;

let connectionErrorShown = false;
let sendDataSucessShown = false;
const pageBody = document.querySelector('body');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = document.querySelector('#error-message').content.querySelector('.error');
const sucсessTemplate = document.querySelector('#success').content.querySelector('.success');

const onMouseClick = (evt) => {
  if (connectionErrorShown) {
    const errorElemenet = document.querySelector('.error__inner');
    if (!evt.composedPath().includes(errorElemenet)) {
      closeErrorBlock();
    }
    return;
  }

  if (sendDataSucessShown) {
    const successElemenet = document.querySelector('.success__inner');
    if (!evt.composedPath().includes(successElemenet)) {
      closeSuccessBlock();
      closeImageEditor();
    }
    return;
  }
};

const onDocumentKeydown = (evt) => {
  if (!isEscapeEvent(evt)) {
    return;
  }

  if (connectionErrorShown) {
    closeErrorBlock();
    return;
  }

  if (sendDataSucessShown) {
    closeSuccessBlock();
    closeImageEditor();
    return;
  }
};

function closeErrorBlock() {
  const errorElemenet = document.querySelector('.error');
  pageBody.removeChild(errorElemenet);
  connectionErrorShown = false;

  document.removeEventListener('click', onMouseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function closeSuccessBlock() {
  const successElemenet = document.querySelector('.success');
  pageBody.removeChild(successElemenet);
  sendDataSucessShown = false;

  document.removeEventListener('click', onMouseClick);
  document.removeEventListener('keydown', onDocumentKeydown);
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

  const errorElement = errorTemplate.cloneNode(true);
  pageBody.appendChild(errorElement);

  const tryAgainButton = errorElement.querySelector('.error__button');
  tryAgainButton.addEventListener('click', onTryAgainButtonClick);
  document.addEventListener('click', onMouseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  sendDataSucessShown = true;

  const sucсessElement = sucсessTemplate.cloneNode(true);
  pageBody.appendChild(sucсessElement);

  const okButton = sucсessElement.querySelector('.success__button');
  okButton.addEventListener('click', onOkButtonClick);
  document.addEventListener('click', onMouseClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showConnectionErrorMessage = () => {
  const errorContainer = errorMessage.cloneNode(true);
  document.body.append(errorContainer);

  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

export {showConnectionError, showSuccessMessage, showConnectionErrorMessage};
