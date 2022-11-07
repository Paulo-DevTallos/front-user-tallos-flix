import CommentRequests from '@/services/axios/CommentRequests';
export default {
  async createComment({ commit }: any, data: any) {
    await CommentRequests.createComment(data)
      .then((res) => {
        commit();
        console.log(res);
      })
      .catch((error) => {
        commit();
      });
  },
  async updateComment({ commit }: any, data: any) {
    await CommentRequests.updateComment(data.id, data.comment)
      .then((res) => {
        commit();
        console.log(res);
      })
      .catch((error) => {
        commit();
      });
  },
  async deleteComment({ commit }: any, data: any) {
    await CommentRequests.deleteComment(data)
      .then((res) => {
        commit();
        console.log(res);
      })
      .catch((error) => {
        commit();
      });
  },
  async getAllComments({ commit }: any) {
    await CommentRequests.getAllComments()
      .then((res) => {
        commit('GET_COMMENTS', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getCommentById({ commit }: any, data: any) {
    await CommentRequests.getCommentById(data.id)
      .then((res) => {
        commit('GET_COMMENT', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getByMovieId({ commit }: any, data: any) {
    await CommentRequests.getByMovieId(data.movie, data.params)
      .then((res) => {
        commit('GET_COMMENTS', res.data);
        console.log(res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getByEmail({ commit }: any, data: any) {
    await CommentRequests.getByEmail(data.Email)
      .then((res) => {
        commit('GET_COMMENTS', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getResponseComments({ commit }: any, data: any) {
    await CommentRequests.getResponseComments(data.idcomment, data.params)
      .then((res) => {
        commit('GET_RESPONSECOMMENT', res.data);
        console.log(res);
      })
      .catch((error) => {
        commit();
      });
  },
};
