const MOUSE_LEFT_BUTTON = 0;

const Keys = {
  ESC: 'Escape',
  ENTER: 'Enter',
  NUMPAD_ENTER: 'NumpadEnter'
};

const isEnterEvent = (evt) => evt.code === Keys.ENTER || evt.code === Keys.NUMPAD_ENTER;

const isMouseLeftButtonEvent = (evt) => evt.button === MOUSE_LEFT_BUTTON;

const isEscapeEvent = (evt) => evt.code === Keys.ESC;

const hideElement = (element) => {
  element.classList.add(`hidden`);
};

const viewElement = (element) => {
  element.classList.remove('hidden');
};

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

// const clearContainer = (container) => {
//   container.forEach((element) => element.remove());
// };

export {
  viewElement,
  hideElement,
  isEnterEvent,
  isMouseLeftButtonEvent,
  isEscapeEvent,
  getRandomInteger,
  getRandomArrayElement,
  getRandomNumbersInRange,
  // clearContainer
};
// export {viewElement, hideElement, getRandomInteger, getRandomArrayElement, getRandomNumbersInRange};
