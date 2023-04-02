import {isEscapeEvent} from './util.js';
import {onIncreaseScaleClick, onDecreaseScaleClick, setDefaultScale} from './scale.js';
import {onEffectChange, setDefaultEffect} from './effects.js';
import {sendNewPost} from './requests.js';
import {showConnectionError, showSuccessMessage} from './message.js';

// const SEND_DATA_URL = 'https://28.javascript.pages.academy/kekstagram';
const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

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

const isTextFieldInFocus = () => document.activeElement === hashTags || document.activeElement === comment;

const onDocumentKeydown = (evt) => {

  if (isEscapeEvent(evt) && !isTextFieldInFocus()) {
    closeImageEditor();
  }
};

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

const openImageEditor = () => {//открытие формы

  imageEditorDialog.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  closeButton.addEventListener('click', closeImageEditor);
  document.addEventListener('keydown', onDocumentKeydown);

  setDefaultScale();
  increaseScaleElement.addEventListener('click', onIncreaseScaleClick);
  decreaseScaleElement.addEventListener('click', onDecreaseScaleClick);
  effectsElement.addEventListener('change', onEffectChange);
  form.addEventListener('submit', onFormSubmit);//вопросик имеет ли это место быть теперь?
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const saveNewPost = (evt) => sendNewPost(new FormData(evt.target), showSuccessMessage, showConnectionError);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  blockSubmitButton();
  sendNewPost(new FormData(evt.target), showSuccessMessage, showConnectionError);
  unblockSubmitButton();
};

inputHashtag.addEventListener('input', onHashtagInput);
pristine.addValidator(inputHashtag, hashtagsHandler, getError, 2, false);
uploadFile.addEventListener('change', openImageEditor);

export {saveNewPost, closeImageEditor};
