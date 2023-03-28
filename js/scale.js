const STEP = 25;
const DEFAULT = 100;
const MIN = 25;
const MAX = 100;

const controlValueElement = document.querySelector('.scale__control--value');
const imagePreviewElement = document.querySelector('.img-upload__preview img');

const scaleImage = (percent) => {
  imagePreviewElement.style.transform = `scale(${percent / 100})`;
  controlValueElement.value = `${percent}%`;
};

const zoom = (step) => {
  const scalePercent = parseInt(controlValueElement.value, 10) + step;
  if (scalePercent <= MAX && scalePercent >= MIN) {
    scaleImage(scalePercent);
  }
};
const onIncreaseScaleClick = () => zoom(STEP);
const onDecreaseScaleClick = () => zoom(-STEP);

const setDefaultScale = () => scaleImage(DEFAULT);

export {
  onIncreaseScaleClick,
  onDecreaseScaleClick,
  setDefaultScale
};
