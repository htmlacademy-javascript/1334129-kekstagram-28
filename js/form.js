import {isEscapeEvent} from './util.js';

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

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const inputHashtag = document.querySelector('.text__hashtags');

let errorMessage = '';

const error = () => errorMessage;

const hashtagsHandler = (value) => {

  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if(!inputText) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  if (inputArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: inputArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги должны разделяться пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с символа #',
    },
    {
      check: inputArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться',//проверка на уникальность тэгов
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),//проверка на максимальное колличество символов
      error: `Максимальная длина одного хэш-тэга ${MAX_SYMBOLS} символов, включая решётку;`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указывать больше ${MAX_HASHTAGS} хэш-тэгов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),//проверка на допустимые символы
      error: 'Хэш-тэг содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {

    const isInvalid = rule.check;

    if (isInvalid) {
      errorMessage = rule.error;
    }

    return !isInvalid;
  });
};

pristine.addValidator(inputHashtag, hashtagsHandler, error, 2, false);

const onHashtagInput = () => {

  if (pristine.validate()) {

    submitButton.classList.remove('img-upload__submit--disabled');
    submitButton.disabled = false;
  } else {

    submitButton.classList.add('img-upload__submit--disabled');
    submitButton.disabled = true;
  }
};

inputHashtag.addEventListener('input', onHashtagInput);

const onFormSubmit = (evt) => {

  evt.preventDefault();

  closeImageEditor();
};

const isTextFieldInFocus = () => document.activeElement === hashTags || document.activeElement === comment;//Если поле в фокусе не сработает эскейп

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

  form.reset();
}

const openImageEditor = () => {

  imageEditorDialog.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  closeButton.addEventListener('click', closeImageEditor);
  document.addEventListener('keydown', onDocumentKeydown);

  form.addEventListener('submit', onFormSubmit);
};

uploadFile.addEventListener('change', openImageEditor);
