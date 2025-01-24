const API_KEY = '48325175-5a13dcc75d858ba3a77e1c9bf';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=15`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error while fetching images');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
