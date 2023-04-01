import {isEscapeEvent} from './util.js';
import {onIncreaseScaleClick, onDecreaseScaleClick, setDefaultScale} from './scale.js';
import {onEffectChange, setDefaultEffect} from './effects.js';
import {sendRequest} from './requests.js';

const SEND_DATA_URL = 'https://28.javascript.pages.academy/kekstagram';
const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const pageBody = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imageEditorDialog = document.querySelector('.img-upload__overlay');
const closeButton = imageEditorDialog.querySelector('.img-upload__cancel');
const hashTags = imageEditorDialog.querySelector('.text__hashtags');
const comment = imageEditorDialog.querySelector('.text__description');

const formUpload = document.querySelector('.img-upload__form');
const submitButton = formUpload.querySelector('#upload-submit');

const decreaseScaleElement = imageEditorDialog.querySelector('.scale__control--smaller');
const increaseScaleElement = imageEditorDialog.querySelector('.scale__control--bigger');
const effectsElement = imageEditorDialog.querySelector('.effects');

let connectionErrorShown = false;
let sendDataSucessShown = false;
let formData = undefined;

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const rules = [
  {
    check: (inputArray) => inputArray.some((item) => item.indexOf('#', 1) >= 1),
    error: 'Хэш-теги должны разделяться пробелами',
  },
  {
    check: (inputArray) => inputArray.some((item) => item[0] !== '#'),
    error: 'Хэш-тег должен начинаться с символа #',
  },
  {
    check: (inputArray) => inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
    error: 'Хэш-теги не должны повторяться',//проверка на уникальность тэгов
  },
  {
    check: (inputArray) => inputArray.some((item) => item.length > MAX_SYMBOLS),//проверка на максимальное колличество символов
    error: `Максимальная длина одного хэш-тэга ${MAX_SYMBOLS} символов, включая решётку;`,
  },
  {
    check: (inputArray) => inputArray.length > MAX_HASHTAGS,
    error: `Нельзя указывать больше ${MAX_HASHTAGS} хэш-тэгов`,
  },
  {
    check: (inputArray) => inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),//проверка на допустимые символы
    error: 'Хэш-тэг содержит недопустимые символы',
  },
];

const inputHashtag = document.querySelector('.text__hashtags');

let errorMessage = '';

const getError = () => errorMessage;

const hashtagsHandler = (value) => {
  errorMessage = '';
  const inputArray = value.toLowerCase().trim().split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  return rules.every((rule) => {
    const isInvalid = rule.check(inputArray);

    if (isInvalid) {
      errorMessage = rule.error;
    }

    return !isInvalid;
  });

};

const onHashtagInput = () => {
  if (pristine.validate()) {

    submitButton.classList.remove('img-upload__submit--disabled');
    submitButton.disabled = false;
  } else {

    submitButton.classList.add('img-upload__submit--disabled');
    submitButton.disabled = true;
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  submitButton.disabled = true;
  formData = new FormData(evt.target);
  saveNewPost();
};

const isTextFieldInFocus = () => document.activeElement === hashTags || document.activeElement === comment;

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
  } else if (!isTextFieldInFocus()) {

    closeImageEditor();
  }
};

function closeErrorBlock() {
  const errorElemenet = document.querySelector('.error');
  pageBody.removeChild(errorElemenet);
  document.removeEventListener('click', onMouseClick);
  connectionErrorShown = false;
}

function closeSuccessBlock() {
  const successElemenet = document.querySelector('.success');
  pageBody.removeChild(successElemenet);
  document.removeEventListener('click', onMouseClick);
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

  submitButton.disabled = false;

  const errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  const errorElement = errorTemplate.cloneNode(true);
  pageBody.appendChild(errorElement);

  const tryAgainButton = errorElement.querySelector('.error__button');
  tryAgainButton.addEventListener('click', onTryAgainButtonClick);
  document.addEventListener('click', onMouseClick);
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
};

function saveNewPost() {
  const options = {
    method: 'POST',
    body: formData,
  };
  sendRequest(SEND_DATA_URL, showSuccessMessage, showConnectionError, options);
}

function closeImageEditor () {

  imageEditorDialog.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  closeButton.removeEventListener('click', closeImageEditor);
  document.removeEventListener('keydown', onDocumentKeydown);
  form.removeEventListener('submit', onFormSubmit);

  increaseScaleElement.removeEventListener('click', onIncreaseScaleClick);
  decreaseScaleElement.removeEventListener('click', onDecreaseScaleClick);
  effectsElement.removeEventListener('change', onEffectChange);

  setDefaultScale();
  setDefaultEffect();
  submitButton.disabled = false;

  form.reset();
}

const openImageEditor = () => {

  imageEditorDialog.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  closeButton.addEventListener('click', closeImageEditor);
  document.addEventListener('keydown', onDocumentKeydown);

  setDefaultScale();
  increaseScaleElement.addEventListener('click', onIncreaseScaleClick);
  decreaseScaleElement.addEventListener('click', onDecreaseScaleClick);
  effectsElement.addEventListener('change', onEffectChange);

  form.addEventListener('submit', onFormSubmit);
};

inputHashtag.addEventListener('input', onHashtagInput);
pristine.addValidator(inputHashtag, hashtagsHandler, getError, 2, false);
uploadFile.addEventListener('change', openImageEditor);
