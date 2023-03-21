import { getPicture } from './create.js';
import { renderGallery } from './gallery.js';

const pictures = getPicture();

renderGallery(pictures);
