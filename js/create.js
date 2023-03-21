import {DESCR, AUTHOR, MESSAGE, PHOTO_COUNT, Likes, Comments, Id, Pic} from './data.js';
import {getRandomInteger, getRandomArrayElement, getRandomNumbersInRange} from './util.js';

const createComments = () => ({
  id: getRandomNumbersInRange(Comments.MIN, Comments.MAX),
  avatar: `img/avatar-${getRandomNumbersInRange(Pic.MIN, Pic.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(AUTHOR),
});

const createPicture = () => ({
  id: getRandomNumbersInRange(Id.MIN, Id.MAX),
  url: `photos/${getRandomNumbersInRange(Id.MIN, Id.MAX)}.jpg`,
  description: getRandomArrayElement(DESCR),
  likes: `${getRandomInteger(Likes.MIN, Likes.MAX)}`,
  comments: Array.from({length:getRandomInteger(1,20)}, createComments),
});

const getPicture = () => Array.from({length: PHOTO_COUNT}, createPicture);

export {getPicture, createComments};
