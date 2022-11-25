import { http } from './http';

export default {
  getAllMovies: () => {
    return http.get('movies');
  },
  getSeries: (params?: any) => {
    return http.get('movies/search/series', { params: params });
  },
  getMovieFilter: (params?: object) => {
    return http.get(`movies/search`, { params: params });
  },
  getMovieFilterId: (id: string) => {
    return http.get(`movies/search/${id}`);
  },
  getMovieCast: (data: object) => {
    return http.post(`movies/cast`, data);
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
