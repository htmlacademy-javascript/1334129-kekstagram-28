const MOUSE_LEFT_BUTTON = 0;

const Keys = {
  ESC: 'Escape',
  ENTER: 'Enter',
  NUMPAD_ENTER: 'NumpadEnter'
};

const isEnterEvent = (evt) => evt.code === Keys.ENTER || evt.code === Keys.NUMPAD_ENTER;

const isMouseLeftButtonEvent = (evt) => evt.button === MOUSE_LEFT_BUTTON;

const isEscapeEvent = (evt) => evt.code === Keys.ESC;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomNumbersInRange = (min, max) => {
  const previousValues = [];

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

// const getRandomNumbersInRange = () => {
//   let lastGeneratedId = 0;
//   return () => {
//     lastGeneratedId += 1;
//     return lastGeneratedId;
//   };
// };
const numDecline = (number, words) => {
  number = Math.abs(number) % 100;

  if (number > 10 && number < 20) {
    return words[2];
  } else if (number % 10 > 1 && number % 10 < 5) {
    return words[1];
  } else if (number % 10 === 1) {
    return words[0];
  }
  return words[2];
};

export {
  isEnterEvent,
  isMouseLeftButtonEvent,
  isEscapeEvent,
  getRandomInteger,
  getRandomArrayElement,
  getRandomNumbersInRange,
  numDecline
};
