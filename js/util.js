const MOUSE_LEFT_BUTTON = 0;

const Keys = {
  ESC: 'Escape',
  ENTER: 'Enter',
  NUMPAD_ENTER: 'NumpadEnter'
};

const isEnterEvent = (evt) => evt.code === Keys.ENTER || evt.code === Keys.NUMPAD_ENTER;

const isMouseLeftButtonEvent = (evt) => evt.button === MOUSE_LEFT_BUTTON;

const isEscapeEvent = (evt) => evt.code === Keys.ESC;

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isEnterEvent,
  isMouseLeftButtonEvent,
  isEscapeEvent,
  debounce
};
