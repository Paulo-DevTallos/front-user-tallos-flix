import { http } from './http';

export default {
  getAllMovies: () => {
    return http.get('movies');
  },
  getSeries: () => {
    return http.get('movies/search/series');
  },
  getMovieFilter: (params?: Object) => {
    return http.get(`movies/search`, params);
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
