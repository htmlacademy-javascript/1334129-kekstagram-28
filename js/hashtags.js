const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const formUpload = document.querySelector('.img-upload__form');

const pristine = new Pristine(formUpload, {
  classTo: 'img-upload__field-wrapper',
  // errorClass: 'img-upload__item--invalid',
  // successClass: 'img-upload__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  // errorTextTag: 'div',
  // errorTextClass: 'img-upload__error',
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
      check: inputArray.some((item) => item[0] != '#'),
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
    //разблокировать кнопку отправки
  } else {
    //блокировать кнопку
  }
};

inputHashtag.addEventListener('input', onHashtagInput);

const onFormSubmit = (evt) => {
  evt.preventDefault();

  pristine.validate();
};

export {onFormSubmit};
