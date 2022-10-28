import { http } from './http';

export default {
  getAllComments: () => {
    return http.get('comments');
  },
  getCommentById: (id: string) => {
    return http.get(`comments/${id}`);
  },
  getByMovieId: (MovieId: Object, params?: Object) => {
    console.log(MovieId);
    console.log(params);
    return http.post(`comments/movie_id`, MovieId, { params: params });
  },
  getByEmail: (Email: string) => {
    return http.post(`comments/mail`, Email);
  },
  createComment: (CommentData: object) => {
    return http.post(`comments`, CommentData);
  },
  updateComment: (id: string, CommentData: object) => {
    return http.put(`comments/${id}`, CommentData);
  },
  deleteComment: (id: string) => {
    return http.delete(`comments/${id}`);
  },
};
