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

const createPhoto = {
  id: getRandomInteger(1,25),
  url: `photo/${[getRandomInteger(1,25)]}.jpg`,
  description: getRandomArrayElement(DESCR),
  likes: `${[getRandomInteger(15, 200)]}`,
  comments: {
    id: `${[getRandomInteger(1, 135)]}`,
    avatar: `img/avatar-${[getRandomInteger(1,6)]}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(AVTOR),
  },
};

// console.log(createPhoto);

const arrPhoto = Array.from({length: PHOTO_COUNT}, createPhoto);

arrPhoto();
