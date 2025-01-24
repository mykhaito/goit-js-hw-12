const API_KEY = '48325175-5a13dcc75d858ba3a77e1c9bf';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Ошибка при загрузке');
    }
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
