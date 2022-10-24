import { http } from './http';

export default {
  getAllMovies: () => {
    return http.get('movies');
  },
  getSeries: () => {
    return http.get('movies/search/series');
  },
  getMovieFilter: () => {
    return http.get(`movies/search`);
  },
  createMovies: (MoviesData: object) => {
    return http.post(`movies`, MoviesData);
  },
  updateMovies: (id: string, MoviesData: object) => {
    return http.put(`movies/${id}`, MoviesData);
  },
  deleteMovies: (id: string) => {
    return http.delete(`movies/${id}`);
  },
};
