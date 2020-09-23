import API_KEY from './apiKey';

export const baseImageURI = 'https://image.tmdb.org/t/p/w500';
export const requests = {
  fetchFamilyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10751&certification_country=US&certification=G`,
  fetchAnimatedMovies: `/discover/movie?api_key=${API_KEY}&with_genres=16&certification_country=US&certification=G`,
  fetchHistoryMovies: `/discover/movie?api_key=${API_KEY}&with_genres=36&certification_country=US&certification=G`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&certification_country=US&certification=G`,
  fetchWesternMovies: `/discover/movie?api_key=${API_KEY}&with_genres=37&certification_country=US&certification=G`,
};
