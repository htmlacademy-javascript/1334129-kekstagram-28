import {showThumbnails} from './render-thumbnail.js';
import './form.js';
import {loadPosts} from './requests.js';
import { showConnectionErrorMessage} from './message.js';


loadPosts(showThumbnails, showConnectionErrorMessage);
