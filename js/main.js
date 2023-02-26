const DESCR = [
  'А я на море',
  'Я и моя тень',
  'Солнечный день',
  'C любовью',
  'Год спустя',
  'Плохая погода',
  'Экзамен',
  'Вашингтон',
];

const AVTOR = [
  'Markus',
  'Anton',
  'Igor',
  'Nastya',
  'Sveta',
  'Inokentii',
  'Yana',
  'Olya',
  'Irina',
  'Konstantin'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const PHOTO_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomNumbersInRange = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generatePhotoId = getRandomNumbersInRange(1, 25);
const generatePhotoUrl = getRandomNumbersInRange(1, 25);
const generateCommentId = getRandomNumbersInRange(1, 135);

const makeComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomNumbersInRange(1,6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(AVTOR),
});

const createPost = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCR),
  likes: `${[getRandomInteger(15, 200)]}`,
  comments: Array.from({length:getRandomInteger(1,2)}, makeComments),
});

const arrPost = () => Array.from({length: PHOTO_COUNT}, createPost);
arrPost();
