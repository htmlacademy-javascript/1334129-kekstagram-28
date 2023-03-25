import {isEscapeEvent} from './util.js';
import {onFormSubmit} from './hashTags.js';

const form = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const imageEditorDialog = document.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const closeButton = imageEditorDialog.querySelector('.img-upload__cancel');
const hashTags = imageEditorDialog.querySelector('.text__hashtags');
const comment = imageEditorDialog.querySelector('.text__description');

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
  // Отобразим форму редактирования публикации.
  imageEditorDialog.classList.remove('hidden');
  // Исключим прокрутку позади модального окна.
  pageBody.classList.add('modal-open');
  // Закрытие формы на крестик.
  closeButton.addEventListener('click', closeImageEditor);
  // Закрытие формы на ESC.
  document.addEventListener('keydown', onDocumentKeydown);

  // Добавим валидацию перед отправкой формы.
  form.addEventListener('submit', onFormSubmit);
};

uploadFile.addEventListener('change', openImageEditor);

