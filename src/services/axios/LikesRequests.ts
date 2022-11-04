import { http } from './http';

export default {
  getAllLikesComment: (id: string) => {
    return http.get(`likes/${id}`);
  },
};
