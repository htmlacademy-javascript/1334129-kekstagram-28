import './data.js';
import './util.js';
import './render-fullscreen.js';
import {createPosts} from './create.js';
import {renderPictures} from './render-picture.js';
// import {onPhotoClick} from './render-fullscreen.js';

const pictures = createPosts();
renderPictures(pictures);

export {pictures};
