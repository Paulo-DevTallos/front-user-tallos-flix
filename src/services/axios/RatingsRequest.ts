import { http } from './http';

export default {
  createRatingsMovie: (data: Object) => {
    return http.post(`ratings`, data);
  },
};
