import { http } from './http';

export default {
  getAllLikesComment: (id: string, userId: Object) => {
    return http.get(`likes/${id}`, userId);
  },
};
