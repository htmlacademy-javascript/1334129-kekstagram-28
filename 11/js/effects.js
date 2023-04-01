const EFFECTS_OPTIONS = {
  none: {
    filter: 'none',
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    unit: '',
    connect: 'lower'
  },
  chrome: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    unit: '',
    connect: 'lower'
  },
  sepia: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    unit: '',
    connect: 'lower'
  },
  marvin: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    unit: '%',
    connect: 'lower'
  },
  phobos: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    unit: 'px',
    connect: 'lower'
  },
  heat: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1,
    unit: '',
    connect: 'lower'
  }
};

const imagePreviewElement = document.querySelector('.img-upload__preview img');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');

let choosenOption = EFFECTS_OPTIONS.none;

const OnSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();

  imagePreviewElement.style.filter = choosenOption === EFFECTS_OPTIONS.none
    ? imagePreviewElement.style.filter = choosenOption.filter
    : `${choosenOption.filter}(${sliderValue}${choosenOption.unit})`;

  effectValueElement.value = sliderValue;
};

const hideSlider = () => sliderContainerElement.classList.add('hidden');
const showSlider = () => sliderContainerElement.classList.remove('hidden');

const onEffectChange = (evt) => {

  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }

  const targetValue = evt.target.value;
  choosenOption = EFFECTS_OPTIONS[targetValue];
  imagePreviewElement.className = `effects__preview--${targetValue}`;

  (choosenOption === EFFECTS_OPTIONS.none ? hideSlider : showSlider)();

  sliderElement.noUiSlider.updateOptions(choosenOption);
};

const setDefaultEffect = () => {
  choosenOption = EFFECTS_OPTIONS.none;
  sliderElement.noUiSlider.updateOptions(choosenOption);
};

noUiSlider.create(sliderElement, choosenOption);
sliderElement.noUiSlider.on('update', OnSliderUpdate);

export {onEffectChange, setDefaultEffect};
