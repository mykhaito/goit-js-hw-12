import { fetchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  appendToGallery,
  clearGallery,
  renderLoadMoreButton,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#search-form');
  const input = form.querySelector('input');
  const loadMoreBtn = document.createElement('button');
  loadMoreBtn.textContent = 'Load more';
  loadMoreBtn.classList.add('load-more', 'hidden');
  document.querySelector('main').appendChild(loadMoreBtn);

  const lightbox = new SimpleLightbox('.gallery a');

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
      iziToast.error({
        title: 'Error',
        message: 'Enter a search query.',
      });
      clearGallery();
      renderLoadMoreButton(false);
      return;
    }

    currentQuery = query;
    currentPage = 1;
    document.querySelector('.loader').classList.remove('hidden');
    try {
      const data = await fetchImages(currentQuery, currentPage);
      totalHits = data.totalHits;
      clearGallery();

      if (data.hits.length === 0) {
        iziToast.info({
          title: 'No Results',
          message: 'No images found. Try a different query.',
        });
        renderLoadMoreButton(false);
      } else {
        renderGallery(data.hits);
        lightbox.refresh();
        renderLoadMoreButton(data.hits.length === 15);
      }
    } catch (error) {
      iziToast.error({ title: 'Error', message: 'Failed to load images.' });
    } finally {
      document.querySelector('.loader').classList.add('hidden');
    }
  });

  loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;
    document.querySelector('.loader').classList.remove('hidden');
    try {
      const data = await fetchImages(currentQuery, currentPage);
      appendToGallery(data.hits);
      lightbox.refresh();

      if (currentPage * 15 >= totalHits || data.hits.length < 15) {
        renderLoadMoreButton(false);
        iziToast.info({
          title: 'End of results',
          message: "You've reached the end of search results.",
        });
      }
    } catch (error) {
      iziToast.error({ title: 'Error', message: 'Failed to load images.' });
    } finally {
      document.querySelector('.loader').classList.add('hidden');
    }
  });
});
