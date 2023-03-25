import { getPicture } from './create.js';
import { renderThumbnails } from './render-thumbnail.js';

const pictures = getPicture();
const container = document.querySelector('.pictures');

renderThumbnails(pictures, container);
