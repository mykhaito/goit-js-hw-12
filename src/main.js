import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#search-form');
  const input = form.querySelector('input');

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const query = input.value.trim();

    if (!query) {
      iziToast.error({ title: 'Error', message: 'Введи запрос' });
      return;
    }

    document.querySelector('.loader').classList.remove('hidden');

    try {
      const images = await fetchImages(query);
      if (images.length === 0) {
        iziToast.info({
          title: 'No Results',
          message: 'Неправильно, введи нормальный запрос',
        });
      } else {
        renderGallery(images);
        const lightbox = new SimpleLightbox('.gallery a');
        lightbox.refresh();
      }
    } catch (error) {
      iziToast.error({ title: 'Error', message: 'Не могу загрузить' });
    } finally {
      document.querySelector('.loader').classList.add('hidden');
    }
  });
});
