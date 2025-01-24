export function createImageCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
      <a href="${largeImageURL}" class="gallery__item">
          <img src="${webformatURL}" alt="${tags}" class="gallery__image" />
          <div class="info">
              <p><b>Likes:</b> ${likes}</p>
              <p><b>Views:</b> ${views}</p>
              <p><b>Comments:</b> ${comments}</p>
              <p><b>Downloads:</b> ${downloads}</p>
          </div>
      </a>
  `;
}

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = images.map(createImageCard).join('');
}

export function renderLoadMoreButton(show) {
  const loadMoreBtn = document.querySelector('.load-more');
  if (show) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
  }
}

export function appendToGallery(images) {
  const gallery = document.querySelector('.gallery');
  gallery.insertAdjacentHTML(
    'beforeend',
    images.map(createImageCard).join('')
  );
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}