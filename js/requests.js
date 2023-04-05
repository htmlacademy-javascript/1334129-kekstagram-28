const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const SEND_DATA_URL = `${BASE_URL}`;
const SOURCE_DATA_URL = `${BASE_URL}/data`;

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const sendRequest = (url, onSuccess, onError, method = Method.GET, body = null) => {
  fetch(
    url,
    {method, body}
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }).then((data) => {
    onSuccess(data);
  }).catch((err) => {
    onError(err);
  });
};

const loadPosts = (onSuccess, onError) => sendRequest(SOURCE_DATA_URL, onSuccess, onError,);

const sendNewPost = (body, onSuccess, onError) => sendRequest(SEND_DATA_URL, onSuccess, onError, Method.POST, body);

export {loadPosts, sendNewPost};
