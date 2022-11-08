import { http } from './http';

export default {
  getAllLikesComment: (id: string, userId: Object) => {
    return http.post(`likes/get/${id}`, userId);
  },
  createLikeComment: (userlike: Object) => {
    return http.post('/likes', userlike);
  }
};
