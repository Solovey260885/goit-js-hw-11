import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  getPicturesByQuery,
  onFetchError,
  hideSpinner,
} from './js/pixabay-api';
import { renderImgCard } from './js/render-functions';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const queryValue = form.elements.query.value;

  if (queryValue === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Please, enter in the photo',
      position: 'topRight',
    });
  } else {
    getPicturesByQuery(queryValue)
      .then(data => {
        if (data.hits.length === 0) {
          iziToast.warning({
            title: 'Caution',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
        }
        renderImgCard(data.hits);
      })
      .catch(onFetchError)
      .finally(() => {
        form.reset();
        hideSpinner();
      });
  }
}
