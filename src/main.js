import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, renderLoadMoreButton } from './js/render-functions.js';
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

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
      iziToast.error({ title: 'Error', message: 'Введи запрос' });
      return;
    }

    currentQuery = query;
    currentPage = 1;
    document.querySelector('.loader').classList.remove('hidden');
    try {
      const data = await fetchImages(currentQuery, currentPage);
      totalHits = data.totalHits;
      if (data.hits.length === 0) {
        iziToast.info({
          title: 'No Results',
          message: 'Неправильно, введи нормальный запрос',
        });
      } else {
        renderGallery(data.hits);
        renderLoadMoreButton(true);
        const lightbox = new SimpleLightbox('.gallery a');
        lightbox.refresh();
      }
    } catch (error) {
      iziToast.error({ title: 'Error', message: 'Не могу загрузить' });
    } finally {
      document.querySelector('.loader').classList.add('hidden');
    }
  });

  loadMoreBtn.addEventListener('click', async () => {
    if (currentPage * 15 >= totalHits) {
      renderLoadMoreButton(false);
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
      return;
    }

    currentPage += 1;
    document.querySelector('.loader').classList.remove('hidden');
    try {
      const data = await fetchImages(currentQuery, currentPage);
      renderGallery(data.hits);
      const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();
      window.scrollBy(0, window.innerHeight);
    } catch (error) {
      iziToast.error({ title: 'Error', message: 'Не могу загрузить' });
    } finally {
      document.querySelector('.loader').classList.add('hidden');
    }
  });
});
