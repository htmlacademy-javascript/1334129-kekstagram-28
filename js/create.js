import {DESCR, AUTHOR, MESSAGE, PHOTO_COUNT, Likes, Comments, Id, Pic} from './data.js';
import {getRandomInteger, getRandomArrayElement, getRandomNumbersInRange} from './util.js';

const generatePhotoId = getRandomNumbersInRange(Id.MIN, Id.MAX);
const generatePhotoUrl = getRandomNumbersInRange(Id.MIN, Id.MAX);
const generateCommentId = getRandomNumbersInRange(Comments.MIN, Comments.MAX);
const generateAvatar = getRandomNumbersInRange(Pic.MIN, Pic.MAX);

const createComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${generateAvatar()}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(AUTHOR),
});

const createPost = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCR),
  likes: `${getRandomInteger(Likes.MIN, Likes.MAX)}`,
  comments: Array.from({length:getRandomInteger(1,2)}, createComments),
});

const createPosts = () => Array.from({length: PHOTO_COUNT}, createPost);

export {createPosts, createComments};
