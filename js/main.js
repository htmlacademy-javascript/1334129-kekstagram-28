import './data.js';
import './util.js';
import {createPosts} from './create.js';
import {renderPictures} from './picture.js';

const pictures = createPosts();
renderPictures(pictures);
