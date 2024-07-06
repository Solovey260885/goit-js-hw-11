import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const spinner = document.querySelector('.loader');

function showSpinner() {
  spinner.style.display = 'flex';
}

export function hideSpinner() {
  spinner.style.display = 'none';
}

export function getPicturesByQuery(query) {
  const API_KEY = '44773491-691b01ebde89d181347bf66a7';
  showSpinner();
  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

export function onFetchError(error) {
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}
