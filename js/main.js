import { getPicture } from './create.js';
import { renderThumbnails } from './render-thumbnail.js';
// import './hashtags.js';
import './form.js';

const pictures = getPicture();
const container = document.querySelector('.pictures');

renderThumbnails(pictures, container);
